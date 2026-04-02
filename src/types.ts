export interface RoomResponse {
    id: string | null;
    room_code: string;
    initial_text: string;
    creator_token: string;
    expires_at: string | null;
    created_at: string | null;
    max_participants: number;
    is_active: boolean | null;
}

export interface RoomMessagesResponse {
  id: string
  room_id: string
  content: string
  author_token: string
  author_alias: string
  created_at: string
  room_code: string
  expires_at: string
  max_participants: number
}
