import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
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

  protected readonly theme = inject(ThemeService);

  protected readonly count = signal(0);
  protected readonly double = computed(() => this.count() * 2);

  protected setThemeModeFromSelect(event: Event) {
    const value = (event.target as HTMLSelectElement | null)?.value;
    if (value === 'system' || value === 'light' || value === 'dark') {
      this.theme.setThemeMode(value);
    }
  }

  protected increment() {
    this.count.update((count) => count + 1);
  }
}
