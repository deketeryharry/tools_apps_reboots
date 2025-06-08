import React from 'react';
import type { NaverSearchResult, NaverSearchSection } from '../types/naver';
import {
  isPowerLinkSection,
  isShoppingSection,
  isTravelSection,
  isKeywordSection,
  isFaqSection,
  isWebsiteSection
} from '../utils/typeGuards';

interface Props {
  result: NaverSearchResult;
}

const NaverSearchResult: React.FC<Props> = ({ result }) => {
  const renderSection = (section: NaverSearchSection) => {
    if (isPowerLinkSection(section)) {
      return (
        <div key={section.id} className="section powerlink">
          <h2>{section.title}</h2>
          <div className="ads">
            {section.ads.map((ad, index) => (
              <div key={index} className="ad-item">
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <a href={ad.link} target="_blank" rel="noopener noreferrer">바로가기</a>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isShoppingSection(section)) {
      return (
        <div key={section.id} className="section shopping">
          <h2>{section.title}</h2>
          <div className="products">
            {section.products.map((product, index) => (
              <div key={index} className="product-item">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p className="price">{product.price}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer">상품 보기</a>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isTravelSection(section)) {
      return (
        <div key={section.id} className="section travel">
          <h2>{section.title}</h2>
          <div className="products">
            {section.products.map((product, index) => (
              <div key={index} className="product-item">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p className="price">{product.price}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer">상품 보기</a>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isKeywordSection(section)) {
      return (
        <div key={section.id} className="section keyword">
          <h2>{section.title}</h2>
          <div className="keywords">
            {section.keywords.map((keyword, index) => (
              <span key={index} className="keyword-tag">{keyword}</span>
            ))}
          </div>
        </div>
      );
    }

    if (isFaqSection(section)) {
      return (
        <div key={section.id} className="section faq">
          <h2>{section.title}</h2>
          <div className="questions">
            {section.questions.map((item, index) => (
              <div key={index} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isWebsiteSection(section)) {
      return (
        <div key={section.id} className="section website">
          <h2>{section.title}</h2>
          <div className="sites">
            {section.sites.map((site, index) => (
              <div key={index} className="site-item">
                <img src={site.favicon} alt="" className="favicon" />
                <div className="site-info">
                  <h3>{site.title}</h3>
                  <p>{site.description}</p>
                  <a href={site.url} target="_blank" rel="noopener noreferrer">바로가기</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="naver-search-result">
      <div className="total-count">총 {result.totalCount}개의 섹션</div>
      {result.sections.map(renderSection)}
    </div>
  );
};

export default NaverSearchResult; 