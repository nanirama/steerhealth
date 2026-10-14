// app/api/images/delete-hero/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Validate filename to prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const heroImagesDir = path.join(process.cwd(), 'public', 'images', 'hero');
    const blurImagesDir = path.join(process.cwd(), 'public', 'images', 'hero', 'blur');
    
    const mainImagePath = path.join(heroImagesDir, filename);
    
    // Generate blur filename
    const extension = path.extname(filename);
    const baseName = path.basename(filename, extension);
    const blurFilename = `${baseName}-blur${extension}`;
    const blurImagePath = path.join(blurImagesDir, blurFilename);

    // Check if main image exists
    if (!fs.existsSync(mainImagePath)) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Delete main image
    fs.unlinkSync(mainImagePath);
    
    // Delete blur image if it exists
    if (fs.existsSync(blurImagePath)) {
      fs.unlinkSync(blurImagePath);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Image deleted successfully',
      deletedFiles: {
        main: filename,
        blur: blurFilename
      }
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}