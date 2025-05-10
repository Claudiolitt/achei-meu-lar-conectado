
import React, { useState } from 'react';
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

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface Conversation {
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

const Chat: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      with: {
        id: 'user1',
        name: 'João Silva',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      property: {
        id: 'prop1',
        title: 'Apartamento em Pinheiros',
      },
      lastMessage: 'O imóvel ainda está disponível?',
      lastMessageTime: '10:30',
      unread: 2,
      messages: [
        {
          id: 'm1',
          content: 'Olá, tenho interesse no seu apartamento em Pinheiros.',
          sender: 'other',
          timestamp: '10:25',
        },
        {
          id: 'm2',
          content: 'O imóvel ainda está disponível?',
          sender: 'other',
          timestamp: '10:30',
        },
      ],
    },
    {
      id: '2',
      with: {
        id: 'user2',
        name: 'Maria Oliveira',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      property: {
        id: 'prop2',
        title: 'Casa em Moema',
      },
      lastMessage: 'Podemos agendar uma visita para amanhã?',
      lastMessageTime: 'Ontem',
      unread: 0,
      messages: [
        {
          id: 'm3',
          content: 'Olá, gostaria de saber mais sobre a casa em Moema.',
          sender: 'other',
          timestamp: 'Ontem, 14:20',
        },
        {
          id: 'm4',
          content: 'Sim, está disponível para visitas. Qual horário prefere?',
          sender: 'user',
          timestamp: 'Ontem, 15:05',
        },
        {
          id: 'm5',
          content: 'Podemos agendar uma visita para amanhã?',
          sender: 'other',
          timestamp: 'Ontem, 15:30',
        },
      ],
    },
    {
      id: '3',
      with: {
        id: 'user3',
        name: 'Pedro Santos',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      property: {
        id: 'prop3',
        title: 'Studio no Centro',
      },
      lastMessage: 'Obrigado pelas informações!',
      lastMessageTime: '22/04',
      unread: 0,
      messages: [
        {
          id: 'm6',
          content: 'Qual o valor do condomínio do studio no Centro?',
          sender: 'other',
          timestamp: '22/04, 09:15',
        },
        {
          id: 'm7',
          content: 'O valor é de R$ 450,00 e inclui água.',
          sender: 'user',
          timestamp: '22/04, 10:20',
        },
        {
          id: 'm8',
          content: 'Obrigado pelas informações!',
          sender: 'other',
          timestamp: '22/04, 10:25',
        },
      ],
    },
  ]);
  
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedConversation = conversations.find(conv => conv.id === activeConversation);
  
  const filteredConversations = searchQuery 
    ? conversations.filter(conv => 
        conv.with.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.property.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;
  
  const sendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return;
    
    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      content: messageInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setConversations(conversations.map(conv => 
      conv.id === activeConversation 
        ? { 
            ...conv, 
            messages: [...conv.messages, newMessage],
            lastMessage: messageInput,
            lastMessageTime: 'Agora',
          } 
        : conv
    ));
    
    setMessageInput('');
  };
  
  const markConversationAsRead = (conversationId: string) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unread: 0 } 
        : conv
    ));
  };
  
  const deleteConversation = (conversationId: string) => {
    setConversations(conversations.filter(conv => conv.id !== conversationId));
    if (activeConversation === conversationId) {
      setActiveConversation(null);
    }
  };
  
  const archiveConversation = (conversationId: string) => {
    // In a real app, you would move the conversation to an archived list
    // For this demo, we'll just simulate it by removing from the list
    deleteConversation(conversationId);
  };
  
  const handleConversationClick = (conversationId: string) => {
    setActiveConversation(conversationId);
    markConversationAsRead(conversationId);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Mensagens
            </h1>
          </div>
          
          <Tabs defaultValue="inbox" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="inbox">Caixa de Entrada</TabsTrigger>
              <TabsTrigger value="archived">Arquivadas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inbox">
              <div className="border rounded-lg overflow-hidden grid md:grid-cols-12">
                {/* Conversation list */}
                <div className="md:col-span-4 border-r">
                  <div className="p-3 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar conversas..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <ScrollArea className="h-[60vh]">
                    {filteredConversations.length === 0 ? (
                      <div className="p-4 text-center">
                        <p className="text-muted-foreground">Nenhuma conversa encontrada</p>
                      </div>
                    ) : (
                      filteredConversations.map((conversation) => (
                        <div 
                          key={conversation.id} 
                          className={`border-b p-3 cursor-pointer hover:bg-muted transition-colors ${
                            conversation.id === activeConversation ? 'bg-muted' : ''
                          }`}
                          onClick={() => handleConversationClick(conversation.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                              <Avatar>
                                <AvatarImage src={conversation.with.avatar} alt={conversation.with.name} />
                                <AvatarFallback>{conversation.with.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              
                              <div className="overflow-hidden">
                                <div className="font-medium truncate">{conversation.with.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                                  <Home className="h-3 w-3" />
                                  <span className="truncate">{conversation.property.title}</span>
                                </div>
                                <p className={`text-sm truncate ${conversation.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                                  {conversation.lastMessage}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <span className="text-xs text-muted-foreground mb-1">
                                {conversation.lastMessageTime}
                              </span>
                              {conversation.unread > 0 && (
                                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {conversation.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </ScrollArea>
                </div>
                
                {/* Chat area */}
                <div className="md:col-span-8">
                  {!activeConversation ? (
                    <div className="h-[60vh] flex items-center justify-center">
                      <div className="text-center p-4">
                        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium mb-2">Nenhuma conversa selecionada</h3>
                        <p className="text-sm text-muted-foreground">
                          Selecione uma conversa à esquerda para começar a conversar
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-3 border-b flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage 
                              src={selectedConversation?.with.avatar} 
                              alt={selectedConversation?.with.name} 
                            />
                            <AvatarFallback>{selectedConversation?.with.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{selectedConversation?.with.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Home className="h-3 w-3" />
                              {selectedConversation?.property.title}
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => archiveConversation(activeConversation)}>
                              <Archive className="mr-2 h-4 w-4" />
                              Arquivar conversa
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteConversation(activeConversation)}>
                              <X className="mr-2 h-4 w-4" />
                              Excluir conversa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <ScrollArea className="h-[50vh] p-4">
                        <div className="space-y-4">
                          {selectedConversation?.messages.map((message) => (
                            <div 
                              key={message.id}
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.sender === 'user' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-muted'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <div className={`text-xs mt-1 ${
                                  message.sender === 'user' 
                                    ? 'text-primary-foreground/70' 
                                    : 'text-muted-foreground'
                                }`}>
                                  {message.timestamp}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      
                      <div className="p-3 border-t">
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                          }}
                          className="flex items-center gap-2"
                        >
                          <Input
                            placeholder="Digite sua mensagem..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                          />
                          <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="archived">
              <div className="text-center py-12">
                <Archive className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma conversa arquivada</h3>
                <p className="text-muted-foreground">
                  As conversas arquivadas aparecerão aqui
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
