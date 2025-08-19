'use client';

import InventoryManagement from '@/components/admin/inventory/inventory-management';
import { Suspense, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getProducts, getHeroBanners } from '@/lib/mock-data';
import type { Product, HeroBanner } from '@/lib/types';

function InventorySkeleton() {
    return <Skeleton className="h-[500px] w-full" />
}

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [banners, setBanners] = useState<HeroBanner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [productsData, bannersData] = await Promise.all([
                getProducts(),
                getHeroBanners()
            ]);
            setProducts(productsData);
            setBanners(bannersData);
            setLoading(false);
        };

        fetchData();
    }, []);

  return (
    <div>
        {loading ? (
            <InventorySkeleton />
        ) : (
            <InventoryManagement products={products} banners={banners} />
        )}
    </div>
  );
}
