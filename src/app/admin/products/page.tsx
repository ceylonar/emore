import { getProducts } from '@/lib/mock-data';
import ProductsView from '@/components/admin/products-view';

export default async function ManageProductsPage() {
  const products = await getProducts();

  return (
    <div>
        <h1 className="font-headline text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground mb-8">Manage the products available in your store.</p>
        <ProductsView initialProducts={products} />
    </div>
  );
}
