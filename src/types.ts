// Shared TypeScript types for MYITDEV.COM

export interface BlogPost {
  id: string;
  title: string;
  title_en: string;
  excerpt: string;
  content_th: string;
  content_en: string;
  date: string;
  time: string;
  image: string;
  category: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  source: string;
  status: 'new' | 'done';
  notes?: string;
}

export interface LineUser {
  user_id: string;
  display_name: string;
  picture_url: string;
  tags: string;
  ai_enabled: 0 | 1;
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export interface RichMenu {
  richMenuId: string;
  name: string;
  chatBarText: string;
}

export interface BotLog {
  id: number;
  bot_name: string;
  user_agent: string;
  path: string;
  ip_address: string;
  created_at: string;
}

export interface AdminData {
  leads: Lead[];
  users: LineUser[];
  bot_logs?: BotLog[];
  stats?: {
    aiMessagesToday: number;
  };
}

export interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

export type Language = 'th' | 'en';
export type Theme = 'dark' | 'light';
