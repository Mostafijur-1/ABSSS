import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Event from '@/lib/models/Event';

export async function POST() {
	try {
		await connectDB();

		const sampleEvents = [
			{
				title: 'Research Seminar: Advances in Renewable Energy',
				description: 'A seminar discussing recent advances in renewable energy technologies and sustainability.',
				date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
				image: null,
				category: 'seminar',
				location: 'Main Campus Hall',
				isUpcoming: true
			},
			{
				title: 'Student Workshop: Data Science Basics',
				description: 'Hands-on workshop introducing data science tools and workflows for students.',
				date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
				image: null,
				category: 'workshop',
				location: 'Lab 3',
				isUpcoming: true
			}
		];

		const created = await Event.insertMany(sampleEvents);

		return NextResponse.json({ message: `${created.length} events seeded`, events: created }, { status: 201 });
	} catch (error) {
		console.error('Event seed error:', error);
		return NextResponse.json({ message: 'Failed to seed events', error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
	}
}
