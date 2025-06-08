import { JSDOM } from 'jsdom';
import type {
  NaverSearchResult,
  NaverSearchSection,
  PowerLinkSection,
  ShoppingSection,
  TravelSection,
  KeywordSection,
  FaqSection,
  WebsiteSection,
  ImageSection,
  KnowledgeSection,
  VideoSection,
  NewsSection,
  BlogSection,
  CafeSection
} from '../types/naver';

export class NaverParser {
  private dom: JSDOM;

  constructor(html: string) {
    this.dom = new JSDOM(html);
  }

  private getElement(selector: string): Element | null {
    return this.dom.window.document.querySelector(selector);
  }

  private getElements(selector: string): Element[] {
    return Array.from(this.dom.window.document.querySelectorAll(selector));
  }

  private parsePowerLink(): PowerLinkSection | null {
    const section = this.getElement('#pcPowerLink_c001-mirl');
    if (!section) return null;

    const ads = this.getElements('.pcPowerLink_c001 .ad_item').map(item => ({
      title: item.querySelector('.ad_title')?.textContent?.trim() || '',
      description: item.querySelector('.ad_desc')?.textContent?.trim() || '',
      link: item.querySelector('a')?.href || ''
    }));

    return {
      id: 'pcPowerLink_c001-mirl',
      type: 'powerlink',
      title: '파워링크',
      ads
    };
  }

  private parseShopping(): ShoppingSection | null {
    const section = this.getElement('#shp_gui_root');
    if (!section) return null;

    const products = this.getElements('.shp_gui_item').map(item => ({
      title: item.querySelector('.shp_gui_title')?.textContent?.trim() || '',
      price: item.querySelector('.shp_gui_price')?.textContent?.trim() || '',
      image: item.querySelector('img')?.src || '',
      link: item.querySelector('a')?.href || ''
    }));

    return {
      id: 'shp_gui_root',
      type: 'shopping',
      title: '네이버 가격비교',
      products
    };
  }

  private parseTravel(): TravelSection | null {
    const section = this.getElement('[data-block-id="travel/prs_template_fender_travel_flicking_desk.ts"]');
    if (!section) return null;

    const products = this.getElements('.fds-travel-block .item').map(item => ({
      title: item.querySelector('.fds-title-basic')?.textContent?.trim() || '',
      price: item.querySelector('.fds-price')?.textContent?.trim() || '',
      image: item.querySelector('img')?.src || '',
      link: item.querySelector('a')?.href || ''
    }));

    return {
      id: section.id,
      type: 'travel',
      title: '내 또래가 주목한 네이버 여행상품',
      products
    };
  }

  private parseKeywords(): KeywordSection | null {
    const section = this.getElement('[data-block-id="keyword/prs_template_keyword_unite_recommend_b_desk.ts"]');
    if (!section) return null;

    const keywords = this.getElements('.keyword_item').map(item => 
      item.textContent?.trim() || ''
    );

    return {
      id: section.id,
      type: 'keyword',
      title: '함께 많이 찾는',
      keywords
    };
  }

  private parseFaq(): FaqSection | null {
    const section = this.getElement('.sp_intent_faq');
    if (!section) return null;

    const questions = this.getElements('.faq_item').map(item => ({
      question: item.querySelector('.faq_question')?.textContent?.trim() || '',
      answer: item.querySelector('.faq_answer')?.textContent?.trim() || ''
    }));

    return {
      id: 'faq_section',
      type: 'faq',
      title: '여행 FAQ',
      questions
    };
  }

  private parseWebsites(): WebsiteSection | null {
    const section = this.getElement('.sp_ntotal');
    if (!section) return null;

    const sites = this.getElements('.total_wrap').map(item => ({
      title: item.querySelector('.total_tit')?.textContent?.trim() || '',
      description: item.querySelector('.total_dsc')?.textContent?.trim() || '',
      url: item.querySelector('a')?.href || '',
      favicon: item.querySelector('img')?.src || ''
    }));

    return {
      id: 'web_section',
      type: 'website',
      title: '웹사이트',
      sites
    };
  }

  public parse(): NaverSearchResult {
    const sections: NaverSearchSection[] = [];

    // 각 섹션 파싱
    const powerLink = this.parsePowerLink();
    if (powerLink) sections.push(powerLink);

    const shopping = this.parseShopping();
    if (shopping) sections.push(shopping);

    const travel = this.parseTravel();
    if (travel) sections.push(travel);

    const keywords = this.parseKeywords();
    if (keywords) sections.push(keywords);

    const faq = this.parseFaq();
    if (faq) sections.push(faq);

    const websites = this.parseWebsites();
    if (websites) sections.push(websites);

    return {
      sections,
      totalCount: sections.length
    };
  }
} 