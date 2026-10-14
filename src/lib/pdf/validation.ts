import { PdfData } from '@/types/pdf';

export class PdfValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PdfValidationError';
  }
}

export function validatePdfData(data: unknown): asserts data is PdfData {
  if (!data || typeof data !== 'object') {
    throw new PdfValidationError('Invalid PDF data: must be an object');
  }

  const pdf = data as Partial<PdfData>;

  if (!pdf.header) {
    throw new PdfValidationError('Missing required field: header');
  }

  if (!pdf.header.companyName || !pdf.header.title) {
    throw new PdfValidationError('Header must include companyName and title');
  }

  if (!pdf.score) {
    throw new PdfValidationError('Missing required field: score');
  }

  if (
    typeof pdf.score.score !== 'number' ||
    typeof pdf.score.maxScore !== 'number'
  ) {
    throw new PdfValidationError('Score must include numeric score and maxScore');
  }

  if (!['critical', 'warning', 'good'].includes(pdf.score.status)) {
    throw new PdfValidationError(
      'Score status must be "critical", "warning", or "good"'
    );
  }

  if (!pdf.sections || !Array.isArray(pdf.sections)) {
    throw new PdfValidationError('Sections must be an array');
  }

  if (!pdf.diagnosis || !Array.isArray(pdf.diagnosis)) {
    throw new PdfValidationError('Diagnosis must be an array');
  }

  if (!pdf.gapAnalysis || !Array.isArray(pdf.gapAnalysis)) {
    throw new PdfValidationError('Gap analysis must be an array');
  }
}

export function sanitizePdfData(data: PdfData): PdfData {

  return {
    header: {
      companyName: String(data.header.companyName).trim(),
      title: String(data.header.title).trim(),
      subtitle: data.header.subtitle
        ? String(data.header.subtitle).trim()
        : undefined,
    },
    score: {
      score: Math.max(0, Math.min(data.score.maxScore, data.score.score)),
      maxScore: Math.max(1, data.score.maxScore),
      label: String(data.score.label).trim(),
      status: data.score.status,
      // Preserve optional tier color and status text from GaugeChart
      color: data.score.color,
      statusText: data.score.statusText,
    },
    diagnosis: data.diagnosis.map((d) => ({
      icon: d.icon,
      title: String(d.title).trim(),
      description: String(d.description).trim(),
      priority: d.priority,
    })),
    sections: data.sections.map((s) => ({
      title: String(s.title).trim(),
      content: String(s.content).trim(),
    })),
    gapAnalysis: data.gapAnalysis.map((g) => ({
      question: String(g.question).trim(),
      context: String(g.context).trim(),
      leak: String(g.leak).trim(),
      priority: String(g.priority).trim(),
      priorityLevel: Math.max(0, g.priorityLevel),
    })),
    cta: data.cta
      ? {
          title: String(data.cta.title).trim(),
          description: String(data.cta.description).trim(),
          buttons: data.cta.buttons.map((b) => {
            // Always include link property if it exists in source, even if empty
            const button: { text: string; variant: 'primary' | 'secondary'; link?: string } = {
              text: String(b.text).trim(),
              variant: b.variant,
            };
            // Check if link property exists in the source object (using 'in' operator)
            if ('link' in b) {
              button.link = b.link ? String(b.link).trim() : b.link;
            }
             return button;
          }),
        }
      : undefined,
  };
}
