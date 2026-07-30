export type CategoryKey = 'travel' | 'nature' | 'life' | 'campus';

export interface GalleryImage {
  src: string;
  category: CategoryKey;
}

export const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/trip1.jpg', category: 'travel' },
  { src: '/images/gallery/trip2.jpg', category: 'travel' },
  { src: '/images/gallery/trip3.jpg', category: 'travel' },
  { src: '/images/gallery/school1.png', category: 'campus' },
  { src: '/images/gallery/school2.jpg', category: 'campus' },
  { src: '/images/gallery/school3.jpg', category: 'campus' },
];

export const categoryLabels: Record<CategoryKey, { en: string; zh: string }> = {
  travel: { en: 'Travel', zh: '旅行' },
  nature: { en: 'Nature', zh: '自然' },
  life: { en: 'Life', zh: '生活' },
  campus: { en: 'Campus', zh: '校园' },
};
