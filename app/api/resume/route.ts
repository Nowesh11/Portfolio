import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

export async function GET() {
  try {
    await dbConnect();
    const portfolio = await Portfolio.findOne({});

    if (!portfolio?.resumeFile) {
      return NextResponse.json({ error: 'No resume uploaded' }, { status: 404 });
    }

    // resumeFile is stored as base64 data URL: data:application/pdf;base64,...
    const base64Data = portfolio.resumeFile.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${portfolio.resumeFileName || 'resume.pdf'}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to download resume' }, { status: 500 });
  }
}
