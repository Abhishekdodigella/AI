export interface Ticket {
  id: string;
  userId: string;
  orderId?: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface Message {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  type: 'user' | 'agent' | 'system';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'customer' | 'agent' | 'admin';
  name: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}