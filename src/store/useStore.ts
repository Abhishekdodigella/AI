import { create } from 'zustand';
import { Ticket, Message, User, FAQItem } from '../types';

interface StoreState {
  tickets: Ticket[];
  messages: Message[];
  currentUser: User | null;
  currentView: 'tickets' | 'knowledge-base';
  searchQuery: string;
  isChatOpen: boolean;
  faqItems: FAQItem[];
  
  setTickets: (tickets: Ticket[]) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (ticket: Ticket) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setCurrentUser: (user: User | null) => void;
  setCurrentView: (view: 'tickets' | 'knowledge-base') => void;
  setSearchQuery: (query: string) => void;
  setIsChatOpen: (isOpen: boolean) => void;
  setFaqItems: (items: FAQItem[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  tickets: [],
  messages: [],
  currentUser: null,
  currentView: 'tickets',
  searchQuery: '',
  isChatOpen: false,
  faqItems: [],
  
  setTickets: (tickets) => set({ tickets }),
  addTicket: (ticket) => set((state) => ({ 
    tickets: [...state.tickets, ticket] 
  })),
  updateTicket: (ticket) => set((state) => ({
    tickets: state.tickets.map((t) => t.id === ticket.id ? ticket : t)
  })),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setCurrentUser: (user) => set({ currentUser: user }),
  setCurrentView: (view) => set({ currentView: view }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
  setFaqItems: (items) => set({ faqItems: items }),
}));