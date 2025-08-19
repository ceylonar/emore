'use client';

import { addBanner } from '@/app/admin/banners/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef } from 'react';

export default function AddBannerForm() {
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
        } else {
            console.error(result.error);
        }
    }

    return (
        <form ref={formRef} action={handleAddBanner} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Banner Title</Label>
                <Input id="title" name="title" placeholder="e.g. Summer Collection" required suppressHydrationWarning />
            </div>
            <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/1200x600.png" required suppressHydrationWarning />
            </div>
            <div className="space-y-2">
                <Label htmlFor="dataAiHint">AI Hint (optional)</Label>
                <Input id="dataAiHint" name="dataAiHint" placeholder="e.g. fashion model" suppressHydrationWarning />
            </div>
            <Button type="submit" suppressHydrationWarning>Add Banner</Button>
        </form>
    );
}
