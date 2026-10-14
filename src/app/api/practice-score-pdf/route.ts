import { NextRequest, NextResponse } from 'next/server';
import { buildPdf } from '@/lib/pdf/practiceScoreBuildPdf';
import {
  validatePdfData,
  sanitizePdfData,
  PdfValidationError,
} from '@/lib/pdf/validation';

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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Debug: Log incoming CTA buttons


    validatePdfData(data);
    const sanitizedData = sanitizePdfData(data);
    
    // Debug: Log sanitized CTA buttons
 

    const pdfBuffer = await buildPdf(sanitizedData);
    const filename = `practice-report-${generateUniqueFilename()}`;

    // Convert Buffer to Uint8Array for NextResponse compatibility
    const pdfArray = new Uint8Array(pdfBuffer);

    return new NextResponse(pdfArray, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}.pdf"`,
        'Content-Length': pdfArray.length.toString(),
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    
    if (error instanceof PdfValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Log full error details for debugging
    console.error('Full error details:', {
      message: errorMessage,
      stack: errorStack,
      error: error,
    });

    return NextResponse.json(
      { 
        error: 'Failed to generate PDF', 
        details: errorMessage,
        // Include stack in development for debugging
        ...(process.env.NODE_ENV === 'development' && errorStack ? { stack: errorStack } : {})
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
