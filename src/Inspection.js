// Inspection.js
import React, { useState } from 'react';
import './Inspections.css'; // Renamed CSS file
import inspectionItems from './inspectionItems.json'; // Renamed data file

const InspectionItem = ({ item }) => {
  // Your logic for rendering each item based on its type
  if (item.type === 'image') {
    return (
      <div className="inspection-item">
        
        <img width={"400"} height={"400"} src={item.src} alt={item.alt} />
        <p>{item.description}</p>
      </div>
    );
  } else if (item.type === 'video') {
    return (
      <div className="inspection-item">
        <iframe src={item.src} frameBorder="0" allowFullScreen title={item.alt} width="560" height="315"></iframe>
        <p>{item.description}</p>
      </div>
    );
  }
  return null;
};

const Inspection = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const groupItemsByCategory = (items) => {
    return items.reduce((acc, item) => {
      const { category } = item;
      acc[category] = acc[category] || [];
      acc[category].push(item);
      return acc;
    }, {});
  };

  const groupedInspectionItems = groupItemsByCategory(inspectionItems);

  return (
    <div id="inspection" className="inspection-container">
      <h2>Inspection</h2>
      {Object.keys(groupedInspectionItems).map((category) => (
        <div key={category} className="inspection-category">
          <h3 className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(activeCategory === category ? null : category)}>
            {category}
          </h3>
          {activeCategory === category && (
            <div className="inspection-grid">
              {groupedInspectionItems[category].map((item, index) => (
                <InspectionItem item={item} key={index} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Inspection;
