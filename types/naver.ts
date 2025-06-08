export interface NaverSearchSection {
  id: string;
  type: string;
  title: string;
}

export interface NaverSearchResult {
  sections: NaverSearchSection[];
  totalCount: number;
}

export interface PowerLinkSection extends NaverSearchSection {
  type: 'powerlink';
  ads: Array<{
    title: string;
    description: string;
    link: string;
  }>;
}

export interface ShoppingSection extends NaverSearchSection {
  type: 'shopping';
  products: Array<{
    title: string;
    price: string;
    image: string;
    link: string;
  }>;
}

export interface TravelSection extends NaverSearchSection {
  type: 'travel';
  products: Array<{
    title: string;
    price: string;
    image: string;
    link: string;
  }>;
}

export interface KeywordSection extends NaverSearchSection {
  type: 'keyword';
  keywords: string[];
}

export interface FaqSection extends NaverSearchSection {
  type: 'faq';
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export interface WebsiteSection extends NaverSearchSection {
  type: 'website';
  sites: Array<{
    title: string;
    description: string;
    url: string;
    favicon: string;
  }>;
}

export interface ImageSection extends NaverSearchSection {
  type: 'image';
  images: Array<{
    title: string;
    url: string;
    thumbnail: string;
  }>;
}

export interface KnowledgeSection extends NaverSearchSection {
  type: 'knowledge';
  questions: Array<{
    title: string;
    answer: string;
    url: string;
  }>;
}

export interface VideoSection extends NaverSearchSection {
  type: 'video';
  videos: Array<{
    title: string;
    thumbnail: string;
    duration: string;
    url: string;
  }>;
}

export interface NewsSection extends NaverSearchSection {
  type: 'news';
  articles: Array<{
    title: string;
    press: string;
    date: string;
    url: string;
  }>;
}

export interface BlogSection extends NaverSearchSection {
  type: 'blog';
  posts: Array<{
    title: string;
    description: string;
    blogger: string;
    date: string;
    url: string;
  }>;
}

export interface CafeSection extends NaverSearchSection {
  type: 'cafe';
  posts: Array<{
    title: string;
    description: string;
    cafe: string;
    date: string;
    url: string;
  }>;
} 