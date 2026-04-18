'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Loading from '@/components/shared/Loading';
import HeroSection from '@/components/molecule/HeroSection';
import StatsSection from '@/components/molecule/StatsSection';
import CategoriesSection from '@/components/molecule/CategoriesSection';
import TrendingSection from '@/components/molecule/TrendingSection';
import PromoBannerSection from '@/components/molecule/PromoBannerSection';
import TestimonialsSection from '@/components/molecule/TestimonialsSection';
import NewsletterSection from '@/components/molecule/NewsletterSection';
import { ROUTES } from '@/config/routes';

const HOMEPAGE_EXPERIMENT_ID = process.env.NEXT_PUBLIC_HOMEPAGE_EXPERIMENT_ID;

function trackEvent(eventType: string, variantId: string, userId: string) {
  fetch('/api/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      variantId,
      experimentId: HOMEPAGE_EXPERIMENT_ID,
      eventType,
      metadata: { page: 'homepage', timestamp: new Date().toISOString() },
    }),
  }).catch(console.error);
}

export default function Home() {
  const { user, isLoaded } = useUser();
  const [variant, setVariant] = useState<'A' | 'B' | null>(null);
  const [variantId, setVariantId] = useState<string>('');

  useEffect(() => {
    if (!isLoaded) return;

    let userId: string;
    if (user) {
      userId = user.id;
    } else {
      let anonId = localStorage.getItem('anonymous_user_id');
      if (!anonId) {
        anonId = 'anon_' + Math.random().toString(36).slice(2);
        localStorage.setItem('anonymous_user_id', anonId);
      }
      userId = anonId;
    }

    fetch('/api/assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, experimentId: HOMEPAGE_EXPERIMENT_ID }),
    })
      .then((r) => r.json())
      .then((data) => {
        const v = data.variant?.name as 'A' | 'B';
        setVariant(v);
        setVariantId(data.variantId);
        trackEvent('page_view', data.variantId, userId);
      })
      .catch(() => setVariant('A'));
  }, [isLoaded, user]);

  const getUserId = () =>
    user?.id || localStorage.getItem('anonymous_user_id') || 'anonymous';

  const handleCTAClick = () => {
    if (variantId) trackEvent('cta_click', variantId, getUserId());
    window.location.href = ROUTES.PRODUCTS;
  };

  const handleLearnMore = () => {
    if (variantId) trackEvent('browse_click', variantId, getUserId());
    window.location.href = ROUTES.EXPERIMENT;
  };

  const ctaLabel = variant === 'A' ? 'Get Started' : 'Shop Now';

  if (!isLoaded && !variant) return <Loading />;

  return (
    <div className="flex flex-col">
      <HeroSection
        ctaLabel={ctaLabel}
        onCTAClick={handleCTAClick}
        onLearnMore={handleLearnMore}
      />
      <StatsSection />
      <CategoriesSection />
      <TrendingSection
        onAddToCart={() => {
          if (variantId) trackEvent('add_to_cart', variantId, getUserId());
        }}
      />
      <PromoBannerSection ctaLabel={ctaLabel} onCTAClick={handleCTAClick} />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
