import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useState } from 'react';

const CartPage = ({ cartContent, onBack, onLoginClick, onSignUpClick, onForgotPasswordClick, onProfileClick, onAdminClick, onCartClick}) => {
    const { items, totalPrice } = cartContent;

    // Hard code quantity cho items
    items.forEach(item => {
        if (!item.quantity) {
            item.quantity = 1;
        }
    })

    const cols = items.properties ? Math.ceil(Object.keys(items.properties).length / 2) : 1;
    const countItems = items.length;

    const [itemList, setItemList] = useState(items);


    
    const handleChangeQuantity = (itemID, ammount) => {
        setItemList(currentList => {
            return currentList.map(item => {
                // Return original item if not the one to update
                if (item.id !== itemID) return item;

                // Update quantity for the matching item
                const newQuantity = Math.max(1, item.quantity + ammount);
                return {
                    ...item,
                    quantity: newQuantity
                };
            })
        })
    }
    
    return (
        <div className=''>
            <Header onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} onProfileClick={onProfileClick} onAdminClick={onAdminClick} onCartClick={onCartClick}/>
            <div className='flex flex-col gap-4 ml-4 md:ml-16 mr-4 md:mr-16 my-8'>
                <h1 className='text-4xl font-black'>Your Cart</h1>
                <div className='flex flex-row gap-4'>
                    {/* Cart items will be displayed here */}
                    <div className='flex-1 border-2 border-gray-200 rounded-xl'>
                        {itemList.map((item, index) => (
                            <>
                                <div key={item.id ?? index} className='flex flex-row relative gap-2 m-4'>
                                    {/* Item Image */}
                                    <div className='flex items-center'>
                                        <img src={item.image} alt={item.name} className='w-28 h-28 rounded-xl object-cover'/>
                                    </div>

                                    {/* Item Info */}
                                    <div className='flex flex-col relative'>
                                        <h2 className='text-base md:text-xl font-bold'>{item.name}</h2>
                                        {item.properties && (
                                            <div className={`grid grid-flow-col grid-rows-2 grid-cols-${cols} items-start gap-x-4`}>
                                                {Object.entries(item.properties).map(([key, value]) => (
                                                    <div key={key}>
                                                        <span className='text-sm text-black'>{key.slice(0, 1).toUpperCase() + key.slice(1,)}: </span>
                                                        <span className='text-sm text-gray-700'>{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <span className='text-xl font-bold text-black absolute bottom-0'>{item.price}</span>
                                    </div>
                                    
                                    {/* More Interactions */}
                                    <div className='h-full absolute right-0 flex flex-col justify-between'>
                                        {/* Remove Item From Cart */}
                                        <button className='flex flex-row justify-end'>
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                viewBox="0 0 24 24" 
                                                fill="currentColor" 
                                                // Add your Tailwind classes here
                                                className="w-5 h-5 text-red-500 hover:text-red-700"
                                            >
                                                <path 
                                                fillRule="evenodd" 
                                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zM6.115 6.103a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75zm6.75 0a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75zm-3.375 0a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75z" 
                                                clipRule="evenodd" 
                                                />
                                            </svg>
                                            </button>

                                        {/* Quantity Selector */}
                                        <div className="flex items-stretch bg-gray-100 overflow-hidden rounded-full px-2 md:px-4 py-1 md:py-3">
                                            <button className='flex-1 flex justify-center items-center text-xl font-bold px-2 md:px-1 py-0 md:py-0' onClick={() => handleChangeQuantity(item.id, +1)}>+</button>
                                            <span className='font-bold text-base md:text-lg px-2'>{item.quantity}</span>
                                            <button className='flex-1 flex justify-center items-center text-xl font-bold px-2 md:px-1 py-0 md:py-0 disabled:opacity-50' onClick={() => handleChangeQuantity(item.id, -1)} disabled={item.quantity === 1} >-</button>
                                        </div>
                                    </div>
                                </div>
                                {index < countItems - 1 && (
                                    <hr className='border-t-2 border-gray-100 mx-4' />
                                )}
                            </>
                        ))}
                    </div>

                    {/* Summary and Checkout */}
                    <div className='flex-1 bg-green-300'>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CartPage;