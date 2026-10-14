import React from 'react';
import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  Link,
} from '@react-pdf/renderer';
import { PdfData } from '@/types/pdf';

// Register site fonts with error handling
// Using fonts from public/fonts folder to match site styling
// Note: react-pdf has issues with WOFF2 files causing DataView errors
// We'll use TTF files when available, or fallback to Helvetica
import path from 'path';
import fs from 'fs';

const fontsDir = path.join(process.cwd(), 'public', 'fonts');

// Helper function to find font file (prefer TTF, fallback to WOFF2)
function findFontFile(baseName: string): string | null {
  const ttfPath = path.join(fontsDir, `${baseName}.ttf`);
  const woff2Path = path.join(fontsDir, `${baseName}.woff2`);
  
  // Prefer TTF as react-pdf has better support
  if (fs.existsSync(ttfPath)) {
    return ttfPath;
  }
  // Only use WOFF2 if TTF doesn't exist
  if (fs.existsSync(woff2Path)) {
    return woff2Path;
  }
  return null;
}

// Helper function to download font from URL and save locally
async function downloadFont(url: string, localPath: string): Promise<string | null> {
  try {
    // Check if font already exists locally
    if (fs.existsSync(localPath)) {
      return localPath;
    }

    // Download font from URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download font: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    
    // Ensure fonts directory exists
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save font to local path
    fs.writeFileSync(localPath, Buffer.from(buffer));
    return localPath;
  } catch (error) {
    console.warn(`Failed to download font from ${url}:`, error);
    return null;
  }
}

// Register fonts with error handling - skip if files don't exist or registration fails
try {
  const gilroyRegularPath = findFontFile('GilroyRegular');
  if (gilroyRegularPath) {
    Font.register({
      family: 'GilroyRegular',
      src: gilroyRegularPath,
    });
  }
} catch (error) {
  console.warn('GilroyRegular font registration failed, will use Helvetica:', error);
}

// Initialize GilroySemiBold font - download from URL if not found locally
// NOTE: react-pdf does NOT support WOFF2 format - it causes "DataView" errors
// This function only attempts to register TTF fonts, or skips registration entirely
let gilroySemiBoldInitialized = false;
async function initializeGilroySemiBold(): Promise<void> {
  if (gilroySemiBoldInitialized) {
    return; // Already initialized
  }

  try {
    // First check if TTF font exists locally (WOFF2 is not supported by react-pdf)
    const ttfPath = path.join(fontsDir, 'GilroySemiBold.ttf');
    
    if (fs.existsSync(ttfPath)) {
      try {
        Font.register({
          family: 'GilroySemiBold',
          src: ttfPath,
        });
        gilroySemiBoldInitialized = true;
        console.log('GilroySemiBold font registered from local TTF file');
        return;
      } catch (localError) {
        console.warn('Failed to register local GilroySemiBold TTF font:', localError);
      }
    }
    
    // Skip WOFF2 fonts - react-pdf doesn't support them and causes DataView errors
    console.warn('GilroySemiBold WOFF2 font skipped - react-pdf does not support WOFF2 format. Using Helvetica fallback.');
  } catch (error) {
    console.warn('GilroySemiBold font initialization failed, will use Helvetica:', error);
  }
}

// Initialize InterDisplay-Regular font - download from URL if not found locally
// NOTE: react-pdf does NOT support WOFF2 format - it causes "DataView" errors
// This function only attempts to register TTF fonts, or skips registration entirely
let interDisplayInitialized = false;
async function initializeInterDisplay(): Promise<void> {
  if (interDisplayInitialized) {
    return; // Already initialized
  }

  try {
    // First check if TTF font exists locally (WOFF2 is not supported by react-pdf)
    const ttfPath = path.join(fontsDir, 'InterDisplay-Regular.ttf');
    
    if (fs.existsSync(ttfPath)) {
      try {
        Font.register({
          family: 'InterDisplay',
          src: ttfPath,
        });
        interDisplayInitialized = true;
        console.log('InterDisplay font registered from local TTF file');
        return;
      } catch (localError) {
        console.warn('Failed to register local InterDisplay TTF font:', localError);
      }
    }
    
    // Skip WOFF2 fonts - react-pdf doesn't support them and causes DataView errors
    console.warn('InterDisplay-Regular WOFF2 font skipped - react-pdf does not support WOFF2 format. Using Helvetica fallback.');
  } catch (error) {
    console.warn('InterDisplay font initialization failed, will use Helvetica:', error);
  }
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica', // Using Helvetica (WOFF2 fonts not supported by react-pdf)
    fontSize: 11, // Increased from 10 for better readability
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  steerText: {
    fontSize: 36, // Matching text-5xl/6xl size
    fontWeight: 800, // font-extrabold (extra bold)
    letterSpacing: -0.02, // tracking-tighter (tight letter spacing)
    color: '#142569', // Matching page.tsx color
    fontFamily: 'Helvetica-Bold',
    marginRight: 6, // gap-1.5 equivalent (space between words)
  },
  elevateText: {
    fontSize: 36, // Matching text-5xl/6xl size
    fontWeight: 800, // font-extrabold (extra bold)
    letterSpacing: -0.02, // tracking-tighter (tight letter spacing)
    color: '#0CA039', // Matching page.tsx color
    fontFamily: 'Helvetica-Bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginTop: 8,
    color: '#111827',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold', // Using Helvetica-Bold (WOFF2 fonts not supported by react-pdf)
  },
  subtitle: {
    fontSize: 12, // Increased from 11
    color: '#6b7280',
    marginTop: 6,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 30,
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    border: '8px solid #ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 700,
    color: '#111827',
    fontFamily: 'Helvetica-Bold', // Using Helvetica-Bold (WOFF2 fonts not supported by react-pdf)
  },
  scoreLabel: {
    fontSize: 10,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Helvetica',
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#ef4444',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 8,
    fontFamily: 'Helvetica',
  },
  diagnosisContainer: {
    marginVertical: 20,
  },
  diagnosisBox: {
    padding: 16,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    borderLeft: '4px solid #f59e0b',
    marginBottom: 12,
  },
  diagnosisBoxGreen: {
    backgroundColor: '#f0fdf4',
    borderLeft: '4px solid #10b981',
  },
  diagnosisTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold', // Using Helvetica-Bold (WOFF2 fonts not supported by react-pdf)
  },
  diagnosisIcon: {
    fontSize: 9,
    color: '#f59e0b',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Helvetica',
  },
  diagnosisIconGreen: {
    color: '#10b981',
  },
  diagnosisDescription: {
    fontSize: 10, // Increased from 9
    lineHeight: 1.5,
    color: '#374151',
    fontFamily: 'Helvetica',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 12,
    fontFamily: 'Helvetica-Bold', // Using Helvetica-Bold (WOFF2 fonts not supported by react-pdf)
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 11, // Increased from 9 for better paragraph readability
    lineHeight: 1.6,
    color: '#4b5563',
    fontFamily: 'Helvetica',
  },
  aiBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0CA039', // Green color matching the site
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: 700,
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
  },
  gapAnalysisContainer: {
    marginVertical: 20,
  },
  gapAnalysisTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 16,
    fontFamily: 'Helvetica-Bold', // Using Helvetica-Bold (WOFF2 fonts not supported by react-pdf)
  },
  gapItem: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    border: '1px solid transparent',
    minHeight: 50, // Ensure minimum height to keep content together
  },
  gapItemNotOptimal: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
  },
  gapItemLast: {
    marginBottom: 0,
  },
  gapItemContent: {
    flexDirection: 'row',
    gap: 12,
  },
  gapIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10b981', // Darker green for better contrast with white tick mark
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  gapIndicatorNotOptimal: {
    backgroundColor: '#fee2e2',
  },
  gapIndicatorText: {
    fontSize: 12,
    fontWeight: 800,
    color: '#ffffff', // White color for better visibility on green background
    fontFamily: 'Helvetica-Bold',
  },
  gapIndicatorTextNotOptimal: {
    color: '#dc2626',
  },
  gapQuestionContainer: {
    flex: 1,
  },
  gapQuestion: {
    fontSize: 11, // Increased from 10
    fontWeight: 600,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  gapQuestionNotOptimal: {
    color: '#991b1b',
  },
  gapContext: {
    fontSize: 10, // Increased from 9
    color: '#991b1b',
    fontStyle: 'normal',
    marginBottom: 10,
    marginTop: 8,
    padding: 8,
    backgroundColor: '#fee2e2',
    borderRadius: 6,
    lineHeight: 1.5,
    fontFamily: 'Helvetica',
  },
  gapMeta: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  gapLeak: {
    fontSize: 8,
    fontWeight: 600,
    color: '#059669',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Helvetica',
  },
  gapLeakNotOptimal: {
    color: '#dc2626',
  },
  gapPriority: {
    fontSize: 8,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Helvetica',
  },
  ctaContainer: {
    marginTop: 30,
    padding: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold', // Using Helvetica-Bold (WOFF2 fonts not supported by react-pdf)
  },
  ctaDescription: {
    fontSize: 11, // Increased from 10
    color: '#dbeafe',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Helvetica',
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  ctaButton: {
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    fontSize: 10,
    fontWeight: 600,
    color: '#3b82f6',
    fontFamily: 'Helvetica',
    textDecoration: 'none',
  },
  ctaButtonSecondary: {
    backgroundColor: 'transparent',
    border: '2px solid #ffffff',
    color: '#ffffff',
    fontFamily: 'Helvetica',
    textDecoration: 'none',
  },
  ctaButtonText: {
    textDecoration: 'none',
    color: 'inherit',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
});

const PdfDocument = ({ data }: { data: PdfData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.steerText}>Steer</Text>
            <Text style={styles.elevateText}>Elevate</Text>
          </View>
          <Text style={styles.title}>{data.header.title}</Text>
          {data.header.subtitle && (
            <Text style={styles.subtitle}>{data.header.subtitle}</Text>
          )}
        </View>

        <View style={styles.scoreContainer}>
          <View style={[
            styles.scoreCircle,
            // Use tier color from GaugeChart for the circle border
            data.score.color ? { border: `8px solid ${data.score.color}` } : {}
          ]}>
            <Text style={styles.scoreNumber}>{data.score.score}</Text>
          </View>
          <Text style={styles.scoreLabel}>{data.score.label}</Text>
          <Text style={[
            styles.statusLabel,
            // Use tier color from GaugeChart for the status label
            data.score.color ? { color: data.score.color } : {}
          ]}>
            {/* Use tier status text from GaugeChart (e.g., "Critical Leakage", "Disconnected", "Top Tier") */}
            {data.score.statusText ? data.score.statusText.toUpperCase() : 
              (data.score.status === 'critical' ? 'CRITICAL LEAKAGE' :
               data.score.status === 'warning' ? 'WARNING' : 'HEALTHY')}
          </Text>
        </View>

        {data.diagnosis.map((item, index) => (
          <View
            key={index}
            style={[
              styles.diagnosisBox,
              item.icon === 'check' && styles.diagnosisBoxGreen,
            ]}
          >
            {item.icon === 'warning' ? (
              <Text style={[
                styles.diagnosisIcon,
                { fontSize: 12 }
              ]}>
                <Text style={{ color: data.score.color || '#f59e0b', fontSize: 16 }}>⚠ </Text>
                <Text style={{ color: '#000000' }}>THE DIAGNOSIS</Text>
              </Text>
            ) : (
              <Text style={[
                styles.diagnosisIcon,
                item.icon === 'check' && styles.diagnosisIconGreen,
                { fontSize: 12 }
              ]}>
                ✓ HIGHEST PRIORITY ACTION
              </Text>
            )}
            <Text style={[styles.diagnosisTitle, { paddingTop: 4 }]}>{item.title}</Text>
            <Text style={styles.diagnosisDescription}>{item.description}</Text>
          </View>
        ))}

        {data.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            {section.title === 'Strategic Analysis' ? (
              <View style={styles.sectionTitleContainer}>
                <View style={styles.aiBadge}>
                  <Text style={styles.aiBadgeText}>AI</Text>
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
            ) : (
              <Text style={styles.sectionTitle}>{section.title}</Text>
            )}
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        {data.gapAnalysis.length > 0 && (
          <View style={styles.gapAnalysisContainer}>
            <Text style={styles.gapAnalysisTitle}>Detailed Gap Analysis</Text>
            {data.gapAnalysis.map((item, index) => {
              const isOptimal = item.leak === 'OPTIMIZED';
              return (
                <View
                  key={index}
                  break={false}
                  wrap={false}
                  minPresenceAhead={100}
                  style={[
                    styles.gapItem,
                    !isOptimal && styles.gapItemNotOptimal,
                    index === data.gapAnalysis.length - 1 && styles.gapItemLast,
                  ]}
                >
                  <View style={styles.gapItemContent} wrap={false}>
                    <View style={[
                      styles.gapIndicator,
                      !isOptimal && styles.gapIndicatorNotOptimal,
                    ]}>
                      <Text style={[
                        styles.gapIndicatorText,
                        !isOptimal && styles.gapIndicatorTextNotOptimal,
                      ]}>
                        {isOptimal ? '✓' : '!'}
                      </Text>
                    </View>
                    <View style={styles.gapQuestionContainer}>
                      <Text style={[
                        styles.gapQuestion,
                        !isOptimal && styles.gapQuestionNotOptimal,
                      ]}>
                        {item.question}
                      </Text>
                      {!isOptimal && item.context && (
                        <Text style={styles.gapContext}>"{item.context}"</Text>
                      )}
                      <View style={styles.gapMeta}>
                        <Text style={[
                          styles.gapLeak,
                          !isOptimal && styles.gapLeakNotOptimal,
                        ]}>
                          {item.leak}
                        </Text>
                        {!isOptimal && item.priority && (
                          <Text style={styles.gapPriority}>{item.priority}</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {data.cta && (
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaTitle}>{data.cta.title}</Text>
            <Text style={styles.ctaDescription}>{data.cta.description}</Text>
            <View style={styles.ctaButtons}>
              {data.cta.buttons.map((button, index) => {
                let buttonStyle = styles.ctaButton;
                let buttonTextStyle = styles.ctaButtonText;

                if (button.variant === 'secondary') {
                  // Secondary button: "bg-blue-500 text-white border border-blue-400 px-8 py-4 rounded-xl font-bold"
                  buttonStyle = {
                    ...styles.ctaButton,
                    backgroundColor: '#3B82F6', // Tailwind bg-blue-500
                    borderWidth: 1,
                    borderColor: '#60A5FA',     // Tailwind border-blue-400
                    borderStyle: 'solid',
                    borderRadius: 12,           // Tailwind rounded-xl ~12px
                    paddingHorizontal: 32,      // Tailwind px-8 = 2rem = 32px
                    paddingVertical: 12,        // Tailwind py-4 = 1rem = 16px
                  };
                  buttonTextStyle = {
                    ...styles.ctaButtonText,
                    color: '#fff',
                    fontWeight: 700, // Tailwind font-bold
                  };
                } else if (button.variant === 'primary') {
                  // Primary button: "bg-white text-blue-600 px-8 py-4 rounded-xl font-bold"
                  buttonStyle = {
                    ...styles.ctaButton,
                    backgroundColor: '#fff',   
                    borderRadius: 12,            // rounded-xl ~12px
                    paddingHorizontal: 32,       // px-8 = 32px
                    paddingVertical: 12,         // py-4 = 16px
                  };
                  buttonTextStyle = {
                    ...styles.ctaButtonText,
                    color: '#2563EB',            // Tailwind text-blue-600 (#2563EB)
                    fontWeight: 700, // Tailwind font-bold
                  };
                }

                return (
                  <Link
                    key={index}
                    src={button.link || '#'}
                    style={buttonStyle}
                  >
                    <Text style={buttonTextStyle}>{button.text}</Text>
                  </Link>
                );
              })}
            </View>
          </View>
        )}

        <Text style={styles.footer} fixed>
          Generated by Steer Elevate • {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
};

export async function buildPdf(data: PdfData): Promise<Buffer> {
  try {
    // Skip font initialization - react-pdf doesn't support WOFF2 format
    // Using Helvetica/Helvetica-Bold directly in styles to avoid DataView errors
    // If TTF fonts are needed in the future, they can be registered here
    
    const stream = await ReactPDF.renderToStream(<PdfDocument data={data} />);
    
    const chunks: Uint8Array[] = [];
    
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (error) => {
        console.error('PDF stream error:', error);
        reject(error);
      });
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error details:', { errorMessage, errorStack });
    throw new Error(`PDF generation failed: ${errorMessage}`);
  }
}
