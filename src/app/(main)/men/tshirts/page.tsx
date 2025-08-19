import ProductGrid from '@/components/home/product-grid';
import { getProducts } from '@/lib/mock-data';
import { Product } from '@/lib/types';

export default async function TshirtsPage() {
  const allProducts: Product[] = await getProducts();
  const tshirtProducts = allProducts.filter(p => p.category === 't-shirts');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">T-shirts</h1>
        <p className="text-muted-foreground mt-2">Check out our latest collection of t-shirts.</p>
      </div>
      {tshirtProducts.length > 0 ? (
        <ProductGrid products={tshirtProducts} />
      ) : (
        <p className="text-center text-muted-foreground">No t-shirts found.</p>
      )}
    </div>
  );
}
