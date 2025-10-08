import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

type FaqItem = { question: string; answer: string };

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'faq.json');
    const file = await fs.readFile(filePath, 'utf8');
    const raw = JSON.parse(file) as unknown;
    const data = Array.isArray(raw)
      ? (raw as FaqItem[])
      : [];
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json([], {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }
}


