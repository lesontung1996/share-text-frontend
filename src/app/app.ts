import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './theme.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly theme = inject(ThemeService);
  protected readonly http = inject(HttpClient);
  public alias = '';

  protected setThemeModeFromSelect(event: Event) {
    const value = (event.target as HTMLSelectElement | null)?.value;
    if (value === 'system' || value === 'light' || value === 'dark') {
      this.theme.setThemeMode(value);
    }
  }

  public updateAlias() {
    console.log('Updating alias to:', this.alias);
    this.http.post('http://localhost:3000/participants/alias', { alias: this.alias }).subscribe((data) => {
      console.log('Alias updated successfully:', data);
      localStorage.setItem('alias', this.alias);
    });
  }
}
