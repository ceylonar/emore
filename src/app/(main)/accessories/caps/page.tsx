import ProductGrid from '@/components/home/product-grid';
import { getProducts } from '@/lib/mock-data';
import { Product } from '@/lib/types';

export default async function CapsPage() {
  const allProducts: Product[] = await getProducts();
  const products = allProducts.filter(p => p.category === 'caps');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Caps</h1>
        <p className="text-muted-foreground mt-2">Top off your look with our collection of caps.</p>
      </div>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-center text-muted-foreground">No caps found.</p>
      )}
    </div>
  );
}
