import CheckoutForm from '@/components/checkout/checkout-form';
import { getWhatsAppNumber } from '@/lib/store';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


// Mock function to check if cart is empty. In a real app this would use server-side session or other state management.
const isCartEmpty = () => {
  // For this example, we can't check sessionStorage on server. 
  // We'll rely on client-side check in CartView, but a real app would need a server-side check.
  return false;
}

function CheckoutFormSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/2" />
        <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="bg-secondary/50 p-8 rounded-lg">
        <Skeleton className="h-8 w-3/4 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  if (isCartEmpty()) {
    redirect('/cart');
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">Finalize your order and send it to us via WhatsApp.</p>
      </div>
       <Suspense fallback={<CheckoutFormSkeleton />}>
        <CheckoutLoader />
      </Suspense>
    </div>
  );
}

async function CheckoutLoader() {
  const whatsAppNumber = await getWhatsAppNumber();
  return <CheckoutForm whatsAppNumber={whatsAppNumber} />;
}
