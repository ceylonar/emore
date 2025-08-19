import ProductGrid from '@/components/home/product-grid';
import { getProducts } from '@/lib/mock-data';
import { Product } from '@/lib/types';

export default async function FormalShirtsPage() {
  const allProducts: Product[] = await getProducts();
  const formalShirtProducts = allProducts.filter(p => p.category === 'formal-shirts');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Formal Shirts</h1>
        <p className="text-muted-foreground mt-2">Discover our collection of elegant formal shirts.</p>
      </div>
      {formalShirtProducts.length > 0 ? (
        <ProductGrid products={formalShirtProducts} />
      ) : (
        <p className="text-center text-muted-foreground">No formal shirts found.</p>
      )}
    </div>
  );
}
