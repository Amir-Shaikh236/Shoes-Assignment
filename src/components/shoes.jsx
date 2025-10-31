import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBasket } from "lucide-react";
import Cart from "./cart";
import { toast } from "sonner";
const shoes = [
    { id: 1, name: 'Nike', description: "Optimise your warm-up and recovery routines with the Hyperboot, a Nike x Hyperice collaboration. get and findout more...", price: 2500, size: ["S", "M", "L"], image: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/5dc83afa-3afb-40a4-940d-6d65e7cc89ef/TOTAL+90.png' },
    { id: 2, name: 'Puma', description: "Forever Faster is not just about speed. It's about strength, getting better every day, wanting to win... And that means it's about you.", price: 9500, size: ["S", "M", "L"], image: 'https://images.unsplash.com/photo-1545289414-1c3cb1c06238?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
    { id: 3, name: 'Adidas', description: "The lightweight adidas Agora shoes for men. These men's lightweight shoes have a locked-down fit and extreme shock absorption.", price: 20000, size: ["S", "M"], image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
    { id: 4, name: 'Jordan', description: "The lightweight adidas Agora shoes for men. These men's lightweight shoes have a locked-down fit and extreme shock absorption.", price: 22000, size: ["S", "M"], image: 'https://images.unsplash.com/photo-1610000750238-28d5e469692d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735' },
];

export default function Shoes() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const storedcart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(storedcart.length);
    }, [])

    const addToCart = (shoe) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!Array.isArray(cart)) {
            cart = [];
        }

        if (!cart.find((item) => item.id === shoe.id)) {
            cart.push({ ...shoe, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
            setCartCount(cart.length);
        } else {
            toast.warning('', {
                title: `${shoe.name} is already in the cart`,
                description: 'You can directly buy it from the cart'
            });
        }
    };

    return (
        <div className="">
            <ShoppingBasket onClick={() => setIsCartOpen(true)} className="absolute top-6 right-15 w-8 h-8 text-gray-700 hover:text-gray-900 cursor-pointer" /> {cartCount > 0 && <Badge variant="destructive" className="absolute top-5 right-14">{cartCount}</Badge>}
            <div className="min-h-screen flex flex-wrap items-center justify-center gap-4 p-4">
                {shoes.map((shoe) => (
                    <Card key={shoe.id} className='max-w-md w-80 overflow-hidden transition-transform duration-300 hover:scale-105'>
                        <img src={shoe.image} alt={shoe.name} className="w-full h-70 object-cover" />
                        <CardHeader>
                            <CardTitle className='text-2xl'> {shoe.name}</CardTitle>
                            <CardDescription> {shoe.description} </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-row gap-1 items-center"> Available Sizes: {shoe.size.map((s) => (
                                <Badge key={s} variant="outline">{s}</Badge>
                            ))}</div>
                        </CardContent>
                        <CardFooter className='flex items-center justify-between'>
                            <p> Price : Rs.{shoe.price}</p>
                            <Button variant="outline" onClick={() => addToCart(shoe)} className='hover:cursor-pointer'> Add to Cart </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} onCartUpdate={(updatedCart) => setCartCount(updatedCart.length)} />}
        </div >
    )
}