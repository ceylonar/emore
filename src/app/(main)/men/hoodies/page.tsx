import ProductGrid from '@/components/home/product-grid';
import { getProducts } from '@/lib/mock-data';
import { Product } from '@/lib/types';

export default async function HoodiesPage() {
  const allProducts: Product[] = await getProducts();
  const hoodieProducts = allProducts.filter(p => p.category === 'hoodies');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Hoodies</h1>
        <p className="text-muted-foreground mt-2">Stay comfortable and stylish with our hoodies.</p>
      </div>
      {hoodieProducts.length > 0 ? (
        <ProductGrid products={hoodieProducts} />
      ) : (
        <p className="text-center text-muted-foreground">No hoodies found.</p>
      )}
    </div>
  );
}
