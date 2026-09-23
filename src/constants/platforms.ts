import type { EcommercePlatform } from '@/types/product';

export const platforms: EcommercePlatform[] = [
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'A',
    baseUrl: 'https://www.amazon.in',
    isActive: true,
    accentColor: '#FF9900',
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    logo: 'F',
    baseUrl: 'https://www.flipkart.com',
    isActive: true,
    accentColor: '#2874F0',
  },
  {
    id: 'myntra',
    name: 'Myntra',
    logo: 'M',
    baseUrl: 'https://www.myntra.com',
    isActive: true,
    accentColor: '#FF3F6C',
  },
];

export function getPlatformById(platformId: string): EcommercePlatform | undefined {
  return platforms.find((platform) => platform.id === platformId);
}

export const POPULAR_SEARCHES = [
  'iPhone 16',
  'Samsung Galaxy',
  'Nike Shoes',
  "Levi's Jeans",
  'MacBook Air',
  'Sony Headphones',
];
