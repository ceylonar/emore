import { getHeroBanners } from '@/lib/mock-data';
import { addBanner } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { revalidatePath } from 'next/cache';
import type { HeroBanner } from '@/lib/types';

async function AddBannerForm() {
    async function handleAddBanner(formData: FormData) {
        'use server';
        const title = formData.get('title') as string;
        const imageUrl = formData.get('imageUrl') as string;
        const dataAiHint = formData.get('dataAiHint') as string | undefined;

        if (!title || !imageUrl) {
            return;
        }

        await addBanner({ title, imageUrl, dataAiHint });
        revalidatePath('/');
        revalidatePath('/admin/banners');
    }

    return (
        <form action={handleAddBanner} className="space-y-4">
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

async function BannerList() {
    const banners: HeroBanner[] = await getHeroBanners();

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
