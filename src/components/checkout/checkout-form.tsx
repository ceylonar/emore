'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/context/cart-provider';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  address: z.string().min(5, 'Please enter a valid address.'),
  mobileNumber: z.string().min(10, 'Please enter a valid mobile number.'),
});

interface CheckoutFormProps {
  whatsAppNumber: string;
}

export default function CheckoutForm({ whatsAppNumber }: CheckoutFormProps) {
  const { cartItems, totalPrice, clearCart } = useCart();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      mobileNumber: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const orderId = `EMORE-${Date.now()}`;
    const adminWhatsAppNumber = '+94716559655'; // Hardcoded number

    let message = `*New Order - ${orderId}*\n\n`;
    message += "*Customer Details:*\n";
    message += `Name: ${values.name}\n`;
    message += `Address: ${values.address}\n`;
    message += `Mobile: ${values.mobileNumber}\n\n`;

    message += "*Order Items:*\n";
    cartItems.forEach(item => {
      message += `- ${item.name} (Size: ${item.size}, Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total: $${totalPrice.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    // Sanitize the phone number by removing non-digit characters
    const sanitizedWhatsAppNumber = adminWhatsAppNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${sanitizedWhatsAppNumber}?text=${encodedMessage}`;

    clearCart();
    window.location.href = whatsappUrl;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="font-headline text-2xl font-bold mb-6">Shipping Details</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Colombo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 0771234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" className="w-full mt-4">Send Order via WhatsApp</Button>
          </form>
        </Form>
      </div>
      <div className="bg-secondary/50 p-8 rounded-lg">
        <h2 className="font-headline text-2xl font-bold mb-6">Your Order</h2>
        <div className="space-y-4">
            {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-start">
                    <span className="font-semibold">{item.name} <span className="text-sm text-muted-foreground">(x{item.quantity}, {item.size})</span></span>
                    <span className="text-right">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            ))}
        </div>
        <Separator className="my-6" />
        <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
