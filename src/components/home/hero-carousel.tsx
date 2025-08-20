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
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import TypingEffect from './typing-effect';

export function HeroCarousel({ banners }: { banners: HeroBanner[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap())
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api]);


  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={banner.id}>
            <div className="relative">
              <Card className="border-none rounded-none">
                <CardContent className="relative flex aspect-[3/4] md:aspect-[2/1] items-center justify-center p-0">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    data-ai-hint={banner.dataAiHint}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/20 md:to-transparent" />
                  <div className="relative text-left text-foreground p-8 md:p-24 self-center md:self-end w-full max-w-2xl">
                    {banner.offerDetails && (
                       <Badge variant="secondary" className="mb-2 text-lg">
                          {current === index && <TypingEffect text={banner.offerDetails} />}
                       </Badge>
                    )}
                    <h2 className="font-headline text-4xl md:text-7xl font-bold tracking-tight text-white drop-shadow-md">
                      {current === index ? (
                        banner.title.split(' ').map((word, i) => (
                           <span key={i} className="block">
                                <TypingEffect text={word} delay={i * 200} />
                           </span>
                        ))
                      ) : (
                         banner.title.split(' ').map((word, i) => (
                           <span key={i} className="block opacity-0">{word}</span>
                         ))
                      )}
                    </h2>
                    {banner.description && 
                        <p className="mt-4 text-lg text-white/90 drop-shadow-sm max-w-lg">
                           {current === index && <TypingEffect text={banner.description} />}
                        </p>
                    }
                    <Button asChild size="lg" className="mt-6 rounded-full font-bold px-8 py-6 text-sm bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg">
                      <Link href="/#products">SHOP NOW</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
       <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden group-hover:flex" />
       <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden group-hover:flex" />
    </Carousel>
  );
}
