import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly theme = inject(ThemeService);

  protected setThemeModeFromSelect(event: Event) {
    const value = (event.target as HTMLSelectElement | null)?.value;
    if (value === 'system' || value === 'light' || value === 'dark') {
      this.theme.setThemeMode(value);
    }
  }
}
