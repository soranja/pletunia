import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware, MiddlewareFactory } from '@/types/middleware';

export function chain(functions: MiddlewareFactory[], index = 0): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return (_, __, response: NextResponse) => {
    return response;
  };
}
