'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';

const API_BASE = 'https://mcp-server.dev.steerhealth.io';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface Status {
  message: string;
  type: 'connecting' | 'connected' | 'error' | '';
}

export default function LunaVoiceForm({ onClose }: any) {
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
      console.log('📝 Capturing lead...');
      await fetch(`${API_BASE}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });
      console.log('✅ Lead captured');

      // Get token from MCP server
      console.log('🎫 Requesting token from:', `${API_BASE}/api/token`);
      const tokenRes = await fetch(`${API_BASE}/api/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: name,
          user_email: email,
          user_phone: phone
        })
      });

      console.log('📥 Token response status:', tokenRes.status);

      if (!tokenRes.ok) {
        const errorText = await tokenRes.text();
        console.error('❌ Token error:', errorText);
        throw new Error(`Failed to get connection token: ${errorText}`);
      }

      const tokenData = await tokenRes.json();
      console.log('✅ Token received:', { hasToken: !!tokenData.token, hasUrl: !!tokenData.url });
      return false;

      const { token, url, room: roomName } = tokenData;

      if (!token || !url) {
        throw new Error('Invalid token response: missing token or URL');
      }

      console.log('🔗 Connecting to room:', roomName);

      // Connect to LiveKit
      const LK = livekitRef.current;
      const room = new LK.Room({
        adaptiveStream: true,
        dynacast: true
      });
      roomRef.current = room;

      // Set up event handlers BEFORE connecting
      room.on(LK.RoomEvent.Connected, () => {
        console.log('✅ Room connected event fired');
        updateStatus('Connected! Luna will greet you shortly...', 'connected');
      });

      room.on(LK.RoomEvent.TrackSubscribed, (track: any, publication: any, participant: any) => {
        console.log('🎵 Track subscribed:', track.kind, 'from', participant.identity);
        console.log('🎵 Track details:', {
          kind: track.kind,
          source: track.source,
          muted: track.isMuted,
          participantIdentity: participant.identity,
          localParticipant: room.localParticipant.identity
        });

        if (track.kind === 'audio' && participant.identity !== room.localParticipant.identity) {
          console.log('🔊 Attaching audio element...');
          const audioElement = track.attach();
          audioElement.volume = 0.9;
          document.body.appendChild(audioElement);
          console.log('✅ Audio element attached and added to DOM');

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

      room.on(LK.RoomEvent.ConnectionStateChanged, (state: any) => {
        console.log('🔄 Connection state changed:', state);
      });

      room.on(LK.RoomEvent.TrackPublished, (publication: any, participant: any) => {
        console.log('📢 Track published by:', participant.identity, 'kind:', publication.kind);
      });

      // Connect to room with timeout
      console.log('⏳ Attempting to connect to room...');
      const connectPromise = room.connect(url, token);

      // Add a timeout to catch hanging connections
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Connection timeout after 30 seconds')), 30000);
      });

      await Promise.race([connectPromise, timeoutPromise]);
      console.log('✅ Room.connect() completed');

      // Publish microphone
      console.log('🎤 Creating audio tracks...');
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
        console.log('🎤 Publishing microphone...');
        await room.localParticipant.publishTrack(audioTrack);
        console.log('✅ Microphone published successfully');
      } else {
        console.warn('⚠️ No audio track found');
      }

      // Update UI state after everything is set up
      console.log('🎨 Updating UI state - showing disconnect button');
      setIsConnected(true);
      setIsConnecting(false);

      console.log('⏳ Waiting for Luna agent to join the room...');

    } catch (error) {
      console.error('❌ Connection failed:', error);
      updateStatus(`Connection failed: ${(error as Error).message}`, 'error');
      setIsConnecting(false);
      setIsConnected(false);

      // Clean up room if it exists
      if (roomRef.current) {
        try {
          await roomRef.current.disconnect();
        } catch (e) {
          console.error('Error disconnecting:', e);
        }
        roomRef.current = null;
      }
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
    <>
    <div className="max-w-2xl w-full flex items-center justify-center mx-auto relative">
      
      <div className="w-full max-w-2xl mx-auto ">
        <div className="bg-white px-10 pt-6 pb-10 border border-white/30">

          <div className={`${isConnected ? 'min-h-[400px] justify-center' : 'min-h-[470px] justify-start text-left'}  w-full flex flex-col items-center`}>
            {/* Form or Disconnect Button */}
            {!isConnected ? (
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                {/* Logo */}
                <header className="text-center mb-6">
                  <h2 className="font-gilroy-semibold md:text-[36px] text-[24px] mb-2 text-[#181D27]">
                   <span className='grayscale'> 🎧 </span>Try it yourself
                  </h2>
                  <p className="text-[#171717] text-base">See how Luna handles real patient calls in seconds.</p>
                  {/* <p className="text-white/90 text-lg">SteerHealth Voice Assistant</p> */}
                </header>
                <div>
                  {/* <label htmlFor="name" className="font3 block text-[#171717] font-semibold text-sm mb-2">
                    Full <span className='text-[#335cff]'>*</span>
                  </label> */}
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name*"
                    autoComplete="name"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#171717]/20  text-[#525866] placeholder[#171717]/20 focus:outline-none focus:border-[#171717]/60 focus:bg-white/15 transition-all"
                  />
                </div>

                <div>
                  {/* <label htmlFor="email" className="font3 block text-[#171717] font-semibold text-sm mb-2">
                    Email <span className='text-[#335cff]'>*</span>
                  </label> */}
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email*"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#171717]/20  text-[#525866] placeholder-[#171717]/20 focus:outline-none focus:border-[#171717]/60 focus:bg-white/15 transition-all"
                  />
                </div>

                <div>
                  {/* <label htmlFor="phone" className="font3 block text-[#171717] font-semibold text-sm mb-2">
                    Phone Number <span className='text-[#335cff]'>*</span>
                  </label> */}
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number*"
                    autoComplete="tel"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#171717]/20  text-[#525866] placeholder-[#171717]/20 focus:outline-none focus:border-[#171717]/60 focus:bg-white/15 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e as any)}
                  disabled={isConnecting}
                  className="py-3 px-10 mt-2 rounded-[8px] w-full block mx-auto  bg-[#335CFF] text-white font-interdisplay-light font-semibold text-lg hover:-translate-y-0.5 transition-all disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  Connect to Luna
                </button>
                <p className="text-xs text-[#a3a3a3]">By signing up, you agree to the <Link href="/" className="underline">Privacy Policy</Link> and <Link href="/" className="underline">Terms of Use.</Link></p>
              </form>
            ) : (
              <button
                onClick={handleDisconnect}
                className="font3 w-full py-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all"
              >
                ✖ End Conversation
              </button>
            )}

            {/* Status */}
            {status.message && (
              <div
                role="status"
                aria-live="polite"
                className={`w-full !text-[14px] font-gilroy-semibold mt-3 p-1 rounded-xl text-center font-medium animate-fade-in ${status.type === 'connecting'
                  ? 'bg-yellow-400/20 border-1 border-yellow-400/50 text-yellow-600'
                  : status.type === 'connected'
                    ? 'bg-green-500/20 border-1 border-green-500/50 text-green-600'
                    : 'bg-red-500/20 border-1 border-red-500/50 text-red-600'
                  }`}
              >
                {status.message}
              </div>
            )}

            {/* Audio Indicator */}

            {isConnected && (
              <div className="w-full h-[40px] overflow-hidden mt-2">
                {
                  showAudioIndicator && (
                    <div className="flex justify-center gap-2 mt-2" aria-label="Audio playing">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-5 bg-white rounded-sm animate-audio-wave"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  )
                }
              </div>
            )}

            {/* Features */}
            {isConnected && (
              <section className="w-full mt-2 pt-2 space-y-4">
                <div className="font3 flex items-center gap-4 text-[#17717] text-sm">
                  <span className="text-2xl" aria-hidden="true">📅</span>
                  <span>Schedule appointments</span>
                </div>
                <div className="font3 flex items-center gap-4 text-[#17717] text-sm">
                  <span className="text-2xl" aria-hidden="true">💊</span>
                  <span>Request medication refills</span>
                </div>
                <div className="font3 flex items-center gap-4 text-[#17717] text-sm">
                  <span className="text-2xl" aria-hidden="true">❓</span>
                  <span>Get answers to FAQs</span>
                </div>
              </section>
            )}
          </div>
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
    </>
  );
}