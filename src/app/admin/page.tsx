import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts, getHeroBanners } from "@/lib/mock-data";
import { DollarSign, Package, Image as ImageIcon, List, AlertTriangle } from "lucide-react";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

function formatCategory(category: string) {
    if (!category) return 'N/A';
    return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default async function AdminDashboardPage() {
    const products: Product[] = await getProducts();
    const banners = await getHeroBanners();

    const totalStock = products.reduce((sum, product) => {
        const productStock = product.sizes ? product.sizes.reduce((s, size) => s + size.stock, 0) : 0;
        return sum + productStock;
    }, 0);
    const totalProducts = products.length;
    const totalBanners = banners.length;

    const totalValue = products.reduce((sum, product) => {
        const productStock = product.sizes ? product.sizes.reduce((s, size) => s + size.stock, 0) : 0;
        return sum + (product.price * productStock);
    }, 0);

    const productsByCategory = products.reduce((acc, product) => {
        const category = product.category || 'uncategorized';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const lowStockProducts = products.filter(p => {
        const stock = p.sizes ? p.sizes.reduce((total, s) => total + s.stock, 0) : 0;
        return stock > 0 && stock < 10;
    });


    return (
        <div>
            <h1 className="font-headline text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                        <p className="text-xs text-muted-foreground">items in your store</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
                        <List className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalStock}</div>
                        <p className="text-xs text-muted-foreground">total items in inventory</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">LKR {totalValue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">total value of all stock</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Hero Banners</CardTitle>
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalBanners}</div>
                        <p className="text-xs text-muted-foreground">active promotional banners</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products by Category</CardTitle>
                        <List className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 pt-4">
                            {Object.entries(productsByCategory).map(([category, count]) => (
                                <div key={category} className="flex items-center justify-between text-sm">
                                    <Badge variant="secondary">{formatCategory(category)}</Badge>
                                    <span className="font-medium">{count} {count === 1 ? 'product' : 'products'}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 pt-4">
                            {lowStockProducts.length > 0 ? (
                                <ul className="space-y-3">
                                    {lowStockProducts.slice(0, 5).map(p => (
                                        <li key={p.id} className="flex justify-between items-center text-sm">
                                            <span className="truncate pr-4">{p.name}</span>
                                            <Badge variant="destructive">{p.sizes.reduce((total, s) => total + s.stock, 0)} left</Badge>
                                        </li>
                                    ))}
                                    {lowStockProducts.length > 5 && (
                                        <li className="text-center text-xs text-muted-foreground pt-2">
                                            + {lowStockProducts.length - 5} more items
                                        </li>
                                    )}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No low stock items found.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
