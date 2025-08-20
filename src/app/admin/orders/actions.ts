'use server';

import { addDoc, collection, serverTimestamp, getDocs, query, orderBy, doc, updateDoc, Timestamp, runTransaction, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Order, CartItem, OrderStatus, Product } from '@/lib/types';
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
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt as Timestamp;
        return {
            id: doc.id,
            ...data,
            // Convert timestamp to a serializable format (ISO string)
            createdAt: createdAt ? createdAt.toDate().toISOString() : new Date().toISOString(),
        } as Order;
    });
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
        if (status === 'confirmed') {
            // Use a transaction to ensure atomicity
            await runTransaction(db, async (transaction) => {
                const orderRef = doc(db, 'orders', orderId);
                const orderSnap = await transaction.get(orderRef);

                if (!orderSnap.exists()) {
                    throw new Error("Order does not exist!");
                }

                const orderData = orderSnap.data() as Order;
                
                // Prevent re-confirming and re-deducting stock
                if (orderData.status === 'confirmed') {
                    console.log("Order is already confirmed. No action taken.");
                    return;
                }

                // Deduct stock for each item in the order
                for (const item of orderData.items) {
                    const productRef = doc(db, 'products', item.productId);
                    const productSnap = await transaction.get(productRef);

                    if (!productSnap.exists()) {
                        throw new Error(`Product with ID ${item.productId} not found!`);
                    }

                    const productData = productSnap.data() as Product;
                    const sizes = productData.sizes;
                    const sizeIndex = sizes.findIndex(s => s.size === item.size);

                    if (sizeIndex === -1) {
                        throw new Error(`Size ${item.size} for product ${item.name} not found!`);
                    }

                    const currentStock = sizes[sizeIndex].stock;
                    if (currentStock < item.quantity) {
                        throw new Error(`Not enough stock for ${item.name} (Size: ${item.size}). Available: ${currentStock}, Requested: ${item.quantity}`);
                    }

                    sizes[sizeIndex].stock -= item.quantity;
                    transaction.update(productRef, { sizes });
                }

                // Finally, update the order status
                transaction.update(orderRef, { status: 'confirmed' });
            });

        } else {
            // For any other status, just update the status
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, { status });
        }

        revalidatePath('/admin/orders');
        revalidatePath('/admin'); // Revalidate dashboard to update stock counts
        return { success: true };

    } catch (e) {
        console.error("Error updating order status: ", e);
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        return { success: false, error: `Failed to update status: ${errorMessage}` };
    }
}