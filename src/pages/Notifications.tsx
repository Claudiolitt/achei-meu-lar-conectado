
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Home, 
  MessageCircle, 
  Settings,
  Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Notification {
  id: string;
  type: 'property' | 'message' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'property',
      title: 'Novo imóvel disponível',
      message: 'Um novo apartamento em São Paulo que combina com seus interesses foi cadastrado.',
      date: '10 de maio, 2025',
      read: false
    },
    {
      id: '2',
      type: 'message',
      title: 'Nova mensagem',
      message: 'João Silva respondeu sobre o apartamento em Pinheiros.',
      date: '9 de maio, 2025',
      read: false
    },
    {
      id: '3',
      type: 'system',
      title: 'Atualização da plataforma',
      message: 'Confira as novas funcionalidades da plataforma, incluindo calculadora de financiamento.',
      date: '8 de maio, 2025',
      read: true
    },
    {
      id: '4',
      type: 'property',
      title: 'Redução de preço',
      message: 'Um imóvel em sua lista de favoritos teve o preço reduzido.',
      date: '7 de maio, 2025',
      read: true
    },
    {
      id: '5',
      type: 'message',
      title: 'Nova mensagem',
      message: 'Maria Oliveira está interessada no seu imóvel.',
      date: '6 de maio, 2025',
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const getFilteredNotifications = (type?: 'property' | 'message' | 'system') => {
    return type 
      ? notifications.filter(notification => notification.type === type)
      : notifications;
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Notificações
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">{unreadCount} não lidas</Badge>
              )}
            </h1>
            
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="mr-2 h-4 w-4" />
                Marcar todas como lidas
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="property">Imóveis</TabsTrigger>
              <TabsTrigger value="message">Mensagens</TabsTrigger>
              <TabsTrigger value="system">Sistema</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <NotificationList 
                notifications={getFilteredNotifications()} 
                onMarkAsRead={markAsRead} 
              />
            </TabsContent>
            
            <TabsContent value="property">
              <NotificationList 
                notifications={getFilteredNotifications('property')} 
                onMarkAsRead={markAsRead} 
              />
            </TabsContent>
            
            <TabsContent value="message">
              <NotificationList 
                notifications={getFilteredNotifications('message')} 
                onMarkAsRead={markAsRead} 
              />
            </TabsContent>
            
            <TabsContent value="system">
              <NotificationList 
                notifications={getFilteredNotifications('system')} 
                onMarkAsRead={markAsRead} 
              />
            </TabsContent>
          </Tabs>
          
          <div className="bg-muted p-4 rounded-lg text-center">
            <h3 className="font-medium mb-2">Configurações de notificação</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Personalize quais tipos de notificações você deseja receber
            </p>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Gerenciar configurações
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationList = ({ notifications, onMarkAsRead }: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma notificação encontrada</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {notifications.map(notification => (
        <Card 
          key={notification.id}
          className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${!notification.read ? 'border-l-4 border-primary' : ''}`}
          onClick={() => !notification.read && onMarkAsRead(notification.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {notification.type === 'property' && <Home className="h-5 w-5 text-blue-500 mt-1" />}
              {notification.type === 'message' && <MessageCircle className="h-5 w-5 text-green-500 mt-1" />}
              {notification.type === 'system' && <Bell className="h-5 w-5 text-amber-500 mt-1" />}
              
              <div>
                <h3 className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
                  {notification.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">{notification.date}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Notifications;
