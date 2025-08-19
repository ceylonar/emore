import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts, getHeroBanners } from "@/lib/mock-data";
import { DollarSign, Package, Image as ImageIcon } from "lucide-react";

export default async function AdminDashboardPage() {
    const products = await getProducts();
    const banners = await getHeroBanners();

    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalProducts = products.length;
    const totalBanners = banners.length;

    return (
        <div>
            <h1 className="font-headline text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalStock}</div>
                        <p className="text-xs text-muted-foreground">total items in inventory</p>
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
        </div>
    );
}
