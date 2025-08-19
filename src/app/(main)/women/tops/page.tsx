import ProductGrid from '@/components/home/product-grid';
import { getProducts } from '@/lib/mock-data';
import { Product } from '@/lib/types';

export default async function TopsPage() {
  const allProducts: Product[] = await getProducts();
  const topProducts = allProducts.filter(p => p.category === 'tops');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Tops</h1>
        <p className="text-muted-foreground mt-2">Explore our stylish and versatile tops.</p>
      </div>
      {topProducts.length > 0 ? (
        <ProductGrid products={topProducts} />
      ) : (
        <p className="text-center text-muted-foreground">No tops found.</p>
      )}
    </div>
  );
}
