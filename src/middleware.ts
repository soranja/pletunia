import { chain, withDataFetch, withI18n } from './middlewares/';

const middlewares = [withDataFetch, withI18n];
export default chain(middlewares);

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
