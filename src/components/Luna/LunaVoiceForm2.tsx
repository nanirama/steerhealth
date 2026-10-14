'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';

const API_BASE = '/api/luna';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface Status {
  message: string;
  type: 'connecting' | 'connected' | 'error' | '';
}

export default function LunaVoiceForm2() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState<Status>({ message: '', type: '' });
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAudioIndicator, setShowAudioIndicator] = useState(false);
  
  const roomRef = useRef<any>(null);
  const livekitRef = useRef<any>(null);

  // Load LiveKit script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/livekit-client@2.5.3/dist/livekit-client.umd.min.js';
    script.async = true;
    script.onload = () => {
      livekitRef.current = (window as any).LivekitClient;
      console.log('✅ LiveKit client loaded');
    };
    script.onerror = () => {
      updateStatus('Error: LiveKit library failed to load. Please refresh.', 'error');
    };
    document.head.appendChild(script);

    return () => {
      if (roomRef.current && isConnected) {
        roomRef.current.disconnect();
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const updateStatus = (message: string, type: Status['type']) => {
    setStatus({ message, type });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { name, email, phone } = formData;
    
    if (!name.trim() || !email.trim()) {
      updateStatus('Please fill in all required fields', 'error');
      return;
    }

    if (!livekitRef.current) {
      updateStatus('LiveKit is not loaded yet. Please wait.', 'error');
      return;
    }

    try {
      updateStatus('Connecting to Luna...', 'connecting');
      setIsConnecting(true);

      // Capture lead
      await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });

      // Get token from MCP server
      console.log('🎫 Requesting token from:', `${API_BASE}/token`);
      
      // Try with different payload formats if needed
      const tokenPayload = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        // Alternative field names (uncomment if MCP expects these):
        // name: name,
        // email: email,
        // phone: phone
      };
      
      const tokenRes = await fetch(`${API_BASE}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenPayload)
      });

      console.log('📥 Token response status:', tokenRes.status);
      
      if (!tokenRes.ok) {
        const errorData = await tokenRes.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Token error:', errorData);
        throw new Error(errorData.error || 'Failed to get connection token');
      }

      const tokenData = await tokenRes.json();
      console.log('📦 Token data received:', { 
        hasToken: !!tokenData.token, 
        hasUrl: !!tokenData.url, 
        hasRoom: !!tokenData.room 
      });

      const { token, url, room: roomName } = tokenData;
      
      if (!token || !url) {
        throw new Error('Invalid token response: missing token or url');
      }
      console.log('✅ Token received, connecting to room:', roomName);

      // Connect to LiveKit
      const LK = livekitRef.current;
      const room = new LK.Room({
        adaptiveStream: true,
        dynacast: true
      });
      roomRef.current = room;

      // Event handlers
      room.on(LK.RoomEvent.Connected, () => {
        console.log('✅ Connected to room');
        updateStatus('Connected! Luna will greet you shortly...', 'connected');
      });

      room.on(LK.RoomEvent.TrackSubscribed, (track: any, publication: any, participant: any) => {
        console.log('🎵 Track subscribed:', track.kind, 'from', participant.identity);

        if (track.kind === 'audio' && participant.identity !== room.localParticipant.identity) {
          const audioElement = track.attach();
          audioElement.volume = 0.9;
          document.body.appendChild(audioElement);

          updateStatus('🎙️ Luna is speaking! Say hello!', 'connected');
          setShowAudioIndicator(true);
        }
      });

      room.on(LK.RoomEvent.Disconnected, () => {
        console.log('❌ Disconnected from room');
        cleanup();
      });

      room.on(LK.RoomEvent.ParticipantConnected, (participant: any) => {
        console.log('👤 Participant joined:', participant.identity);
        if (participant.identity.includes('agent') || participant.identity.includes('luna')) {
          updateStatus('🤖 Luna has joined! Listen for her greeting...', 'connected');
        }
      });

      // Connect to room
      await room.connect(url, token);

      // Publish microphone
      const tracks = await LK.createLocalTracks({
        audio: {
          autoGainControl: true,
          echoCancellation: true,
          noiseSuppression: true
        },
        video: false
      });

      const audioTrack = tracks.find((t: any) => t.kind === 'audio');
      if (audioTrack) {
        await room.localParticipant.publishTrack(audioTrack);
        console.log('🎤 Microphone published');
      }

      setIsConnected(true);
      setIsConnecting(false);

    } catch (error) {
      console.error('❌ Connection failed:', error);
      updateStatus(`Connection failed: ${(error as Error).message}`, 'error');
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (roomRef.current && isConnected) {
      try {
        updateStatus('Disconnecting...', 'connecting');
        await roomRef.current.disconnect();
        cleanup();
      } catch (error) {
        console.error('Disconnect error:', error);
        cleanup();
      }
    }
  };

  const cleanup = () => {
    setIsConnected(false);
    setIsConnecting(false);
    setShowAudioIndicator(false);
    roomRef.current = null;
    setFormData({ name: '', email: '', phone: '' });
    updateStatus('Disconnected. Connect again anytime!', 'error');

    setTimeout(() => {
      setStatus({ message: '', type: '' });
    }, 3000);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700">
      <div className="w-full max-w-md">
        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 border border-white/30 shadow-2xl">
          
          {/* Logo */}
          <header className="text-center mb-8">
            <h1 className="text-5xl mb-2 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent font-bold">
              🎤 Luna AI
            </h1>
            <p className="text-white/90 text-lg">SteerHealth Voice Assistant</p>
          </header>

          {/* Form or Disconnect Button */}
          {!isConnected ? (
            <div onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-white font-semibold text-sm mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold text-sm mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-white font-semibold text-sm mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  autoComplete="tel"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all"
                />
              </div>

              <button
                type="submit"
                onClick={(e) => handleSubmit(e as any)}
                disabled={isConnecting}
                className="w-full py-4 mt-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                🎤 Connect to Luna
              </button>
            </div>
          ) : (
            <button
              onClick={handleDisconnect}
              className="w-full py-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all"
            >
              ✖ End Conversation
            </button>
          )}

          {/* Status */}
          {status.message && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-6 p-4 rounded-xl text-center font-medium animate-fade-in ${
                status.type === 'connecting'
                  ? 'bg-yellow-400/20 border-2 border-yellow-400/50 text-yellow-300'
                  : status.type === 'connected'
                  ? 'bg-green-500/20 border-2 border-green-500/50 text-green-400'
                  : 'bg-red-500/20 border-2 border-red-500/50 text-red-400'
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Audio Indicator */}
          {showAudioIndicator && (
            <div className="flex justify-center gap-2 mt-4" aria-label="Audio playing">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-5 bg-white rounded-sm animate-audio-wave"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}

          {/* Features */}
          {isConnected && (
            <section className="mt-8 pt-8 border-t border-white/20 space-y-4">
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <span className="text-2xl" aria-hidden="true">📅</span>
                <span>Schedule appointments</span>
              </div>
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <span className="text-2xl" aria-hidden="true">💊</span>
                <span>Request medication refills</span>
              </div>
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <span className="text-2xl" aria-hidden="true">❓</span>
                <span>Get answers to FAQs</span>
              </div>
            </section>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes audio-wave {
          0%, 100% {
            height: 1.25rem;
          }
          50% {
            height: 2.25rem;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
        .animate-audio-wave {
          animation: audio-wave 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}