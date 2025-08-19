'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-provider';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const hasImage = product.imageUrls && product.imageUrls.length > 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // prevent navigation when clicking the button
    if (hasImage) {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrls[0],
        });
    } else {
        // Optionally handle case where there is no image, e.g. show a toast
        console.warn("Cannot add to cart: product has no image.");
    }
  };

  return (
    <Link href={`/product/${product.id}`} className="group">
      <Card className="overflow-hidden border-none shadow-none rounded-lg bg-transparent flex flex-col h-full">
        <CardContent className="p-0 mb-4">
          <div className="aspect-w-3 aspect-h-4">
            {hasImage ? (
                <Image
                    src={product.imageUrls[0]}
                    alt={product.name}
                    width={600}
                    height={800}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={product.dataAiHint}
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                    <Package className="h-16 w-16 text-muted-foreground" />
                </div>
            )}
          </div>
        </CardContent>
        <CardHeader className="p-0 text-center">
          <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
          <CardDescription className="pt-2 text-base">${product.price.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardFooter className="p-0 mt-auto pt-4 flex-col gap-2 items-center">
          <Button onClick={handleAddToCart} className="w-full rounded-full" variant="secondary" disabled={!hasImage}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
