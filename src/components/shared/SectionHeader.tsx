'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  centered?: boolean;
  showViewAll?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  canScrollPrev?: boolean;
  canScrollNext?: boolean;
}

const SectionHeader = ({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel = 'View all',
  centered = false,
  showViewAll = false,
  onPrevious,
  onNext,
  canScrollPrev = true,
  canScrollNext = true,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        `mb-10 flex items-end ${centered ? 'flex-col text-center' : 'justify-between'}`
      )}
    >
      <div className={cn(centered ? 'flex flex-col items-center' : '')}>
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
          {title}
        </h2>
      </div>

      {!centered && showViewAll && (
        <div className="hidden sm:flex items-center gap-2">
          {onPrevious && onNext ? (
            <>
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                disabled={!canScrollPrev}
                onClick={onPrevious}
              >
                <ChevronLeftIcon />
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                disabled={!canScrollNext}
                onClick={onNext}
              >
                <ChevronRightIcon />
                <span className="sr-only">Next slide</span>
              </Button>
              {viewAllHref && (
                <Link
                  href={viewAllHref}
                  className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors ml-2"
                >
                  {viewAllLabel}
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </>
          ) : (
            viewAllHref && (
              <Link
                href={viewAllHref}
                className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {viewAllLabel}
                <ArrowRight className="size-4" />
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
