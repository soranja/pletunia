import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '@/i18nConfig';
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';
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

export function withDataFetch(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    return middleware(request, event, response);
  };
}

export function withI18n(_: CustomMiddleware) {
  return async (request: NextRequest, _: NextFetchEvent, response: NextResponse) => {
    response = i18nRouter(request, i18nConfig);
    return response;
  };
}
