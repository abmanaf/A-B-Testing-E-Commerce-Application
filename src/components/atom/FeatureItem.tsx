import { LucideIcon } from 'lucide-react';

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const FeatureItem = ({ icon: Icon, title, desc }: FeatureItemProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="mb-2 size-10 text-amber-500" />
      <p className="text-base font-semibold text-zinc-800">{title}</p>
      <p className="mt-1 text-sm text-zinc-400">{desc}</p>
    </div>
  );
};

export default FeatureItem;
