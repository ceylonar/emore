'use client';

import Image from 'next/image';
import type { HeroBanner } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EditBannerDialog } from './edit-banner-dialog';
import { deleteBanner } from '@/app/admin/banners/actions';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

async function handleDelete(bannerId: string) {
    const result = await deleteBanner(bannerId);
    if (!result.success) {
        console.error(result.error);
        // Optionally show a toast notification on error
    }
}

export default function BannerList({ banners }: { banners: HeroBanner[] }) {
    if (banners.length === 0) {
        return (
            <div className="mt-8 text-center text-muted-foreground">
                <p>No banners have been added yet.</p>
            </div>
        )
    }

    return (
        <div className="mt-8">
             <h3 className="font-headline text-xl font-bold mb-4">Current Banners</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                    <Card key={banner.id} className="flex flex-col">
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
                        <CardHeader className="flex-grow">
                            <CardTitle className="text-lg">{banner.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="flex justify-end gap-2">
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this
                                    banner.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                     onClick={() => handleDelete(banner.id)}
                                     className="bg-destructive hover:bg-destructive/90"
                                     >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <EditBannerDialog banner={banner} />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
