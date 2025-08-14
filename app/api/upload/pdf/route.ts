import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with proper PDF settings
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw', // Use 'raw' for PDFs
          folder: 'pdfs',
          public_id: `pdf_${Date.now()}`,
        },
        (error: any, result: any) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json({
      url: (uploadResult as any).secure_url,
      public_id: (uploadResult as any).public_id,
      message: 'PDF uploaded successfully'
    });

  } catch (error) {
    console.error('PDF upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload PDF' },
      { status: 500 }
    );
  }
}
