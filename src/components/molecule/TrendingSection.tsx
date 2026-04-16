"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Container from '@/components/shared/Container'
import SectionHeader from '@/components/shared/SectionHeader'
import ProductCard from '@/components/atom/ProductCard'
import { ROUTES } from '@/config/routes'

const TRENDING_PRODUCTS = [
  { name: 'Wireless Noise Cancelling Headphones Pro', price: '₵79.99', originalPrice: '₵129.99', rating: 5, reviews: 2847, badge: 'Best Seller', emoji: '🎧' },
  { name: 'Minimalist Leather Watch', price: '₵149.00', originalPrice: '₵199.00', rating: 4, reviews: 1203, badge: 'New', emoji: '⌚' },
  { name: 'Ergonomic Office Chair', price: '₵299.00', originalPrice: '₵399.00', rating: 5, reviews: 876, badge: 'Sale', emoji: '🪑' },
  { name: 'Running Shoes Ultra Boost', price: '₵89.99', originalPrice: '₵120.00', rating: 4, reviews: 3102, badge: undefined, emoji: '👟' },
  { name: 'Smart Fitness Tracker', price: '₵59.99', originalPrice: '₵89.99', rating: 4, reviews: 1567, badge: 'Popular', emoji: '⌚' },
  { name: 'Portable Bluetooth Speaker', price: '₵45.99', originalPrice: '₵69.99', rating: 5, reviews: 2341, badge: 'Sale', emoji: '🔊' },
]

interface TrendingSectionProps {
  onAddToCart: () => void
}

const TrendingSection = ({ onAddToCart }: TrendingSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  })
  
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const onSelect = React.useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return
    
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <Container className="bg-white">
      <SectionHeader
        eyebrow="Hot right now"
        title="Trending Products"
        // viewAllHref={ROUTES.PRODUCTS}
        showViewAll={true}
        onPrevious={scrollPrev}
        onNext={scrollNext}
        canScrollPrev={canScrollPrev}
        canScrollNext={canScrollNext}
      />
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {TRENDING_PRODUCTS.map((product) => (
            <div 
              key={product.name} 
              className="flex-[0_0_280px] min-w-0"
            >
              <ProductCard
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                reviews={product.reviews}
                badge={product.badge}
                emoji={product.emoji}
                onAddToCart={onAddToCart}
                showButton={false}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default TrendingSection