import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('page_size') || '25';
  const id = searchParams.get('id');

  const query = id ? `id=${id}` : `page=${page}&page_size=${pageSize}`;

  try {
    const res = await fetch(`http://o-complex.com:1337/products?${query}`);
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from external API' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Proxy error', detail: (error as Error).message },
      { status: 500 }
    );
  }
}
