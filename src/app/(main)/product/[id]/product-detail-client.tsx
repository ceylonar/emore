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
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = React.useState<string | undefined>(undefined);
    const [error, setError] = React.useState<string | null>(null);

    const availableSizes = product.sizes ? product.sizes.filter(s => s.stock > 0) : [];

    const handleAddToCart = () => {
        if (!selectedSize) {
            setError('Please select a size.');
            return;
        }
        setError(null);
        addToCart({
            id: `${product.id}-${selectedSize}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrls[0],
            size: selectedSize,
        });
    };
    
    const totalStock = product.sizes ? product.sizes.reduce((total, s) => total + s.stock, 0) : 0;

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

                <div className="mt-8 space-y-4">
                     <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="size-select">Size</Label>
                        <Select onValueChange={setSelectedSize} value={selectedSize}>
                            <SelectTrigger id="size-select">
                                <SelectValue placeholder="Select a size" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableSizes.map(s => (
                                    <SelectItem key={s.size} value={s.size}>
                                        {s.size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {availableSizes.length === 0 && (
                            <p className="text-sm text-destructive mt-2">Out of stock</p>
                        )}
                     </div>

                     <Button 
                        size="lg" 
                        onClick={handleAddToCart} 
                        className="w-full md:w-auto rounded-full px-12 py-6"
                        disabled={!selectedSize || totalStock === 0}
                    >
                        {totalStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                     {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                </div>

                <div className="mt-8 text-sm text-muted-foreground">
                    <p><span className="font-semibold">Category:</span> {product.category}</p>
                     {selectedSize && (
                        <p><span className="font-semibold">Stock for {selectedSize}:</span> {product.sizes.find(s => s.size === selectedSize)?.stock} units</p>
                     )}
                </div>
            </div>
        </div>
    );
}
