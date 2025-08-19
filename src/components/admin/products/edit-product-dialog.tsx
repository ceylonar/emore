'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { updateProduct } from '@/app/admin/products/actions';
import type { Product, ProductCategory } from '@/lib/types';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  category: z.custom<ProductCategory>(),
  imageUrls: z.array(z.object({ value: z.string().url('Invalid URL') })).min(1, 'At least one image URL is required'),
  dataAiHint: z.string().optional(),
  size: z.string().min(1, 'Size is required'),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export function EditProductDialog({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrls: product.imageUrls ? product.imageUrls.map(url => ({ value: url })) : [{ value: '' }],
      dataAiHint: product.dataAiHint || '',
      size: product.size,
      stock: product.stock,
      featured: product.featured || false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "imageUrls"
  });

  async function onSubmit(data: FormData) {
    const { imageUrls, ...restData } = data;
    const imageUrlsArray = imageUrls.map(urlObj => urlObj.value).filter(url => url);

    if (imageUrlsArray.length === 0) {
        form.setError('imageUrls', { type: 'manual', message: 'At least one image URL is required' });
        return;
    }

    const result = await updateProduct(product.id, { ...restData, imageUrls: imageUrlsArray });
    if (result.success) {
      setIsOpen(false);
    } else {
      console.error(result.error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" suppressHydrationWarning>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to the product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Silk Scarf" {...field} suppressHydrationWarning />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g. 49.99" {...field} suppressHydrationWarning />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
             </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g. A finely crafted silk scarf..." {...field} suppressHydrationWarning />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger suppressHydrationWarning>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="t-shirts">T-shirts</SelectItem>
                                <SelectItem value="polos">Polos</SelectItem>
                                <SelectItem value="denims">Denims</SelectItem>
                                <SelectItem value="trousers">Trousers</SelectItem>
                                <SelectItem value="shorts">Shorts</SelectItem>
                                <SelectItem value="hoodies">Hoodies</SelectItem>
                                <SelectItem value="dresses">Dresses</SelectItem>
                                <SelectItem value="sweaters">Sweaters</SelectItem>
                                <SelectItem value="belts">Belts</SelectItem>
                                <SelectItem value="scarves">Scarves</SelectItem>
                                <SelectItem value="accessories">Accessories</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. One Size, Large" {...field} suppressHydrationWarning />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="e.g. 100" {...field} suppressHydrationWarning />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="space-y-4">
                <Label>Image URLs</Label>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                            <FormField
                            control={form.control}
                            name={`imageUrls.${index}.value`}
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                <FormControl>
                                    <Input placeholder="https://placehold.co/600x800.png" {...field} suppressHydrationWarning />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
                 <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ value: "" })}
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Image URL
                </Button>
                <FormMessage>{form.formState.errors.imageUrls?.message}</FormMessage>
            </div>
            <FormField
                control={form.control}
                name="dataAiHint"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>AI Hint (optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. product photo" {...field} suppressHydrationWarning />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        suppressHydrationWarning
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                        Show on homepage
                        </FormLabel>
                    </div>
                    </FormItem>
                )}
                />
            <DialogFooter>
              <Button type="submit" suppressHydrationWarning>Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
