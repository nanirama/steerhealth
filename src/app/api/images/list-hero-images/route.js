import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const heroDir = path.join(process.cwd(), 'public', 'images', 'hero');
    const blurDir = path.join(process.cwd(), 'public', 'images', 'hero', 'blur');
    
    if (!fs.existsSync(heroDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(heroDir);
    
    // Get all image files from the main hero directory
    const imageFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
      })
      .map(filename => {
        const filePath = path.join(heroDir, filename);
        const stats = fs.statSync(filePath);
        
        // Check if corresponding blur version exists in blur folder
        const blurFilePath = path.join(blurDir, filename);
        const hasBlur = fs.existsSync(blurFilePath);
        
        return {
          filename,
          path: `/images/hero/${filename}`,
          size: stats.size,
          modified: stats.mtime,
          blur: hasBlur ? `/images/hero/blur/${filename}` : null,
        };
      })
      .sort((a, b) => b.modified - a.modified);

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
  }
}