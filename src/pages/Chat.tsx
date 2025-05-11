import React, { useState } from 'react';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatArea } from '@/components/chat/ChatArea';
import { Conversation } from '@/types/chat';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Send, 
  Search, 
  User, 
  Home, 
  Plus,
  X,
  Archive
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Mock data - substituir por dados reais da API
const mockConversations: Conversation[] = [
  {
    id: '1',
    with: {
      id: '101',
      name: 'João Silva',
      avatar: '/avatars/joao.jpg',
    },
    property: {
      id: '201',
      title: 'Apartamento Centro',
    },
    lastMessage: 'Olá, o imóvel ainda está disponível?',
    lastMessageTime: new Date().toISOString(),
    unread: 2,
    messages: [
      {
        id: '1',
        content: 'Olá, o imóvel ainda está disponível?',
        sender: 'user',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        content: 'Sim, está disponível! Posso ajudar com mais alguma informação?',
        sender: 'contact',
        timestamp: new Date().toISOString(),
      },
    ],
  },
  // Adicionar mais conversas mock aqui
];

export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.with.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (message: string) => {
    if (!activeConversation) return;

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              lastMessage: message,
              lastMessageTime: new Date().toISOString(),
              messages: [...conv.messages, newMessage],
            }
          : conv
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mensagens</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[calc(100vh-8rem)]">
        <ConversationList
          conversations={filteredConversations}
          activeConversation={activeConversation}
          onConversationClick={setActiveConversation}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <div className="md:col-span-8">
          <ChatArea
            conversation={conversations.find((c) => c.id === activeConversation) || null}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
