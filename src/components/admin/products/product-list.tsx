'use client';

import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EditProductDialog } from './edit-product-dialog';
import { deleteProduct } from '@/app/admin/products/actions';
import { Package, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function formatCategory(category: string) {
    return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

async function handleDelete(productId: string) {
    const result = await deleteProduct(productId);
    if (!result.success) {
        console.error(result.error);
        // Optionally show a toast notification on error
    }
}

export default function ProductList({ products }: { products: Product[] }) {
    const getTotalStock = (product: Product) => {
        if (!product.sizes) return 0;
        return product.sizes.reduce((total, size) => total + size.stock, 0);
    }
    
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
                        <TableHead className="hidden md:table-cell">Total Stock</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="hidden sm:table-cell">
                                {product.imageUrls && product.imageUrls.length > 0 ? (
                                    <Image
                                        alt={product.name}
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        src={product.imageUrls[0]}
                                        width="64"
                                    />
                                ) : (
                                    <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
                                        <Package className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{formatCategory(product.category)}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">${product.price.toFixed(2)}</TableCell>
                            <TableCell className="hidden md:table-cell">{getTotalStock(product)}</TableCell>
                             <TableCell>
                                <div className="flex justify-end gap-2">
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" suppressHydrationWarning>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this
                                            product.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-destructive hover:bg-destructive/90"
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <EditProductDialog product={product} />
                                </div>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
