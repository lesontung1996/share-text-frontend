import { Component, OnInit, signal, inject } from '@angular/core';
import { WebsocketService, SOCKET_EVENTS } from '../socket.service';
import { ActivatedRoute } from '@angular/router';
import { RoomMessagesResponse } from '../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room',
  imports: [FormsModule],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class Room implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  messages = signal<RoomMessagesResponse[]>([]);
  roomCode = signal<string>('');
  textInput: string = "Test";

  constructor(private websocketService: WebsocketService) {
    this.activatedRoute.params.subscribe((params) => {
      this.roomCode.set(params['roomCode']);
    });
    this.websocketService.authenticate(this.roomCode());
  }

  ngOnInit() {
    this.websocketService.getMessages<RoomMessagesResponse[]>(SOCKET_EVENTS.ROOM_JOINED).subscribe((messages) => {
      console.log(messages);
      this.messages.set(messages);
    });
    this.websocketService.getMessages<RoomMessagesResponse>(SOCKET_EVENTS.MESSAGE_NEW).subscribe((messages) => {
      console.log(messages);
      this.messages.update((current) => [...current, messages]);
    });
    this.websocketService.sendMessage(SOCKET_EVENTS.ROOM_JOINED, { room_code: this.roomCode() });
  }

  newMessage() {
    this.websocketService.sendMessage(SOCKET_EVENTS.MESSAGE_NEW, { room_code: this.roomCode(), content: this.textInput });
    this.textInput = '';
  }
}
