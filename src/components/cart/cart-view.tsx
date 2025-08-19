'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CartView() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24">
        <h1 className="font-headline text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        <div className="flex justify-between items-baseline mb-6">
            <h1 className="font-headline text-4xl font-bold">Your Cart</h1>
            <Button variant="link" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
            </Button>
        </div>
        <ul role="list" className="space-y-6">
          {cartItems.map((item) => (
            <li key={item.id} className="flex flex-col sm:flex-row py-6 border-b">
              <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border bg-secondary">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-0 mt-4 sm:ml-4 sm:mt-0 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex justify-between text-base font-medium">
                    <div>
                      <h3 className="font-headline text-lg">
                        <Link href={`/product/${item.productId}`}>{item.name}</Link>
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">Size: {item.size}</p>
                    </div>
                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm mt-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="h-8 w-12 text-center border-x border-y-0 rounded-none focus-visible:ring-0"
                      min="1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex">
                    <Button type="button" variant="link" onClick={() => removeFromCart(item.id)} className="font-medium text-muted-foreground hover:text-primary">
                        <X className="mr-1 h-4 w-4"/>
                        Remove
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h2 className="font-headline text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Calculated at next step</span>
                </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between text-base font-bold">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
            </div>
            <Button asChild className="w-full mt-6" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
