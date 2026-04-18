import { Heart, Shield, Zap, Leaf, Users, Star } from 'lucide-react';
import Container from '@/components/shared/Container';
import SectionHeader from '@/components/shared/SectionHeader';
import ValueCard from '@/components/atom/ValueCard';

const VALUES = [
  {
    icon: Heart,
    title: 'Customer First',
    desc: 'Every decision we make starts with one question is this good for our customers?',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    desc: 'No hidden fees, no dark patterns. We say what we mean and mean what we say.',
  },
  {
    icon: Zap,
    title: 'Speed & Reliability',
    desc: 'Fast shipping, real-time tracking, and a team ready to help when things go wrong.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    desc: 'We partner with suppliers who share our commitment to reducing environmental impact.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'Our customers shape what we stock. Reviews, feedback and ratings drive every decision.',
  },
  {
    icon: Star,
    title: 'Uncompromising Quality',
    desc: 'Every product is reviewed before it goes live. No shortcuts. No compromises.',
  },
];

const AboutValues = () => {
  return (
    <Container className="bg-zinc-50">
      <SectionHeader eyebrow="What we stand for" title="Our Core Values" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map((value) => (
          <ValueCard
            key={value.title}
            icon={value.icon}
            title={value.title}
            desc={value.desc}
          />
        ))}
      </div>
    </Container>
  );
};

export default AboutValues;
