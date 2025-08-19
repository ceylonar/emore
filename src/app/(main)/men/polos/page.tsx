import ProductGrid from '@/components/home/product-grid';
import { getProducts } from '@/lib/mock-data';
import { Product } from '@/lib/types';

export default async function PolosPage() {
  const allProducts: Product[] = await getProducts();
  const poloProducts = allProducts.filter(p => p.category === 'polos');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Polos</h1>
        <p className="text-muted-foreground mt-2">Discover our classic and modern polo shirts.</p>
      </div>
      {poloProducts.length > 0 ? (
        <ProductGrid products={poloProducts} />
      ) : (
        <p className="text-center text-muted-foreground">No polo shirts found.</p>
      )}
    </div>
  );
}
