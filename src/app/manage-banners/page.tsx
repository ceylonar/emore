'use client';

import { getHeroBanners } from '@/lib/mock-data';
import { addBanner } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import type { HeroBanner } from '@/lib/types';
import { useEffect, useState, useRef } from 'react';

function AddBannerForm() {
    const formRef = useRef<HTMLFormElement>(null);

    async function handleAddBanner(formData: FormData) {
        const title = formData.get('title') as string;
        const imageUrl = formData.get('imageUrl') as string;
        const dataAiHint = formData.get('dataAiHint') as string | undefined;

        if (!title || !imageUrl) {
            return;
        }

        const result = await addBanner({ title, imageUrl, dataAiHint });

        if (result.success) {
            formRef.current?.reset();
            // The revalidation is handled by the server action, 
            // so we don't need to reload the window anymore.
            // A more sophisticated solution could involve using useOptimistic.
        } else {
            // Handle error case, e.g., show a toast notification
            console.error(result.error);
        }
    }

    return (
        <form ref={formRef} action={handleAddBanner} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Banner Title</Label>
                <Input id="title" name="title" placeholder="e.g. Summer Collection" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/1200x600.png" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="dataAiHint">AI Hint (optional)</Label>
                <Input id="dataAiHint" name="dataAiHint" placeholder="e.g. fashion model" />
            </div>
            <Button type="submit">Add Banner</Button>
        </form>
    );
}


function BannerList() {
    const [banners, setBanners] = useState<HeroBanner[]>([]);

    useEffect(() => {
        // This is not ideal as it won't show new banners without a reload.
        // The page needs to be re-rendered to get the latest banners.
        // The revalidatePath in the action should trigger a re-render for server components,
        // but for a client component, we might need a more direct way to refresh data.
        // For now, we rely on the user refreshing or navigating away and back.
        async function fetchBanners() {
            const bannerData = await getHeroBanners();
            setBanners(bannerData);
        }
        fetchBanners();
    }, []);


    return (
        <div className="mt-12">
             <h2 className="font-headline text-2xl font-bold mb-6">Current Banners</h2>
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

export default function ManageBannersPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl font-bold">Manage Hero Banners</CardTitle>
            </CardHeader>
            <CardContent>
                <AddBannerForm />
            </CardContent>
        </Card>
        <BannerList />
      </div>
    </div>
  );
}
