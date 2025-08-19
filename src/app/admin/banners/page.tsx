'use client';

import { getHeroBanners } from '@/lib/mock-data';
import { addBanner } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
            // The server action's revalidatePath will trigger a re-fetch of data
            // for server components, and for client components, we can either
            // manually trigger a re-fetch or rely on navigation. The revalidation
            // should handle updating the list on the next page view.
        } else {
            console.error(result.error);
            // In a real app, show a toast notification for the error.
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
        // This fetch will run on the client side.
        // It's okay for hydration as long as the initial render on the server
        // and client are the same (which they are, an empty list).
        // The list will be populated once the component mounts on the client.
        getHeroBanners().then(setBanners);
    }, []);

    // The revalidatePath in the server action will invalidate the cache.
    // To see the new banner, the user currently has to refresh the page or navigate
    // away and back. A more sophisticated implementation might use router.refresh()
    // or a state management library to update the list in place.

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

export default function ManageBannersPage() {
  return (
    <div>
        <h1 className="font-headline text-3xl font-bold mb-2">Hero Banners</h1>
        <p className="text-muted-foreground mb-8">Manage the promotional banners in your homepage's hero carousel.</p>

        <div className="grid gap-10">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Banner</CardTitle>
                    <CardDescription>Add a new promotional banner to your homepage carousel.</CardDescription>
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
