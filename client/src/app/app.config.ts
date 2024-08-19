import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { reducers } from './ngrx/reducers';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { httpInterceptorProviders } from './shared/interceptors';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideStore(reducers),
    provideHttpClient(),
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptorsFromDi()),
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
    importProvidersFrom([BrowserAnimationsModule]),
    provideAnimations(), // required animations providers
    provideToastr(),
  ]
};
