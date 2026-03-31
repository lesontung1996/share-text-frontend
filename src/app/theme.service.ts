import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

const THEME_MODE_STORAGE_KEY = 'themeMode';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themeMode = signal<ThemeMode>('system');
  private readonly prefersDark = signal(false);

  readonly resolvedTheme = computed<ResolvedTheme>(() => {
    const mode = this.themeMode();
    if (mode === 'light' || mode === 'dark') return mode;
    return this.prefersDark() ? 'dark' : 'light';
  });

  private readonly document = inject(DOCUMENT, { optional: true });
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Guard: if no DOM (SSR/tests), keep pure signal logic only.
    const doc = this.document;
    if (!doc || typeof window === 'undefined') return;

    const stored = window.localStorage.getItem(THEME_MODE_STORAGE_KEY);
    if (stored === 'system' || stored === 'light' || stored === 'dark') {
      this.themeMode.set(stored);
    }

    if (typeof window.matchMedia === 'function') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      this.prefersDark.set(mql.matches);

      const onChange = (event: MediaQueryListEvent) => this.prefersDark.set(event.matches);
      mql.addEventListener('change', onChange);
      this.destroyRef.onDestroy(() => mql.removeEventListener('change', onChange));
    } else {
      this.prefersDark.set(false);
    }

    effect(() => {
      window.localStorage.setItem(THEME_MODE_STORAGE_KEY, this.themeMode());
    });

    effect(() => {
      const html = doc.documentElement;
      const resolved = this.resolvedTheme();
      const mode = this.themeMode();

      html.classList.toggle('theme-dark', resolved === 'dark');
      html.setAttribute('data-theme', resolved);
      html.setAttribute('data-theme-mode', mode);
    });
  }

  setThemeMode(mode: ThemeMode) {
    this.themeMode.set(mode);
  }
}

