import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoomResponse } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private http = inject(HttpClient);
  private router = inject(Router);
  textInput: string = "Test";

  createRoom() {
    this.http.post<RoomResponse>('http://localhost:3000/rooms', { initial_text: this.textInput }).subscribe(response => {
      console.log(response);
      if (response.room_code) {
        this.router.navigateByUrl(`/room/${response.room_code}`);
      }
    });
  }
}
