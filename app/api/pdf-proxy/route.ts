import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	// Minimal placeholder response for PDF proxy route.
	return NextResponse.json({ message: 'PDF proxy endpoint (placeholder)' });
}

export async function POST(request: NextRequest) {
	// If PDF proxy uploads are required, implement handling here.
	return NextResponse.json({ message: 'POST to PDF proxy received (placeholder)' });
}
