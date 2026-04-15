import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

export async function GET() {
  try {
    await dbConnect();
    let portfolio = await Portfolio.findOne({});
    if (!portfolio) {
      portfolio = await Portfolio.create({});
    }
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    let portfolio = await Portfolio.findOne({});
    if (!portfolio) {
      portfolio = await Portfolio.create(body);
    } else {
      // If profileImage is being replaced, old one is overwritten in DB automatically
      Object.assign(portfolio, body);
      await portfolio.save();
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}
