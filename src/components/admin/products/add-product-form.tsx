'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addProduct } from '@/app/admin/products/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { ProductCategory } from '@/lib/types';
import { PlusCircle, Trash2 } from 'lucide-react';

const sizeStockSchema = z.object({
  size: z.string().min(1, 'Size is required'),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
});

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  category: z.custom<ProductCategory>(),
  imageUrls: z.array(z.object({ value: z.string().url('Invalid URL') })).min(1, 'At least one image URL is required'),
  dataAiHint: z.string().optional(),
  sizes: z.array(sizeStockSchema).min(1, 'At least one size is required'),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;


export default function AddProductForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            imageUrls: [{ value: '' }],
            dataAiHint: '',
            sizes: [{ size: '', stock: 0 }],
            featured: false,
        },
    });

    const { fields: imageUrlFields, append: appendImageUrl, remove: removeImageUrl } = useFieldArray({
        control: form.control,
        name: "imageUrls"
    });

    const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
        control: form.control,
        name: "sizes"
    });

    async function onSubmit(data: FormData) {
        const productData = {
            ...data,
            imageUrls: data.imageUrls.map(url => url.value),
        };
        
        const result = await addProduct(productData);
        if (result.success) {
            form.reset();
             form.reset({
                name: '',
                description: '',
                price: 0,
                imageUrls: [{ value: '' }],
                dataAiHint: '',
                sizes: [{size: '', stock: 0}],
                featured: false,
            });
        } else {
            console.error(result.error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <div className="space-y-4 rounded-md border p-4">
                    <Label className="font-semibold">Sizes & Stock</Label>
                    {sizeFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-3 items-center gap-2">
                             <FormField
                                control={form.control}
                                name={`sizes.${index}.size`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">Size</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Medium" {...field} suppressHydrationWarning />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <FormField
                                control={form.control}
                                name={`sizes.${index}.stock`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="e.g. 100" {...field} suppressHydrationWarning />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeSize(index)} disabled={sizeFields.length <= 1} suppressHydrationWarning>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendSize({ size: "", stock: 0 })}
                        suppressHydrationWarning
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Size
                    </Button>
                    <FormMessage>{form.formState.errors.sizes?.root?.message}</FormMessage>
                </div>
                 <div className="space-y-4 rounded-md border p-4">
                    <Label className="font-semibold">Image URLs</Label>
                    {imageUrlFields.map((field, index) => (
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
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeImageUrl(index)} disabled={imageUrlFields.length <= 1} suppressHydrationWarning>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendImageUrl({ value: "" })}
                        suppressHydrationWarning
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Image URL
                    </Button>
                </div>
                <div className="space-y-2">
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
                </div>
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
                            <p className="text-sm text-muted-foreground">
                                Check this box to feature this product in the "NEW DROPS" section on the homepage.
                            </p>
                        </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" suppressHydrationWarning>Add Product</Button>
            </form>
        </Form>
    );
}
