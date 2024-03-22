import React, { useState } from 'react';
import './Portfolio.css';
import portfolioItems from './portfolioItems.json';

const PortfolioItem = ({ item }) => {
  if (item.type === 'image') {
    return (
      <div className="portfolio-item">
        <img src={item.src} alt={item.alt} />
        <p>{item.description}</p>
      </div>
    );
  } else if (item.type === 'video') {
    return (
      <div className="portfolio-item">
        <iframe
          src={item.src}
          frameBorder="0"
          allowFullScreen
          title={item.alt}
          width="560" 
          height="315"
        ></iframe>
        <p>{item.description}</p>
      </div>
    );
  }
  return null;
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const groupItemsByCategory = (items) => {
    return items.reduce((acc, item) => {
      const { category } = item;
      acc[category] = acc[category] || [];
      acc[category].push(item);
      return acc;
    }, {});
  };

  const groupedPortfolioItems = groupItemsByCategory(portfolioItems);

  return (
    <div id="portfolio" className="portfolio-container">
      <h2>Portfolio</h2>
      {Object.keys(groupedPortfolioItems).map((category) => (
        <div key={category} className="portfolio-category">
          <h3
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
          >
            {category}
          </h3>
          {activeCategory === category && (
            <div className="portfolio-grid">
              {groupedPortfolioItems[category].map((item, index) => (
                <PortfolioItem item={item} key={index} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
