import { Component, OnInit, signal, inject } from '@angular/core';
import { WebsocketService, SOCKET_EVENTS } from '../socket.service';
import { ActivatedRoute } from '@angular/router';
import { RoomMessagesResponse } from '../../types';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLink, lucideCopy, lucideShare } from '@ng-icons/lucide';
import { ZardButtonComponent } from '../shared/components/button/button.component';
import { ZardInputDirective } from '../shared/components/input/input.directive';
import { ZardSelectImports } from '../shared/components/select/select.imports';
import { toast } from 'ngx-sonner';
import { QRCodeComponent } from 'angularx-qrcode';
import { HighlightAuto, HighlightLoader } from 'ngx-highlightjs';
import hljs from 'highlight.js';
import { ThemeService } from '../theme.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-room',
  imports: [FormsModule, ZardButtonComponent, NgIcon, QRCodeComponent, ZardInputDirective, HighlightAuto, DatePipe, ...ZardSelectImports],
  templateUrl: './room.html',
  styleUrl: './room.css',
  viewProviders: [provideIcons({ lucideLink, lucideCopy, lucideShare })],
})
export class Room implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private highlightLoader = inject(HighlightLoader);
  private themeService = inject(ThemeService);
  messages = signal<RoomMessagesResponse[]>([]);
  roomCode = signal<string>('');
  textInput: string = '';
  displayTypes = signal<Record<string, 'text' | 'code'>>({});

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
      this.displayTypes.set(messages.reduce((acc, msg) => ({ ...acc, [msg.id]: 'text' }), {}));
    });
    this.websocketService.getMessages<RoomMessagesResponse>(SOCKET_EVENTS.MESSAGE_NEW).subscribe((message) => {
      console.log(message);
      this.messages.update((current) => [...current, message]);
      this.displayTypes.update((types) => ({ ...types, [message.id]: 'text' }));
    });
    this.websocketService.sendMessage(SOCKET_EVENTS.ROOM_JOINED, { room_code: this.roomCode() });

    // effect(() => {
    //   const theme = this.themeService.resolvedTheme();
    //   const themePath = theme === 'dark' ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css' : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    //   this.highlightLoader.setTheme(themePath);
    // });
  }

  newMessage() {
    if (!this.textInput.trim()) return;
    this.websocketService.sendMessage(SOCKET_EVENTS.MESSAGE_NEW, { room_code: this.roomCode(), content: this.textInput });
    this.textInput = '';
  }

  copyMessage(content: string, index: number) {
    navigator.clipboard.writeText(content).then(() => {
      toast.success('Message copied to clipboard', {
        position: 'top-center',
      });
    });
  }

  copyRoomUrl() {
    const url = `${window.location.origin}/room/${this.roomCode()}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('URL copied to clipboard', {
        position: 'top-center',
      });
    });
  }

  get roomUrl(): string {
    return `${window.location.origin}/room/${this.roomCode()}`;
  }

  handleComposerKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.newMessage();
    }
  }
}
