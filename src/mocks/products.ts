import { platforms } from '@/constants/platforms';
import type { Product, ProductOffer } from '@/types/product';
import { withDerivedOfferDiscounts } from '@/utils/product.utils';

function img(seed: string): string {
  return `https://picsum.photos/seed/${seed}/800/800`;
}

function offer(input: {
  productId: string;
  platformId: string;
  platformTitle: string;
  price: number | null;
  originalPrice: number | null;
  availability?: ProductOffer['availability'];
  slug: string;
}): ProductOffer {
  const platform = platforms.find((item) => item.id === input.platformId);
  return {
    id: `off_${input.productId}_${input.platformId}`,
    productId: input.productId,
    platformId: input.platformId,
    platformName: platform?.name ?? input.platformId,
    platformTitle: input.platformTitle,
    productUrl: `${platform?.baseUrl ?? 'https://example.com'}/${input.slug}`,
    price: input.price,
    originalPrice: input.originalPrice,
    discountPercentage: 0,
    currency: 'INR',
    availability: input.availability ?? (input.price == null ? 'out_of_stock' : 'in_stock'),
    lastCheckedAt: '2026-09-23T08:00:00.000Z',
  };
}

interface SeedProduct {
  id: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  specs: Array<{ label: string; value: string }>;
  offers: Array<{
    platformId: string;
    title: string;
    price: number | null;
    original: number | null;
    availability?: ProductOffer['availability'];
    slug: string;
  }>;
}

const seed: SeedProduct[] = [
  {
    id: 'prod_iphone_16',
    title: 'Apple iPhone 16 128GB',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'The iPhone 16 brings the A18 chip, a refined Camera Control, and an all-day battery in a 6.1-inch Super Retina display. Compare live prices across Indian stores before you buy.',
    rating: 4.7,
    reviewCount: 4821,
    createdAt: '2026-07-12T00:00:00.000Z',
    specs: [
      { label: 'Storage', value: '128 GB' },
      { label: 'Display', value: '6.1-inch Super Retina XDR' },
      { label: 'Chip', value: 'A18' },
      { label: 'Colour', value: 'Black' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Apple iPhone 16 128GB Black', price: 74999, original: 79999, slug: 'iphone-16-128' },
      { platformId: 'flipkart', title: 'iPhone 16 (Black, 128 GB)', price: 72999, original: 79999, slug: 'iphone-16-black-128' },
      { platformId: 'myntra', title: 'Apple iPhone 16 Black', price: null, original: null, slug: 'apple-iphone-16' },
    ],
  },
  {
    id: 'prod_iphone_16_pro',
    title: 'Apple iPhone 16 Pro 256GB',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Pro camera system, titanium design, and A18 Pro performance for photography and gaming.',
    rating: 4.8,
    reviewCount: 2104,
    createdAt: '2026-07-12T00:00:00.000Z',
    specs: [
      { label: 'Storage', value: '256 GB' },
      { label: 'Display', value: '6.3-inch Super Retina XDR' },
      { label: 'Chip', value: 'A18 Pro' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Apple iPhone 16 Pro 256GB Natural Titanium', price: 129900, original: 139900, slug: 'iphone-16-pro' },
      { platformId: 'flipkart', title: 'iPhone 16 Pro (Natural Titanium, 256 GB)', price: 127490, original: 139900, slug: 'iphone-16-pro-256' },
    ],
  },
  {
    id: 'prod_galaxy_s25',
    title: 'Samsung Galaxy S25 256GB',
    brand: 'Samsung',
    category: 'Electronics',
    description: 'Flagship Android with a bright AMOLED display, refined cameras, and Galaxy AI features.',
    rating: 4.6,
    reviewCount: 3560,
    createdAt: '2026-06-20T00:00:00.000Z',
    specs: [
      { label: 'Storage', value: '256 GB' },
      { label: 'Display', value: '6.2-inch Dynamic AMOLED' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Samsung Galaxy S25 256GB Navy', price: 74999, original: 82999, slug: 'galaxy-s25' },
      { platformId: 'flipkart', title: 'Galaxy S25 (Navy, 256 GB)', price: 73499, original: 82999, slug: 'galaxy-s25-navy' },
    ],
  },
  {
    id: 'prod_oneplus_13',
    title: 'OnePlus 13 256GB',
    brand: 'OnePlus',
    category: 'Electronics',
    description: 'Hasselblad-tuned cameras, fast charging, and a clean OxygenOS experience.',
    rating: 4.5,
    reviewCount: 1988,
    createdAt: '2026-05-02T00:00:00.000Z',
    specs: [
      { label: 'Storage', value: '256 GB' },
      { label: 'Charging', value: '100W SUPERVOOC' },
    ],
    offers: [
      { platformId: 'amazon', title: 'OnePlus 13 256GB Black Eclipse', price: 64999, original: 69999, slug: 'oneplus-13' },
      { platformId: 'flipkart', title: 'OnePlus 13 (Black Eclipse, 256 GB)', price: 63999, original: 69999, slug: 'oneplus-13-black' },
    ],
  },
  {
    id: 'prod_macbook_air_m4',
    title: 'Apple MacBook Air 13-inch M4',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Fanless M4 performance in a thin aluminium chassis, with a Liquid Retina display and MagSafe charging.',
    rating: 4.8,
    reviewCount: 1422,
    createdAt: '2026-04-18T00:00:00.000Z',
    specs: [
      { label: 'Chip', value: 'Apple M4' },
      { label: 'Memory', value: '16 GB' },
      { label: 'Storage', value: '256 GB SSD' },
    ],
    offers: [
      { platformId: 'amazon', title: 'MacBook Air 13 M4 16GB 256GB Midnight', price: 99990, original: 114900, slug: 'mba-m4' },
      { platformId: 'flipkart', title: 'MacBook Air M4 (Midnight, 16GB/256GB)', price: 98990, original: 114900, slug: 'mba-m4-midnight' },
    ],
  },
  {
    id: 'prod_dell_xps',
    title: 'Dell XPS 14 OLED Laptop',
    brand: 'Dell',
    category: 'Electronics',
    description: 'A compact creator laptop with an OLED panel and a carbon-fibre palm rest.',
    rating: 4.4,
    reviewCount: 640,
    createdAt: '2026-03-11T00:00:00.000Z',
    specs: [
      { label: 'Display', value: '14.5-inch OLED' },
      { label: 'Processor', value: 'Intel Core Ultra 7' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Dell XPS 14 OLED Core Ultra 7', price: 164990, original: 184990, slug: 'xps-14' },
      { platformId: 'flipkart', title: 'Dell XPS 14 (OLED, Ultra 7)', price: 169990, original: 184990, slug: 'xps-14-oled' },
    ],
  },
  {
    id: 'prod_sony_xm6',
    title: 'Sony WH-1000XM6 Wireless Headphones',
    brand: 'Sony',
    category: 'Electronics',
    description: 'Industry-leading noise cancellation, 30-hour battery, and refined voice pickup.',
    rating: 4.7,
    reviewCount: 5210,
    createdAt: '2026-05-28T00:00:00.000Z',
    specs: [
      { label: 'Type', value: 'Over-ear wireless' },
      { label: 'ANC', value: 'Yes' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Sony WH-1000XM6 Black', price: 29990, original: 34990, slug: 'sony-xm6' },
      { platformId: 'flipkart', title: 'WH-1000XM6 (Black)', price: 28990, original: 34990, slug: 'wh-1000xm6' },
    ],
  },
  {
    id: 'prod_apple_watch',
    title: 'Apple Watch Series 11 GPS 46mm',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Health sensors, a brighter display, and a faster charging case for everyday fitness tracking.',
    rating: 4.6,
    reviewCount: 3011,
    createdAt: '2026-07-01T00:00:00.000Z',
    specs: [
      { label: 'Size', value: '46mm' },
      { label: 'Connectivity', value: 'GPS' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Apple Watch Series 11 GPS 46mm Midnight', price: 46900, original: 49900, slug: 'watch-s11' },
      { platformId: 'flipkart', title: 'Apple Watch Series 11 (46mm GPS)', price: 45490, original: 49900, slug: 'watch-s11-46' },
    ],
  },
  {
    id: 'prod_galaxy_watch',
    title: 'Samsung Galaxy Watch 7 LTE',
    brand: 'Samsung',
    category: 'Electronics',
    description: 'BioActive sensor, Wear OS, and a rotating bezel alternative with a bright AMOLED face.',
    rating: 4.4,
    reviewCount: 1876,
    createdAt: '2026-04-09T00:00:00.000Z',
    specs: [
      { label: 'Size', value: '44mm' },
      { label: 'OS', value: 'Wear OS' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Galaxy Watch7 LTE 44mm Green', price: 27999, original: 32999, slug: 'watch7' },
      { platformId: 'flipkart', title: 'Galaxy Watch7 (LTE, 44mm)', price: 26999, original: 32999, slug: 'watch7-lte' },
    ],
  },
  {
    id: 'prod_ipad_air',
    title: 'Apple iPad Air 11-inch M3',
    brand: 'Apple',
    category: 'Electronics',
    description: 'A thin tablet with M3 performance, Apple Pencil support, and a Liquid Retina display.',
    rating: 4.7,
    reviewCount: 980,
    createdAt: '2026-03-22T00:00:00.000Z',
    specs: [
      { label: 'Chip', value: 'Apple M3' },
      { label: 'Storage', value: '128 GB' },
    ],
    offers: [
      { platformId: 'amazon', title: 'iPad Air 11 M3 128GB Blue', price: 59900, original: 64900, slug: 'ipad-air-m3' },
      { platformId: 'flipkart', title: 'iPad Air M3 (Blue, 128 GB)', price: 58900, original: 64900, slug: 'ipad-air-blue' },
    ],
  },
  {
    id: 'prod_nike_air_max',
    title: 'Nike Air Max 90',
    brand: 'Nike',
    category: 'Shoes',
    description: 'Visible Air cushioning, durable leather overlays, and a classic runner silhouette.',
    rating: 4.5,
    reviewCount: 2210,
    createdAt: '2026-02-14T00:00:00.000Z',
    specs: [
      { label: 'Colour', value: 'White / Particle Grey' },
      { label: 'Use', value: 'Lifestyle' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Nike Mens Air Max 90 White', price: 8999, original: 11895, slug: 'air-max-90' },
      { platformId: 'flipkart', title: 'Nike Air Max 90 (White)', price: 8499, original: 11895, slug: 'airmax90' },
      { platformId: 'myntra', title: 'Nike Air Max 90 Sneakers', price: 7999, original: 11895, slug: 'nike-air-max-90' },
    ],
  },
  {
    id: 'prod_ultraboost',
    title: 'Adidas Ultraboost 5',
    brand: 'Adidas',
    category: 'Shoes',
    description: 'Energy-returning BOOST foam with a Primeknit-inspired upper for daily runs.',
    rating: 4.6,
    reviewCount: 1740,
    createdAt: '2026-01-30T00:00:00.000Z',
    specs: [
      { label: 'Drop', value: '10 mm' },
      { label: 'Use', value: 'Running' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Adidas Ultraboost 5 Core Black', price: 13999, original: 17999, slug: 'ub5' },
      { platformId: 'myntra', title: 'Adidas Ultraboost 5 Running Shoes', price: 12999, original: 17999, slug: 'ultraboost-5' },
      { platformId: 'flipkart', title: 'Ultraboost 5 (Core Black)', price: 13499, original: 17999, slug: 'ultraboost5' },
    ],
  },
  {
    id: 'prod_puma_rsx',
    title: 'Puma RS-X Efekt Sneakers',
    brand: 'Puma',
    category: 'Shoes',
    description: 'Chunky 2000s running-inspired sneakers with a cushioned midsole.',
    rating: 4.3,
    reviewCount: 890,
    createdAt: '2026-02-02T00:00:00.000Z',
    specs: [
      { label: 'Colour', value: 'White / Blue' },
    ],
    offers: [
      { platformId: 'myntra', title: 'Puma RS-X Efekt White Blue', price: 6499, original: 9999, slug: 'rs-x' },
      { platformId: 'amazon', title: 'Puma Unisex RS-X Efekt', price: 6999, original: 9999, slug: 'puma-rsx' },
      { platformId: 'flipkart', title: 'Puma RS-X Efekt', price: 6799, original: 9999, slug: 'rsx-efekt' },
    ],
  },
  {
    id: 'prod_levis_jeans',
    title: "Levi's 511 Slim Fit Jeans",
    brand: "Levi's",
    category: 'Fashion',
    description: 'A modern slim through hip and thigh with a tapered leg. Stretch denim for all-day comfort.',
    rating: 4.4,
    reviewCount: 6402,
    createdAt: '2025-12-12T00:00:00.000Z',
    specs: [
      { label: 'Fit', value: '511 Slim' },
      { label: 'Wash', value: 'Dark indigo' },
    ],
    offers: [
      { platformId: 'myntra', title: "Levi's Men 511 Slim Fit Jeans", price: 2999, original: 4999, slug: 'levis-511' },
      { platformId: 'amazon', title: "Levi's 511 Slim Men's Jeans", price: 3299, original: 4999, slug: '511-slim' },
      { platformId: 'flipkart', title: "Levi's 511 Slim Fit Mid Rise", price: 3199, original: 4999, slug: '511' },
    ],
  },
  {
    id: 'prod_linen_shirt',
    title: 'Linen Blend Resort Shirt',
    brand: 'H&M',
    category: 'Fashion',
    description: 'A breathable linen-blend shirt with a relaxed camp collar for warm weather.',
    rating: 4.2,
    reviewCount: 430,
    createdAt: '2026-03-01T00:00:00.000Z',
    specs: [
      { label: 'Material', value: 'Linen blend' },
      { label: 'Fit', value: 'Regular' },
    ],
    offers: [
      { platformId: 'myntra', title: 'H&M Linen Blend Resort Shirt', price: 1999, original: 2699, slug: 'linen-resort' },
      { platformId: 'amazon', title: 'H&M Men Linen Blend Shirt', price: 2199, original: 2699, slug: 'hm-linen' },
    ],
  },
  {
    id: 'prod_hoodie',
    title: 'Oversized Fleece Hoodie',
    brand: 'H&M',
    category: 'Fashion',
    description: 'Heavyweight fleece with a dropped shoulder and a roomy hood.',
    rating: 4.3,
    reviewCount: 1511,
    createdAt: '2026-01-08T00:00:00.000Z',
    specs: [
      { label: 'Material', value: 'Cotton fleece' },
    ],
    offers: [
      { platformId: 'myntra', title: 'H&M Oversized Fleece Hoodie', price: 1799, original: 2299, slug: 'hoodie' },
      { platformId: 'flipkart', title: 'H&M Fleece Hoodie', price: 1699, original: 2299, slug: 'hm-hoodie' },
      { platformId: 'amazon', title: 'H&M Men Oversized Hoodie', price: 1899, original: 2299, slug: 'oversized-hoodie' },
    ],
  },
  {
    id: 'prod_fitme',
    title: 'Maybelline Fit Me Matte + Poreless Foundation',
    brand: 'Maybelline',
    category: 'Beauty',
    description: 'Oil-absorbing foundation with a natural matte finish for normal to oily skin.',
    rating: 4.4,
    reviewCount: 12880,
    createdAt: '2025-11-02T00:00:00.000Z',
    specs: [
      { label: 'Shade', value: '220 Natural Beige' },
      { label: 'Volume', value: '30 ml' },
    ],
    offers: [
      { platformId: 'myntra', title: 'Maybelline Fit Me Foundation 220', price: 499, original: 775, slug: 'fit-me' },
      { platformId: 'amazon', title: 'Maybelline New York Fit Me 220', price: 529, original: 775, slug: 'fitme-220' },
      { platformId: 'flipkart', title: 'Fit Me Matte + Poreless 220', price: 479, original: 775, slug: 'fitme' },
    ],
  },
  {
    id: 'prod_lakme_lip',
    title: 'Lakme Absolute Matte Revolution Lipstick',
    brand: 'Lakme',
    category: 'Beauty',
    description: 'High-pigment matte lipstick with a comfortable, non-drying formula.',
    rating: 4.3,
    reviewCount: 2204,
    createdAt: '2025-10-20T00:00:00.000Z',
    specs: [
      { label: 'Finish', value: 'Matte' },
      { label: 'Shade', value: 'Red Affair' },
    ],
    offers: [
      { platformId: 'myntra', title: 'Lakme Absolute Matte Revolution Red Affair', price: 699, original: 850, slug: 'lakme-matte' },
      { platformId: 'amazon', title: 'Lakme Absolute Matte Lipstick', price: 729, original: 850, slug: 'lakme-lip' },
    ],
  },
  {
    id: 'prod_serum',
    title: 'Mamaearth Vitamin C Face Serum',
    brand: 'Mamaearth',
    category: 'Beauty',
    description: 'Vitamin C and turmeric serum for brighter-looking skin, with a lightweight texture.',
    rating: 4.2,
    reviewCount: 5400,
    createdAt: '2025-09-15T00:00:00.000Z',
    specs: [
      { label: 'Volume', value: '30 ml' },
      { label: 'Skin type', value: 'All' },
    ],
    offers: [
      { platformId: 'myntra', title: 'Mamaearth Vitamin C Face Serum 30ml', price: 499, original: 799, slug: 'vitamin-c' },
      { platformId: 'amazon', title: 'Mamaearth Vitamin C Serum', price: 479, original: 799, slug: 'mamaearth-c' },
      { platformId: 'flipkart', title: 'Mamaearth Vit C Serum', price: 469, original: 799, slug: 'vitc-serum' },
    ],
  },
  {
    id: 'prod_dyson',
    title: 'Dyson Airwrap Multi-styler',
    brand: 'Dyson',
    category: 'Beauty',
    description: 'Coanda airflow styles hair with less heat. Includes barrels and brushes for multiple looks.',
    rating: 4.6,
    reviewCount: 980,
    createdAt: '2026-01-19T00:00:00.000Z',
    specs: [
      { label: 'Wattage', value: '1300 W' },
      { label: 'Attachments', value: '6' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Dyson Airwrap Multi-styler Complete', price: 44900, original: 49900, slug: 'airwrap' },
      { platformId: 'myntra', title: 'Dyson Airwrap Complete', price: 43900, original: 49900, slug: 'dyson-airwrap' },
      { platformId: 'flipkart', title: 'Dyson Airwrap Multi-styler', price: 44490, original: 49900, slug: 'airwrap-complete' },
    ],
  },
  {
    id: 'prod_airfryer',
    title: 'Philips Air Fryer 4.1L',
    brand: 'Philips',
    category: 'Home',
    description: 'Rapid Air technology for crisp results with little to no oil. Dishwasher-safe basket.',
    rating: 4.5,
    reviewCount: 8120,
    createdAt: '2025-08-08T00:00:00.000Z',
    specs: [
      { label: 'Capacity', value: '4.1 L' },
      { label: 'Power', value: '1400 W' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Philips HD9252 Air Fryer 4.1L', price: 7999, original: 10995, slug: 'philips-af' },
      { platformId: 'flipkart', title: 'Philips Air Fryer HD9252/90', price: 7499, original: 10995, slug: 'hd9252' },
    ],
  },
  {
    id: 'prod_induction',
    title: 'Prestige Induction Cooktop 2000W',
    brand: 'Prestige',
    category: 'Home',
    description: 'Push-button induction cooktop with Indian menu presets and a crystal glass plate.',
    rating: 4.3,
    reviewCount: 4300,
    createdAt: '2025-07-21T00:00:00.000Z',
    specs: [
      { label: 'Power', value: '2000 W' },
      { label: 'Presets', value: '7' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Prestige PIC 20 Induction Cooktop', price: 2499, original: 3895, slug: 'pic20' },
      { platformId: 'flipkart', title: 'Prestige Induction Cooktop PIC 20', price: 2299, original: 3895, slug: 'prestige-pic' },
    ],
  },
  {
    id: 'prod_lamp',
    title: 'Tripod Floor Lamp with Linen Shade',
    brand: 'Urban Ladder',
    category: 'Home',
    description: 'A warm tripod floor lamp with a linen drum shade, designed for living rooms.',
    rating: 4.1,
    reviewCount: 210,
    createdAt: '2026-02-22T00:00:00.000Z',
    specs: [
      { label: 'Height', value: '150 cm' },
      { label: 'Bulb', value: 'E27, not included' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Urban Ladder Tripod Floor Lamp', price: 4499, original: 6999, slug: 'tripod-lamp' },
      { platformId: 'flipkart', title: 'Tripod Floor Lamp Linen Shade', price: 4299, original: 6999, slug: 'floor-lamp' },
    ],
  },
  {
    id: 'prod_rayban',
    title: 'Ray-Ban Aviator Classic',
    brand: 'Ray-Ban',
    category: 'Accessories',
    description: 'Gold-tone metal aviators with crystal green lenses and adjustable nose pads.',
    rating: 4.7,
    reviewCount: 3900,
    createdAt: '2025-06-11T00:00:00.000Z',
    specs: [
      { label: 'Lens', value: 'G-15 green' },
      { label: 'Size', value: '58 mm' },
    ],
    offers: [
      { platformId: 'myntra', title: 'Ray-Ban Aviator Classic Gold Green', price: 7590, original: 8890, slug: 'rb3025' },
      { platformId: 'amazon', title: 'Ray-Ban RB3025 Aviator', price: 7890, original: 8890, slug: 'aviator' },
      { platformId: 'flipkart', title: 'Ray-Ban Aviator 3025', price: 7690, original: 8890, slug: 'rb-aviator' },
    ],
  },
  {
    id: 'prod_fossil',
    title: 'Fossil Gen 6 Smartwatch',
    brand: 'Fossil',
    category: 'Accessories',
    description: 'Wear OS smartwatch with a stainless steel case and heart-rate tracking.',
    rating: 4.1,
    reviewCount: 760,
    createdAt: '2025-05-04T00:00:00.000Z',
    specs: [
      { label: 'OS', value: 'Wear OS' },
      { label: 'Case', value: '44 mm steel' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Fossil Gen 6 Smartwatch Grey', price: 12995, original: 22995, slug: 'fossil-gen6' },
      { platformId: 'myntra', title: 'Fossil Gen 6 Grey Smartwatch', price: 11995, original: 22995, slug: 'gen6' },
      { platformId: 'flipkart', title: 'Fossil Gen 6', price: 12495, original: 22995, slug: 'fossil-g6' },
    ],
  },
  {
    id: 'prod_jbl',
    title: 'JBL Flip 6 Portable Speaker',
    brand: 'JBL',
    category: 'Electronics',
    description: 'IP67-rated Bluetooth speaker with bold JBL Original Pro Sound.',
    rating: 4.6,
    reviewCount: 9900,
    createdAt: '2025-04-18T00:00:00.000Z',
    specs: [
      { label: 'Battery', value: '12 hours' },
      { label: 'Waterproof', value: 'IP67' },
    ],
    offers: [
      { platformId: 'amazon', title: 'JBL Flip 6 Black', price: 8999, original: 11999, slug: 'flip6' },
      { platformId: 'flipkart', title: 'JBL Flip 6 Portable Speaker', price: 8499, original: 11999, slug: 'jbl-flip-6' },
    ],
  },
  {
    id: 'prod_boat',
    title: 'boAt Airdopes 800',
    brand: 'boAt',
    category: 'Electronics',
    description: 'ANC true wireless earbuds with a compact charging case and fast charge.',
    rating: 4.2,
    reviewCount: 15400,
    createdAt: '2026-04-04T00:00:00.000Z',
    specs: [
      { label: 'ANC', value: 'Up to 30 dB' },
      { label: 'Playback', value: '40 hours' },
    ],
    offers: [
      { platformId: 'amazon', title: 'boAt Airdopes 800 ANC', price: 1999, original: 4990, slug: 'airdopes-800' },
      { platformId: 'flipkart', title: 'boAt Airdopes 800', price: 1899, original: 4990, slug: 'ad800' },
    ],
  },
  {
    id: 'prod_backpack',
    title: 'Wildcraft 45L Travel Backpack',
    brand: 'Wildcraft',
    category: 'Accessories',
    description: 'A durable 45-litre backpack with a laptop sleeve and rain cover.',
    rating: 4.4,
    reviewCount: 2600,
    createdAt: '2025-03-09T00:00:00.000Z',
    specs: [
      { label: 'Capacity', value: '45 L' },
      { label: 'Laptop sleeve', value: 'Up to 16 inch' },
    ],
    offers: [
      { platformId: 'amazon', title: 'Wildcraft 45L Backpack Black', price: 2499, original: 3999, slug: 'wc-45' },
      { platformId: 'flipkart', title: 'Wildcraft 45 L Travel Backpack', price: 2299, original: 3999, slug: 'wildcraft-45' },
      { platformId: 'myntra', title: 'Wildcraft Unisex 45L Backpack', price: 2399, original: 3999, slug: 'wildcraft-bag' },
    ],
  },
];

export const seedProducts: Product[] = seed.map((item) => {
  const imageUrl = img(item.id);
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    brand: item.brand,
    category: item.category,
    imageUrl,
    gallery: [imageUrl, img(`${item.id}-2`), img(`${item.id}-3`)],
    rating: item.rating,
    reviewCount: item.reviewCount,
    specifications: item.specs,
    createdAt: item.createdAt,
    updatedAt: '2026-09-23T08:00:00.000Z',
    offers: withDerivedOfferDiscounts(
      item.offers.map((entry) =>
        offer({
          productId: item.id,
          platformId: entry.platformId,
          platformTitle: entry.title,
          price: entry.price,
          originalPrice: entry.original,
          availability: entry.availability,
          slug: entry.slug,
        }),
      ),
    ),
  };
});
