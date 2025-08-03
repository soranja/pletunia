import { i18nRouter } from 'next-i18n-router';
import i18nConfig from '@/i18nConfig';

import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';

import { CustomMiddleware } from './chain';

export function withI18n(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    response = i18nRouter(request, i18nConfig);
    return response;
  };
}
