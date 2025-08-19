'use client';

import * as React from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { useCart } from '@/context/cart-provider';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrls[0],
        });
    };

    return (
        <div className="grid md:grid-cols-2 gap-12">
            <div>
                 <Carousel className="w-full">
                    <CarouselContent>
                        {product.imageUrls.map((url, index) => (
                        <CarouselItem key={index}>
                            <div className="aspect-w-3 aspect-h-4">
                                <Image
                                    src={url}
                                    alt={`${product.name} image ${index + 1}`}
                                    width={800}
                                    height={1067}
                                    className="object-cover w-full h-full rounded-lg"
                                    priority={index === 0}
                                />
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden group-hover:flex" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden group-hover:flex" />
                </Carousel>
            </div>
            <div className="flex flex-col justify-center">
                <h1 className="font-headline text-4xl lg:text-5xl font-bold">{product.name}</h1>
                <p className="text-3xl mt-4">${product.price.toFixed(2)}</p>
                <p className="mt-6 text-muted-foreground">{product.description}</p>

                <div className="mt-8">
                     <Button size="lg" onClick={handleAddToCart} className="w-full md:w-auto rounded-full px-12 py-6">
                        Add to Cart
                    </Button>
                </div>

                <div className="mt-8 text-sm text-muted-foreground">
                    <p><span className="font-semibold">Category:</span> {product.category}</p>
                    <p><span className="font-semibold">Size:</span> {product.size}</p>
                    <p><span className="font-semibold">In Stock:</span> {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}</p>
                </div>
            </div>
        </div>
    );
}
