import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ProductList({ products }: { products: Product[] }) {
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
