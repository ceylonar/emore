'use client';

import type { Order, OrderStatus } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { updateOrderStatus } from "./actions";

function formatOrderId(orderId: string) {
    return `#${orderId.split('-').pop()}`;
}

const statusColors: Record<OrderStatus, string> = {
    pending: "bg-yellow-400/20 text-yellow-700 border-yellow-400/30",
    confirmed: "bg-blue-400/20 text-blue-700 border-blue-400/30",
    shipped: "bg-purple-400/20 text-purple-700 border-purple-400/30",
    delivered: "bg-green-400/20 text-green-700 border-green-400/30",
    cancelled: "bg-red-400/20 text-red-700 border-red-400/30",
};

export default function OrderList({ orders }: { orders: Order[] }) {
    if (orders.length === 0) {
        return (
            <Card className="mt-8 text-center text-muted-foreground p-12">
                <p>No orders have been received yet.</p>
            </Card>
        )
    }

    const handleStatusChange = async (orderId: string, status: OrderStatus) => {
        await updateOrderStatus(orderId, status);
    };

    return (
        <Card className="mt-8">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{formatOrderId(order.orderId)}</TableCell>
                            <TableCell>{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell>LKR {order.totalPrice.toFixed(2)}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={statusColors[order.status]}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onSelect={() => handleStatusChange(order.id, 'confirmed')}>Mark as Confirmed</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleStatusChange(order.id, 'shipped')}>Mark as Shipped</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleStatusChange(order.id, 'delivered')}>Mark as Delivered</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleStatusChange(order.id, 'cancelled')} className="text-destructive">Cancel Order</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}
