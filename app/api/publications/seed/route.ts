import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Publication from '@/lib/models/Publication';

export async function POST() {
	try {
		await connectDB();

		const samplePubs = [
			{
				title: 'Sustainable Energy Systems: A Review',
				authors: ['A. Researcher', 'B. Scholar'],
				abstract: 'A concise review of sustainable energy systems and recent advancements.',
				pdfUrl: null,
				category: 'review',
				publishedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				journal: 'Journal of Sustainable Science'
			},
			{
				title: 'Case Study: Community-led Water Conservation',
				authors: ['C. Field', 'D. Analyst'],
				abstract: 'Case study describing a successful community-driven water conservation project.',
				pdfUrl: null,
				category: 'case-study',
				publishedDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
				journal: 'Environmental Practice'
			}
		];

		const created = await Publication.insertMany(samplePubs);

		return NextResponse.json({ message: `${created.length} publications seeded`, publications: created }, { status: 201 });
	} catch (error) {
		console.error('Publication seed error:', error);
		return NextResponse.json({ message: 'Failed to seed publications', error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
	}
}
