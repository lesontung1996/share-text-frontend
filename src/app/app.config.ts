import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { SocketIoConfig, provideSocketIo } from 'ngx-socket-io';

import { routes } from './app.routes';
import { addTokensInterceptor } from './token-http.interceptor';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSocketIo(config),
    provideHttpClient(withInterceptors([addTokensInterceptor])),
  ],
};
