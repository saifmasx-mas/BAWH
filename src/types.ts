// ==========================================
// تعريف الأنواع والبيانات المشتركة لمدونة بوح
// ==========================================

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  badge: string;
  quote: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryId: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
  imageCaption: string;
  excerpt: string;
  content: string[];
  featuredPoem?: {
    verses: { shatr1: string; shatr2: string }[];
    poet: string;
    bahr: string;
  };
  tags: string[];
}

export interface PoeticMeter {
  name: string;
  key: string;
  pattern: string; // التفاعيل
  keyVerse: string; // مفتاح البحر
  exampleVerse: {
    first: string;
    second: string;
    poet: string;
  };
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
}
