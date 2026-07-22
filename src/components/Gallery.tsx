import { useState } from 'react';
import { galleryCategories } from '../data/site';

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState(galleryCategories[0].id);
  const selectedCategory = galleryCategories.find((category) => category.id === activeCategory) ?? galleryCategories[0];
  const selectedImages = [selectedCategory.summary, ...selectedCategory.images];

  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="gallery-heading">
      <div className="section-intro page-pad" data-reveal>
        <p className="eyebrow">Gallery</p>
        <h2 id="gallery-heading">Experience the comforting atmosphere and refined cottage charm.</h2>
      </div>

      <div className="gallery-categories page-pad" aria-label="Gallery categories">
        {galleryCategories.map((category) => (
          <button
            className={`gallery-category-card ${category.id === selectedCategory.id ? 'gallery-category-card--active' : ''}`}
            type="button"
            key={category.id}
            aria-pressed={category.id === selectedCategory.id}
            onClick={() => setActiveCategory(category.id)}
          >
            <span>{category.title}</span>
            <img src={category.summary.src} alt={category.summary.alt} loading={category.id === 'exterior' ? 'eager' : 'lazy'} />
          </button>
        ))}
      </div>

      <div className="gallery-detail page-pad" data-reveal>
        <div className="gallery-detail-heading">
          <p className="eyebrow eyebrow-gold">Explore this space</p>
          <h3>{selectedCategory.title}</h3>
        </div>

        <div className="gallery-photo-grid" aria-label={`${selectedCategory.title} images`}>
          {selectedImages.map((image) => (
            <figure className="gallery-photo-card" key={image.src}>
              <img src={image.src} alt={image.alt} loading={image.src === selectedCategory.summary.src ? 'eager' : 'lazy'} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
