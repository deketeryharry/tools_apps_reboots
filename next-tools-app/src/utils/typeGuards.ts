import type {
  NaverSearchSection,
  PowerLinkSection,
  ShoppingSection,
  TravelSection,
  KeywordSection,
  FaqSection,
  WebsiteSection
} from '../types/naver';

export const isPowerLinkSection = (section: NaverSearchSection): section is PowerLinkSection => {
  return section.type === 'powerlink';
};

export const isShoppingSection = (section: NaverSearchSection): section is ShoppingSection => {
  return section.type === 'shopping';
};

export const isTravelSection = (section: NaverSearchSection): section is TravelSection => {
  return section.type === 'travel';
};

export const isKeywordSection = (section: NaverSearchSection): section is KeywordSection => {
  return section.type === 'keyword';
};

export const isFaqSection = (section: NaverSearchSection): section is FaqSection => {
  return section.type === 'faq';
};

export const isWebsiteSection = (section: NaverSearchSection): section is WebsiteSection => {
  return section.type === 'website';
}; 