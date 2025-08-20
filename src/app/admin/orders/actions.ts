'use server';

import { addDoc, collection, serverTimestamp, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Order, CartItem, OrderStatus } from '@/lib/types';
import { revalidatePath } from 'next/cache';

interface OrderData {
    orderId: string;
    customerName: string;
    customerAddress: string;
    customerMobile: string;
    items: CartItem[];
    totalPrice: number;
    status: OrderStatus;
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt'>) {
    try {
        await addDoc(collection(db, 'orders'), {
            ...orderData,
            createdAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error("Error creating order:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return { success: false, error: errorMessage };
    }
}

export async function getOrders(): Promise<Order[]> {
    const ordersCollection = collection(db, 'orders');
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Order[];
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, { status });
        revalidatePath('/admin/orders');
        return { success: true };
    } catch (e) {
        console.error("Error updating order status: ", e);
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        return { success: false, error: `Failed to update status: ${errorMessage}` };
    }
}
