import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Sample Research Paper';
    const authors = searchParams.get('authors') || 'ABSSS Research Team';

    // Create a simple PDF content using basic PDF structure
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 400
>>
stream
BT
/F1 20 Tf
50 720 Td
(${title}) Tj
0 -40 Td
/F1 14 Tf
(By: ${authors}) Tj
0 -40 Td
/F1 12 Tf
(Al Biruni Society of Scientific Studies) Tj
0 -60 Td
(Abstract:) Tj
0 -20 Td
(This is a sample research paper created for demonstration) Tj
0 -15 Td
(purposes. It contains the basic structure of an academic) Tj
0 -15 Td
(paper including title, authors, and abstract sections.) Tj
0 -30 Td
(Introduction:) Tj
0 -20 Td
(Research in various scientific fields continues to evolve) Tj
0 -15 Td
(with new methodologies and technologies. This paper) Tj
0 -15 Td
(presents findings from our recent studies.) Tj
0 -30 Td
(Methodology:) Tj
0 -20 Td
(Our research methodology follows standard academic) Tj
0 -15 Td
(practices including literature review, data collection,) Tj
0 -15 Td
(analysis, and validation of results.) Tj
0 -30 Td
(Results and Discussion:) Tj
0 -20 Td
(The findings of our research demonstrate significant) Tj
0 -15 Td
(implications for the scientific community and provide) Tj
0 -15 Td
(a foundation for future research endeavors.) Tj
0 -30 Td
(Conclusion:) Tj
0 -20 Td
(This research contributes valuable insights to the field) Tj
0 -15 Td
(and opens new avenues for further investigation.) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000726 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
785
%%EOF`;

    return new NextResponse(pdfContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf"`,
        'Cache-Control': 'public, max-age=31536000'
      }
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
