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
import { provideZard } from '@/shared/core/provider/providezard';
import { provideHighlightOptions } from 'ngx-highlightjs';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSocketIo(config),
    provideHttpClient(withInterceptors([addTokensInterceptor])),
    provideZard(),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      themePath: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/vs2015.min.css',
    }),
  ],
};
