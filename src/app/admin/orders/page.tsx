import OrderList from "./order-list";
import { getOrders } from "./actions";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function OrderListSkeleton() {
    return (
        <Card className="mt-8">
            <CardHeader>
                <Skeleton className="h-6 w-1/4" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <Skeleton className="h-5 w-1/6" />
                            <Skeleton className="h-5 w-1/6" />
                            <Skeleton className="h-5 w-1/5" />
                            <Skeleton className="h-5 w-1/6" />
                            <Skeleton className="h-5 w-1/6" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default async function OrdersPage() {

    return (
        <div>
            <h1 className="font-headline text-3xl font-bold mb-2">Orders</h1>
            <p className="text-muted-foreground mb-8">View and manage customer orders.</p>
            <Suspense fallback={<OrderListSkeleton />}>
                <OrderLoader />
            </Suspense>
        </div>
    );
}

async function OrderLoader() {
    const orders = await getOrders();
    return <OrderList orders={orders} />;
}
