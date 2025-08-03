import { chain } from './middlewares/chain';
import { withDataFetch } from './middlewares/withDataFetch';
import { withI18n } from './middlewares/withI18n';

const middlewares = [withDataFetch, withI18n];
export default chain(middlewares);

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
