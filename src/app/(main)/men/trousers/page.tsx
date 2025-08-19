import ProductGrid from '@/components/home/product-grid';
import { getProducts } from '@/lib/mock-data';
import { Product } from '@/lib/types';

export default async function TrousersPage() {
  const allProducts: Product[] = await getProducts();
  const trouserProducts = allProducts.filter(p => p.category === 'trousers');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Trousers</h1>
        <p className="text-muted-foreground mt-2">Find the perfect pair of trousers for any occasion.</p>
      </div>
      {trouserProducts.length > 0 ? (
        <ProductGrid products={trouserProducts} />
      ) : (
        <p className="text-center text-muted-foreground">No trousers found.</p>
      )}
    </div>
  );
}
