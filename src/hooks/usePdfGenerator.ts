import { useState } from 'react';
import { PdfData } from '@/types/pdf';

interface UsePdfGeneratorReturn {
  generatePdf: (data: PdfData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * Generates a unique filename with format: YYYYMMDDHHSSRRRRMMM (19 digits)
 * Format: Year(4) + Month(2) + Date(2) + Hours(2) + Seconds(2) + Random(4) + Milliseconds(3)
 */
function generateUniqueFilename(): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  
  return `${year}${month}${date}${hours}${seconds}${random}${milliseconds}`;
}

export function usePdfGenerator(): UsePdfGeneratorReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePdf = async (data: PdfData) => {
    setLoading(true);
    setError(null);

    try {
      // Debug: Log data before stringify
      console.log('usePdfGenerator - data before stringify:', JSON.stringify(data, null, 2));
      console.log('usePdfGenerator - buttons:', data.cta?.buttons);
      
      const response = await fetch('/api/practice-score-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.details || 'Failed to generate PDF';
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `practice-report-${generateUniqueFilename()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generatePdf, loading, error };
}
