import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Publication from '@/lib/models/Publication';

export async function POST() {
  try {
    await connectDB();
    
    // Create a test publication to verify the API is working
    const testPublication = {
      title: "Test Publication API",
      authors: ["Test Author"],
      abstract: "This is a test publication to verify the API is working correctly.",
      pdfUrl: "https://example.com/test.pdf",
      category: "research",
      publishedDate: new Date(),
      journal: "Test Journal"
    };

    const publication = new Publication(testPublication);
    const savedPublication = await publication.save();
    
    return NextResponse.json({
      message: 'Test publication created successfully',
      publication: savedPublication
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating test publication:', error);
    return NextResponse.json(
      { message: 'Failed to create test publication', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
