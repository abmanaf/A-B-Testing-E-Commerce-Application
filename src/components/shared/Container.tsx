import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
}

const Container = ({
  children,
  className,
  innerClassName,
  id,
}: SectionProps) => {
  return (
    <section id={id} className={cn('px-6 py-20', className)}>
      <div className={cn('mx-auto max-w-6xl', innerClassName)}>{children}</div>
    </section>
  );
};

export default Container;
