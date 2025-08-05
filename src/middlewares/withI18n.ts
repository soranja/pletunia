import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '@/i18nConfig';

import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';
import { CustomMiddleware } from '@/types/middleware';

export function withI18n(_: CustomMiddleware) {
  return async (request: NextRequest, _: NextFetchEvent, response: NextResponse) => {
    response = i18nRouter(request, i18nConfig);
    return response;
  };
}
