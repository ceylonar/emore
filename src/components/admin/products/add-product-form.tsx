'use client';

import { addProduct } from '@/app/admin/products/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRef } from 'react';

export default function AddProductForm() {
    const formRef = useRef<HTMLFormElement>(null);

    async function handleAddProduct(formData: FormData) {
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const category = formData.get('category') as 'men' | 'women' | 'accessories';
        const imageUrl = formData.get('imageUrl') as string;
        const size = formData.get('size') as string;
        const stock = parseInt(formData.get('stock') as string);
        const dataAiHint = formData.get('dataAiHint') as string | undefined;

        if (!name || !description || !price || !category || !imageUrl || !size || !stock) {
            return;
        }

        const result = await addProduct({ name, description, price, category, imageUrl, dataAiHint, size, stock });
        if (result.success) {
            formRef.current?.reset();
        } else {
            // Handle error, e.g. show a toast
        }
    }

    return (
        <form ref={formRef} action={handleAddProduct} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" placeholder="e.g. Silk Scarf" required suppressHydrationWarning />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" step="0.01" placeholder="e.g. 49.99" required suppressHydrationWarning />
                </div>
             </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="e.g. A finely crafted silk scarf..." required suppressHydrationWarning />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                        <SelectTrigger suppressHydrationWarning>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="women">Women</SelectItem>
                            <SelectItem value="men">Men</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <Input id="size" name="size" placeholder="e.g. One Size, Large" required suppressHydrationWarning />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" name="stock" type="number" placeholder="e.g. 100" required suppressHydrationWarning />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/600x800.png" required suppressHydrationWarning />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dataAiHint">AI Hint (optional)</Label>
                    <Input id="dataAiHint" name="dataAiHint" placeholder="e.g. product photo" suppressHydrationWarning />
                </div>
             </div>
            <Button type="submit" suppressHydrationWarning>Add Product</Button>
        </form>
    );
}
