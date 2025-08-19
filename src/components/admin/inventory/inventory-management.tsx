import type { Product, HeroBanner } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface InventoryManagementProps {
  products: Product[];
  banners: HeroBanner[];
}

export default function InventoryManagement({ products, banners }: InventoryManagementProps) {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Inventory</h1>
            <p className="text-muted-foreground">Manage your products, hero banners, and their details.</p>
        </div>
      <Tabs defaultValue="products">
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="hero">Hero Banners</TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="products">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
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
                        data-ai-hint={product.dataAiHint}
                        />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>{product.size}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="hidden md:table-cell">${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                        <Button size="sm">Edit</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TabsContent>
        <TabsContent value="hero">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {banners.map((banner) => (
                    <TableRow key={banner.id}>
                    <TableCell className="hidden sm:table-cell">
                        <Image
                        alt={banner.title}
                        className="aspect-video rounded-md object-cover"
                        height="64"
                        src={banner.imageUrl}
                        width="128"
                        data-ai-hint={banner.dataAiHint}
                        />
                    </TableCell>
                    <TableCell className="font-medium">{banner.title}</TableCell>
                    <TableCell>
                        <Button size="sm">Edit</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}
