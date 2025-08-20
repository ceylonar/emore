import ProductGrid from '@/components/home/product-grid';
import { getProducts } from '@/lib/mock-data';
import type { Product } from '@/lib/types';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {Array.from({ length: 6 }).map((_, i) => (
         <div key={i} className="flex flex-col gap-4">
            <Skeleton className="aspect-w-3 aspect-h-4 h-[400px] w-full" />
            <Skeleton className="h-6 w-3/4 self-center" />
            <Skeleton className="h-5 w-1/4 self-center" />
            <Skeleton className="h-10 w-full rounded-full" />
         </div>
      ))}
    </div>
  )
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Search Results</h1>
        {query && (
          <p className="text-muted-foreground mt-2">
            Showing results for: <span className="font-semibold text-foreground">{query}</span>
          </p>
        )}
      </div>
      <Suspense fallback={<ProductGridSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}

async function SearchResults({ query }: { query: string }) {
    const allProducts: Product[] = await getProducts();

    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        return <p className="text-center text-muted-foreground">No products found for your search.</p>;
    }

    return <ProductGrid products={filteredProducts} />;
}
