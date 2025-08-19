import { getProductById } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProductDetailClient product={product} />
    </div>
  );
}
