export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: string;
}

export interface Conversation {
  id: string;
  with: {
    id: string;
    name: string;
    avatar: string;
  };
  property: {
    id: string;
    title: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: ChatMessage[];
} 