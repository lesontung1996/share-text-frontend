import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const CREATOR_TOKEN_HEADER = 'X-Creator-Token';
const SESSION_TOKEN_HEADER = 'X-Session-Token';
const CREATOR_TOKEN_KEY = 'creatorToken';
const SESSION_TOKEN_KEY = 'sessionToken';

export const addTokensInterceptor: HttpInterceptorFn = ( req, next, ) => {
  const creatorToken = localStorage.getItem(CREATOR_TOKEN_KEY);
  const sessionToken = localStorage.getItem(SESSION_TOKEN_KEY);

  let headers = req.headers;
  if (creatorToken) {
    headers = headers.set(CREATOR_TOKEN_HEADER, creatorToken);
  }
  if (sessionToken) {
    headers = headers.set(SESSION_TOKEN_HEADER, sessionToken);
  }

  const requestWithTokens = req.clone({ headers });

  return next(requestWithTokens).pipe(tap(event => {
    if (event instanceof HttpResponse) {
      const { body } = event as HttpResponse<{ creator_token?: string, session_token?: string }>;
      const newCreatorToken = body?.creator_token;
      const newSessionToken = body?.session_token;
      if (newCreatorToken) {
        localStorage.setItem(CREATOR_TOKEN_KEY, newCreatorToken);
      }
      if (newSessionToken) {
        localStorage.setItem(SESSION_TOKEN_KEY, newSessionToken);
      }
    }
  }));
}
