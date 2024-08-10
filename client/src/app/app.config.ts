import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { reducers } from './ngrx/reducers';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideStore(reducers),
    provideHttpClient(),
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([BrowserAnimationsModule]),
    provideAnimations(), // required animations providers
    provideToastr(),
  ]
};
