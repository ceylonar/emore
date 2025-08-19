import { getHeroBanners, getProducts } from '@/lib/mock-data';
import { HeroCarousel } from '@/components/home/hero-carousel';
import ProductGrid from '@/components/home/product-grid';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {Array.from({ length: 6 }).map((_, i) => (
         <div key={i} className="flex flex-col gap-4">
            <Skeleton className="aspect-w-3 aspect-h-4 h-[400px] w-full" />
            <Skeleton className="h-6 w-3/4 self-center" />
            <Skeleton className="h-5 w-1/4 self-center" />
            <Skeleton className="h-10 w-full rounded-full" />
         </div>
      ))}
    </div>
  )
}

function HeroCarouselSkeleton() {
  return <Skeleton className="w-full aspect-[2/1]" />
}


export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<HeroCarouselSkeleton />}>
        <HeroCarouselLoader />
      </Suspense>
      <section id="products" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">
            Featured Collection
          </h2>
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGridLoader />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

async function ProductGridLoader() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}

async function HeroCarouselLoader() {
  const banners = await getHeroBanners();
  return <HeroCarousel banners={banners} />;
}
