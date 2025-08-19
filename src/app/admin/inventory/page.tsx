import InventoryManagement from '@/components/admin/inventory/inventory-management';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getProducts, getHeroBanners } from '@/lib/mock-data';

function InventorySkeleton() {
    return <Skeleton className="h-[500px] w-full" />
}

export default function InventoryPage() {
  return (
    <div>
        <Suspense fallback={<InventorySkeleton />}>
            <InventoryLoader />
        </Suspense>
    </div>
  );
}


async function InventoryLoader() {
    const products = await getProducts();
    const banners = await getHeroBanners();
    return <InventoryManagement products={products} banners={banners} />
}
