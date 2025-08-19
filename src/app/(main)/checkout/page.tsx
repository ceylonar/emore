import CheckoutForm from '@/components/checkout/checkout-form';
import { getWhatsAppNumber } from '@/lib/store';
import { redirect } from 'next/navigation';

// Mock function to check if cart is empty. In a real app this would use server-side session or other state management.
const isCartEmpty = () => {
  // For this example, we can't check sessionStorage on server. 
  // We'll rely on client-side check in CartView, but a real app would need a server-side check.
  return false;
}

export default async function CheckoutPage() {
  if (isCartEmpty()) {
    redirect('/cart');
  }

  const whatsAppNumber = await getWhatsAppNumber();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">Finalize your order and send it to us via WhatsApp.</p>
      </div>
      <CheckoutForm whatsAppNumber={whatsAppNumber} />
    </div>
  );
}
