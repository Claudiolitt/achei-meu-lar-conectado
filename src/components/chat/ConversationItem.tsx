import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Conversation } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
  const { with: contact, lastMessage, lastMessageTime, unread } = conversation;

  return (
    <div
      className={`p-3 border-b cursor-pointer hover:bg-accent transition-colors ${
        isActive ? 'bg-accent' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium truncate">{contact.name}</h4>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(lastMessageTime), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
        </div>
        {unread > 0 && (
          <Badge variant="secondary" className="ml-2">
            {unread}
          </Badge>
        )}
      </div>
    </div>
  );
}; 