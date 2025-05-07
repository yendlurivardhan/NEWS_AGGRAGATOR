import React from 'react';
import '../styles/categories.css'
import {
  NewspaperIcon, Briefcase, MonitorSmartphone, FlaskConical,
  Heart, Trophy, Clapperboard
} from 'lucide-react';

const iconMap = {
  General: <NewspaperIcon size={16} />,
  Business: <Briefcase size={16} />,
  Technology: <MonitorSmartphone size={16} />,
  Science: <FlaskConical size={16} />,
  Health: <Heart size={16} />,
  Sports: <Trophy size={16} />,
  Entertainment: <Clapperboard size={16} />,
};
<br></br>
function Categories({ onCategoryClick, selectedCategory }) {
  const categories = Object.keys(iconMap);

  return (
    <div className="categories">

      {categories.map((category, index) => (
        <button
          key={index}
          className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryClick(category)}
        >
          {iconMap[category]}
          <span style={{ marginLeft: '6px' }}>{category}</span>
        </button>
      ))}
    </div>
  );
}

export default Categories;