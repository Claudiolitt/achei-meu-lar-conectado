
import { User } from '../types/auth';

// Mock users for demonstration
export const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    password: 'senha123',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    type: 'client',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    verified: true
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    password: 'senha123',
    phone: '(11) 91234-5678',
    cpf: '987.654.321-00',
    type: 'owner',
    photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    verified: true
  }
];
