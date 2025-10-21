import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const CartPage = () => {
    return (
        <div>
            <Header />
            
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
                    <p className="text-gray-600">Your cart is empty</p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CartPage;