import { getHeroBanners, getProducts } from '@/lib/mock-data';
import { HeroCarousel } from '@/components/home/hero-carousel';
import ProductGrid from '@/components/home/product-grid';

export default async function HomePage() {
  const banners = await getHeroBanners();
  const products = await getProducts();

  return (
    <div>
      <HeroCarousel banners={banners} />
      <section id="products" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">
            Featured Collection
          </h2>
          <ProductGrid products={products} />
        </div>
      </section>
    </div>
  );
}
