import product1 from '../assets/products/product-1.png';
import product2 from '../assets/products/product-2.png';
import product3 from '../assets/products/product-3.png';
import product4 from '../assets/products/product-4.png';


import { necklacesData } from './necklaces';

export const featuredProducts = [
  {
    id: 1,
    name: 'Heart Pendant Necklace',
    price: 499,
    oldPrice: 999,
    image: product1,
    category: 'Necklaces',
    tag: 'Bestseller',
  },
  {
    id: 2,
    name: 'Crystal Hoop Earrings',
    price: 399,
    oldPrice: 799,
    image: product2,
    category: 'Earrings',
    tag: 'Trending',
  },
  {
    id: 3,
    name: 'Floral Bracelet',
    price: 599,
    oldPrice: 1199,
    image: product3,
    category: 'Bracelets',
    tag: 'Anti-Tarnish',
  },
  {
    id: 4,
    name: 'Elegant Ring',
    price: 449,
    oldPrice: 899,
    image: product4,
    category: 'Rings',
    tag: 'Popular',
  },
];

export const allProducts = [
  ...featuredProducts,
  ...necklacesData,
];

