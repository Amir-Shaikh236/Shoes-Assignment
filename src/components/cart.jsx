import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export default function Cart({ onClose, onCartUpdate }) {
    const [cartItems, setCartItems] = useState([]);

    const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const withQty = cart.map(item => ({ ...item, quantity: item.quantity || 1 }));
        setCartItems(withQty);
    }, []);

    const updateCart = (updatedCart) => {
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        if (onCartUpdate) onCartUpdate(updatedCart);
    }

    const removeItem = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        updateCart(updatedCart);
    };

    const addQuantity = (id) => {
        const newupdatedcart = cartItems.map((item) => item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
        updateCart(newupdatedcart);
    };
    const subtractQuantity = (id) => {
        const newupdatedcart = cartItems.map((item) => item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item).filter((item) => item.quantity > 0);
        updateCart(newupdatedcart);
    }


    return (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
            <div className="bg-white w-96 h-full p-4 shadow-xl animate-slide-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <Button variant="ghost" onClick={onClose}>✕</Button>
                </div>

                <div className="overflow-y-auto h-[80vh]">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">Your cart is empty 🛒</p>
                    ) : (
                        cartItems.map((item) => (
                            <Card key={item.id} className="mb-4">
                                <img src={item.image} alt={item.name} className="w-full h-35 object-cover rounded-t-lg" />
                                <CardHeader>
                                    <CardTitle>{item.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Plus className="h-4 w-4 cursor-pointer" onClick={() => addQuantity(item.id)} />
                                        <p className="text-md">{item.quantity}</p>
                                        <Minus className="h-4 w-4 cursor-pointer" onClick={() => subtractQuantity(item.id)} />
                                    </div>
                                    <p className="font-medium">Price: ₹{item.price * item.quantity}</p>
                                </CardContent>
                                <CardFooter className='w-full flex items-center justify-between'>
                                    <Button variant="destructive" size="lg" className='hover:cursor-pointer' onClick={() => removeItem(item.id)}> Remove </Button>
                                    <Button variant="outline" size="lg" className='hover:cursor-pointer'> Pay </Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
