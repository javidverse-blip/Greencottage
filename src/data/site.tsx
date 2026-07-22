import {
  Armchair,
  CalendarDays,
  Car,
  Heart,
  Leaf,
  MapPin,
  Trees,
  type LucideIcon,
} from 'lucide-react';

export const business = {
  name: 'GRACE Cottage',
  category: 'Sober Living',
  owner: 'Diana Booker',
  phoneDisplay: '502-755-6052',
  phoneHref: 'tel:5027556052',
  email: 'info@gracecottagetnllc.com',
  emailHref: 'mailto:info@gracecottagetnllc.com',
  location: 'Decaturville, Tennessee',
  url: 'https://greencottage-five.vercel.app/',
};

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Apply', href: '#apply' },
  { label: 'Contact', href: '#contact' },
];

export type ServiceCard = {
  title: string;
  Icon: LucideIcon;
  background: string;
};

export const serviceCards: ServiceCard[] = [
  { title: 'Healthy Plant-Based Cuisine', Icon: Leaf, background: `${import.meta.env.BASE_URL}images/dining/dining-table.png` },
  { title: 'Transportation to Medical Appointments', Icon: Car, background: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80' },
  { title: 'Scheduled Outings', Icon: CalendarDays, background: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=900&q=80' },
  { title: 'Quiet Country Setting', Icon: Trees, background: `${import.meta.env.BASE_URL}images/exterior/side-view.png` },
  { title: 'Cozy Newly Renovated Living Spaces', Icon: Armchair, background: `${import.meta.env.BASE_URL}images/living/big-space.png` },
  { title: 'Nearby Parks & Recreation', Icon: MapPin, background: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?auto=format&fit=crop&w=900&q=80' },
];

const imagePath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const galleryItems = [
  {
    src: imagePath('images/exterior/front-view-1.png'),
    alt: 'Grace Cottage exterior view in a quiet residential setting',
    label: 'Elegant Cottage Exterior',
    featured: true,
  },
  {
    src: imagePath('images/bedrooms/bed-1.png'),
    alt: 'Comfortable Grace Cottage bedroom retreat',
    label: 'Comfortable bedroom retreat',
  },
  {
    src: imagePath('images/dining/dining-table.png'),
    alt: 'Inviting Grace Cottage dining room with a set table',
    label: 'Inviting dining room',
  },
  {
    src: imagePath('images/bathroom/bath-tab.png'),
    alt: 'Grace Cottage bathroom with a clean residential finish',
    label: 'Spa-like bathroom',
  },
];

export const galleryCategories = [
  {
    id: 'exterior',
    title: 'Elegant Cottage Exterior',
    summary: galleryItems[0],
    images: [
      {
        src: imagePath('images/exterior/front-view-2.png'),
        alt: 'Front exterior view of Grace Cottage',
        label: 'Front cottage view',
      },
      {
        src: imagePath('images/exterior/side-view.png'),
        alt: 'Side exterior view of the newly renovated Grace Cottage residence',
        label: 'Side cottage view',
      },
      {
        src: imagePath('images/exterior/back-view.png'),
        alt: 'Back exterior view of Grace Cottage',
        label: 'Back cottage view',
      },
    ],
  },
  {
    id: 'bedrooms',
    title: 'Comfortable Bedrooms',
    summary: galleryItems[1],
    images: [
      { src: imagePath('images/bedrooms/bed-2.png'), alt: 'Grace Cottage bedroom with coordinated bedding', label: 'Bedroom detail' },
      { src: imagePath('images/bedrooms/bed-3.png'), alt: 'Grace Cottage bedroom with a cozy residential finish', label: 'Bedroom retreat' },
      { src: imagePath('images/bedrooms/bed-4.png'), alt: 'Grace Cottage bedroom prepared for residents', label: 'Resident bedroom' },
    ],
  },
  {
    id: 'dining',
    title: 'Inviting Dining & Kitchen',
    summary: galleryItems[2],
    images: [
      { src: imagePath('images/dining/chair-s.png'), alt: 'Grace Cottage dining chairs and gathering area', label: 'Dining seating' },
      { src: imagePath('images/dining/kit-chen.png'), alt: 'Grace Cottage kitchen space', label: 'Kitchen' },
      { src: imagePath('images/dining/stove-1.png'), alt: 'Grace Cottage stove and kitchen appliances', label: 'Kitchen appliances' },
    ],
  },
  {
    id: 'bathroom',
    title: 'Spa-like Bathroom',
    summary: galleryItems[3],
    images: [
      { src: imagePath('images/bathroom/dressing-table.png'), alt: 'Grace Cottage bathroom dressing table', label: 'Dressing table' },
      { src: imagePath('images/bathroom/water-sink.png'), alt: 'Grace Cottage bathroom sink', label: 'Sink area' },
      { src: imagePath('images/bathroom/toi-let.png'), alt: 'Grace Cottage bathroom toilet area', label: 'Bathroom essentials' },
    ],
  },
  {
    id: 'living',
    title: 'Cozy Living Spaces',
    summary: {
      src: imagePath('images/living/big-space.png'),
      alt: 'Grace Cottage living room view',
      label: 'Cozy living room',
    },
    images: [
      { src: imagePath('images/living/2-coaches.png'), alt: 'Grace Cottage living room couches', label: 'Comfortable seating' },
      { src: imagePath('images/living/another-view.png'), alt: 'Grace Cottage living room alternate view', label: 'Living room view' },
      { src: imagePath('images/living/cute-window.png'), alt: 'Grace Cottage living room window detail', label: 'Window detail' },
    ],
  },
];

export const HeartIcon = Heart;
