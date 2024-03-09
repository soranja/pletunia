import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { CustomMiddleware } from "./chain";

export function withDataFetch(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // console.log(process.env.TG_CHAT_ID);
  
    const response = NextResponse.next();
    return middleware(request, event, response);
  };
}
