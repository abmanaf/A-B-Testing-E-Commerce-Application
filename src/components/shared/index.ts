import { ROUTES } from '@/config/routes';
import { Mail } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const NAV_ITEMS = [
  { name: 'Home', href: ROUTES.HOME },
  { name: 'About', href: ROUTES.ABOUT },
  { name: 'Products', href: ROUTES.PRODUCTS },
  { name: 'Contact', href: ROUTES.CONTACT },
];

export const FOOTER_LINKS = {
  Shop: [
    { name: 'All Products', href: ROUTES.PRODUCTS },
    { name: 'New Arrivals', href: ROUTES.PRODUCTS },
    { name: 'Best Sellers', href: ROUTES.PRODUCTS },
    { name: 'Deals', href: ROUTES.PRODUCTS },
  ],
  Company: [
    { name: 'About Us', href: ROUTES.ABOUT },
    { name: 'Contact', href: ROUTES.CONTACT },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  Support: [
    { name: 'Help Center', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Track Order', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
};

export const SOCIALS = [
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];
