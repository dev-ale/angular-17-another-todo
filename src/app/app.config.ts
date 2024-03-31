import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoReducer } from './store/todo.reducer';
import { provideEffects } from '@ngrx/effects';
import { TodoEffects } from './store/todo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'todos', reducer: todoReducer }),
    provideEffects([TodoEffects]),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
  ],
};
