import Image from 'next/image';
import type { HeroBanner } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BannerList({ banners }: { banners: HeroBanner[] }) {
    return (
        <div className="mt-8">
             <h3 className="font-headline text-xl font-bold mb-4">Current Banners</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                    <Card key={banner.id}>
                        <CardContent className="p-0">
                            <div className="relative aspect-[2/1]">
                                <Image
                                    src={banner.imageUrl}
                                    alt={banner.title}
                                    fill
                                    className="object-cover rounded-t-lg"
                                />
                            </div>
                        </CardContent>
                        <CardHeader>
                            <CardTitle className="text-lg">{banner.title}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
