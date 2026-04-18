import { Truck, RotateCcw, ShieldCheck, LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const FEATURES: Feature[] = [
  { icon: Truck, title: 'Fast Delivery', desc: 'Same day in major cities' },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: '30-day no-questions return',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'Bank-level encryption',
  },
];
