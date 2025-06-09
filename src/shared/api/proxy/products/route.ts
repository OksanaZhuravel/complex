import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') ?? '1';
  const pageSize = searchParams.get('page_size') ?? '6';

  const apiUrl = `http://o-complex.com:1337/products?page=${page}&page_size=${pageSize}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Ошибка при получении данных с o-complex.com' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка соединения с o-complex.com', details: error },
      { status: 500 }
    );
  }
}
