import { Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type ThemeMode = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

const THEME_MODE_STORAGE_KEY = 'themeMode';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '[attr.data-theme]': 'resolvedTheme()',
    '[attr.data-theme-mode]': 'themeMode()',
    '[class.theme-dark]': "resolvedTheme() === 'dark'",
  },
})
export class App {
  protected readonly title = signal('Tung');
  protected readonly items = signal([
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'Prompt and best practices for AI', link: 'https://angular.dev/ai/develop-with-ai' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ]);

  protected readonly themeMode = signal<ThemeMode>('system');
  private readonly prefersDark = signal(false);

  protected readonly resolvedTheme = computed<ResolvedTheme>(() => {
    const mode = this.themeMode();
    if (mode === 'light' || mode === 'dark') return mode;
    return this.prefersDark() ? 'dark' : 'light';
  });

  protected readonly count = signal(0);
  protected readonly double = computed(() => this.count() * 2);

  constructor() {
    const destroyRef = inject(DestroyRef);

    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(THEME_MODE_STORAGE_KEY);
      if (stored === 'system' || stored === 'light' || stored === 'dark') {
        this.themeMode.set(stored);
      }

      if (typeof window.matchMedia === 'function') {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        this.prefersDark.set(mql.matches);

        const onChange = (event: MediaQueryListEvent) => this.prefersDark.set(event.matches);
        mql.addEventListener('change', onChange);
        destroyRef.onDestroy(() => mql.removeEventListener('change', onChange));
      } else {
        this.prefersDark.set(false);
      }

      effect(() => {
        window.localStorage.setItem(THEME_MODE_STORAGE_KEY, this.themeMode());
      });
    }
  }

  protected setThemeModeFromSelect(event: Event) {
    const value = (event.target as HTMLSelectElement | null)?.value;
    if (value === 'system' || value === 'light' || value === 'dark') {
      this.themeMode.set(value);
    }
  }

  protected increment() {
    this.count.update((count) => count + 1);
  }
}
