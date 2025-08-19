'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";

import type { HeroBanner } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from '../ui/button';

export function HeroCarousel({ banners }: { banners: HeroBanner[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className="relative">
              <Card className="border-none rounded-none">
                <CardContent className="relative flex aspect-[2/1] items-center justify-center p-0">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    data-ai-hint={banner.dataAiHint}
                    priority={banner.id === '1'}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative text-center text-white p-4">
                    <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                      {banner.title}
                    </h2>
                    <Button asChild size="lg" className="mt-8 rounded-full font-bold">
                      <Link href="/#products">Shop Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
