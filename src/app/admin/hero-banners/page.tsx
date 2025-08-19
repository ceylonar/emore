'use client';

import HeroBannerManagement from '@/components/admin/hero/hero-banner-management';
import { Suspense, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getHeroBanners } from '@/lib/mock-data';
import type { HeroBanner } from '@/lib/types';

function BannerSkeleton() {
    return <Skeleton className="h-[500px] w-full" />
}

export default function HeroBannersPage() {
    const [banners, setBanners] = useState<HeroBanner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const bannersData = await getHeroBanners();
            setBanners(bannersData);
            setLoading(false);
        };

        fetchData();
    }, []);

  return (
    <div>
        {loading ? (
            <BannerSkeleton />
        ) : (
            <HeroBannerManagement banners={banners} />
        )}
    </div>
  );
}
