import { getProducts } from '@/lib/mock-data';
import AddProductForm from '@/components/admin/products/add-product-form';
import ProductList from '@/components/admin/products/product-list';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function ManageProductsPage() {
  const products = await getProducts();

  return (
    <div>
        <h1 className="font-headline text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground mb-8">Manage the products available in your store.</p>
        <div className="grid gap-10">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                    <CardDescription>Fill out the form to add a new product to your inventory.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddProductForm />
                </CardContent>
            </Card>
            <ProductList products={products} />
        </div>
    </div>
  );
}
