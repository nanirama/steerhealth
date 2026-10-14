export interface PdfHeaderData {
  logo?: string;
  companyName: string;
  title: string;
  subtitle?: string;
}

export interface PdfScoreData {
  score: number;
  maxScore: number;
  label: string;
  status: 'critical' | 'warning' | 'good';
  color?: string; // Tier color from GaugeChart (e.g., "#ef4444", "#f59e0b", "#10b981")
  statusText?: string; // Tier status text (e.g., "Critical Leakage", "Disconnected", "Top Tier")
}

export interface PdfDiagnosis {
  icon: 'warning' | 'check';
  title: string;
  description: string;
  priority?: string;
}

export interface PdfGapAnalysisItem {
  question: string;
  context: string;
  leak: string;
  priority: string;
  priorityLevel: number;
}

export interface PdfSection {
  title: string;
  content: string;
}

export interface PdfCTA {
  title: string;
  description: string;
  buttons: {
    text: string;
    variant: 'primary' | 'secondary';
    link?: string;
  }[];
}

export interface PdfData {
  header: PdfHeaderData;
  score: PdfScoreData;
  diagnosis: PdfDiagnosis[];
  sections: PdfSection[];
  gapAnalysis: PdfGapAnalysisItem[];
  cta?: PdfCTA;
}
