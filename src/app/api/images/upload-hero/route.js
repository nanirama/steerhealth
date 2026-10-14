import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function POST(request) {
  try {
    // Create the hero images directories if they don't exist
    const heroDir = path.join(process.cwd(), 'public', 'images', 'hero');
    const blurDir = path.join(process.cwd(), 'public', 'images', 'hero', 'blur');
    
    if (!fs.existsSync(heroDir)) {
      fs.mkdirSync(heroDir, { recursive: true });
    }
    if (!fs.existsSync(blurDir)) {
      fs.mkdirSync(blurDir, { recursive: true });
    }

    // Get the form data
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB' }, { status: 400 });
    }

    // Generate unique filename (preserve original extension)
    const timestamp = Date.now();
    const originalName = file.name || 'image';
    const ext = path.extname(originalName).toLowerCase();
    const baseName = path.basename(originalName, ext);
    
    const filename = `${baseName}-${timestamp}${ext}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Get original image metadata
    const image = sharp(buffer);
    const metadata = await image.metadata();
    const { width, height, format } = metadata;

    // Save original image (optimized) in /images/hero/
    const originalPath = path.join(heroDir, filename);
    
    // Process based on original format
    let originalImage = image;
    if (format === 'jpeg' || ext === '.jpg' || ext === '.jpeg') {
      originalImage = originalImage.jpeg({ quality: 90, progressive: true });
    } else if (format === 'png' || ext === '.png') {
      originalImage = originalImage.png({ quality: 90, progressive: true });
    } else if (format === 'webp' || ext === '.webp') {
      originalImage = originalImage.webp({ quality: 90 });
    } else if (format === 'gif' || ext === '.gif') {
      originalImage = originalImage.gif();
    } else {
      // Default to jpeg for unknown formats
      originalImage = originalImage.jpeg({ quality: 90, progressive: true });
    }
    
    await originalImage.toFile(originalPath);

    // Create blur version with same filename and format in /images/hero/blur/
    const blurPath = path.join(blurDir, filename);
    let blurImage = sharp(buffer)
      .resize(width, height, {
        fit: 'fill',
        withoutEnlargement: false
      })
      .blur(8); // Blur radius
    
    // Apply same format for blur version but with lower quality
    if (format === 'jpeg' || ext === '.jpg' || ext === '.jpeg') {
      blurImage = blurImage.jpeg({ quality: 15, progressive: true });
    } else if (format === 'png' || ext === '.png') {
      blurImage = blurImage.png({ quality: 20, progressive: true });
    } else if (format === 'webp' || ext === '.webp') {
      blurImage = blurImage.webp({ quality: 15 });
    } else if (format === 'gif' || ext === '.gif') {
      blurImage = blurImage.gif();
    } else {
      // Default to jpeg for unknown formats
      blurImage = blurImage.jpeg({ quality: 15, progressive: true });
    }
    
    await blurImage.toFile(blurPath);

    // Get file sizes for response
    const originalStats = fs.statSync(originalPath);
    const blurStats = fs.statSync(blurPath);

    return NextResponse.json({
      success: true,
      filename: filename,
      format: format || ext.replace('.', ''),
      original: {
        filename: filename,
        path: `/images/hero/${filename}`,
        size: originalStats.size,
        dimensions: { width, height },
        format: format || ext.replace('.', '')
      },
      blur: {
        filename: filename,
        path: `/images/hero/blur/${filename}`,
        size: blurStats.size,
        dimensions: { width, height },
        format: format || ext.replace('.', '')
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}