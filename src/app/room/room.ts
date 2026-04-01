import { Component, OnInit, signal } from '@angular/core';
import { WebsocketService } from '../socket.service';

@Component({
  selector: 'app-room',
  imports: [],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class Room implements OnInit {
  message = signal<string>('');

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.getMessages().subscribe((message: string) => {
      this.message.set(message);
      // Manual change detection might be needed in zoneless apps
      console.log(message);
    });
  }

  send() {
    this.websocketService.sendMessage('Hello from Angular');
  }
}
