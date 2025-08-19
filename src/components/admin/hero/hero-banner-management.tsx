'use client';
import type { HeroBanner } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import AddBannerDialog from "@/components/admin/inventory/add-banner-dialog"
import { PlusCircle } from "lucide-react"

interface HeroBannerManagementProps {
  banners: HeroBanner[];
}

export default function HeroBannerManagement({ banners }: HeroBannerManagementProps) {
  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-headline">Hero Banners</h1>
                <p className="text-muted-foreground">Manage the banners in your homepage carousel.</p>
            </div>
            <Button onClick={() => setIsBannerDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Banner
            </Button>
        </div>
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
      <AddBannerDialog open={isBannerDialogOpen} onOpenChange={setIsBannerDialogOpen} />
    </div>
  )
}
