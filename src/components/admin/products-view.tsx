'use client';

import { addProduct } from '@/app/admin/products/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { useRef } from 'react';

function AddProductForm() {
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
                    <Input id="name" name="name" placeholder="e.g. Silk Scarf" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" step="0.01" placeholder="e.g. 49.99" required />
                </div>
             </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="e.g. A finely crafted silk scarf..." required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                        <SelectTrigger>
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
                    <Input id="size" name="size" placeholder="e.g. One Size, Large" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" name="stock" type="number" placeholder="e.g. 100" required />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/600x800.png" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dataAiHint">AI Hint (optional)</Label>
                    <Input id="dataAiHint" name="dataAiHint" placeholder="e.g. product photo" />
                </div>
             </div>
            <Button type="submit">Add Product</Button>
        </form>
    );
}

function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="mt-8">
             <h3 className="font-headline text-xl font-bold mb-4">Current Products</h3>
             <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="hidden md:table-cell">Price</TableHead>
                        <TableHead className="hidden md:table-cell">Stock</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt={product.name}
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={product.imageUrl}
                                    width="64"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="hidden md:table-cell">${product.price.toFixed(2)}</TableCell>
                            <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}

export default function ProductsView({ initialProducts }: { initialProducts: Product[] }) {
    return (
        <div className="grid gap-10">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                     <CardDescription>Fill out the form to add a new product to your inventory.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddProductForm />
                </CardContent>
            </Card>
            <ProductList products={initialProducts} />
        </div>
    );
}
