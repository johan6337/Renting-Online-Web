import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import StarRating from '../components/comments/StarRating';
import CommentList from '../components/comments/CommentList';
import ProductList from '../components/product_list/ProductList';
import MessagePopup from '../components/common/MessagePopup';
import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    
    // Sample product data - In real app, fetch from API using productId
    const product = {
        id: productId,
        name: "Gradient Graphic T-shirt",
        price: 145,
        sale: 20,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop"
        ]
    };
    
    const details = {
        description: "This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
        category: "Clothes",
        location: "Ha Noi",
        comments: [
            {
                rating: 4.5,
                name: "Samantha D.",
                verified: true,
                comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable.",
                date: "August 14, 2023"
            },
            {
                rating: 4,
                name: "Alex M.",
                verified: true,
                comment: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch.",
                date: "August 15, 2023"
            },
            {
                rating: 5,
                name: "Emma W.",
                verified: true,
                comment: "Perfect fit and amazing quality! Will definitely buy more from this seller.",
                date: "August 16, 2023"
            },
            {
                rating: 3,
                name: "John D.",
                verified: false,
                comment: "Good product but the delivery took longer than expected.",
                date: "August 17, 2023"
            },
            {
                rating: 5,
                name: "Sarah L.",
                verified: true,
                comment: "Absolutely love it! The material is soft and the design is exactly as shown.",
                date: "August 18, 2023"
            },
            {
                rating: 4,
                name: "Michael R.",
                verified: true,
                comment: "Great quality shirt. Highly recommend!",
                date: "August 19, 2023"
            }
        ],
        seller: {
            id: 101,
            name: "Fashion Store",
            avatar: "https://ui-avatars.com/api/?name=Fashion+Store&background=random",
            rating: 4.8,
            totalOrders: 1250
        },
        other_products: [
            {
                id: 21,
                name: "Polo with Tipping Details",
                price: 180,
                image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
                sale: 0
            },
            {
                id: 22,
                name: "Black Striped T-shirt",
                price: 150,
                image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
                sale: 30
            }
        ]
    };
    
    let originalPrice = product.price.toFixed(2);

    const finalPrice = useMemo(() => {
        if (!product.sale || product.sale <= 0)
            return originalPrice;
        return (originalPrice * (1 - product.sale / 100)).toFixed(2);
    }, [product.sale, originalPrice]);

    // State để quản lý số lượng và popup
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
    // Hàm xử lý tăng/giảm số lượng
    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount)); 
    };

    const updateProduct = (quantity) => {
        product.quantity = quantity;
        setShowPopup(true);
    }
    
    return (
        <div className='h-screen'>
            <Header />
            <div className='flex flex-col md:flex-row md:mb-10'>
                {/* Hình ảnh sản phẩm với Swiper */}
                <div className='flex-[2] flex flex-col md:flex-row gap-3 ml-5 md:ml-10 mr-5 md:mt-20 md:flex-1'>
                    {/* Thumbnail Images - Left side on desktop, bottom on mobile */}
                    <div className='order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px]'>
                        {product.images && product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                                    selectedImageIndex === index 
                                        ? 'border-black shadow-lg' 
                                        : 'border-gray-200 hover:border-gray-400'
                                }`}
                            >
                                <img 
                                    src={img} 
                                    alt={`${product.name} ${index + 1}`}
                                    className='w-full h-full object-cover'
                                />
                            </button>
                        ))}
                    </div>
                    
                    {/* Main Image */}
                    <div className='order-1 md:order-2 flex-1 relative bg-gray-100 rounded-lg overflow-hidden'>
                        <img 
                            src={product.images ? product.images[selectedImageIndex] : product.image} 
                            alt={product.name}
                            className='w-full h-full object-cover min-h-[400px] md:min-h-[500px]'
                        />
                        
                        {/* Navigation Arrows for mobile */}
                        {product.images && product.images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setSelectedImageIndex(prev => 
                                        prev === 0 ? product.images.length - 1 : prev - 1
                                    )}
                                    className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg md:hidden'
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setSelectedImageIndex(prev => 
                                        prev === product.images.length - 1 ? 0 : prev + 1
                                    )}
                                    className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg md:hidden'
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                        
                        {/* Image counter */}
                        <div className='absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm'>
                            {selectedImageIndex + 1} / {product.images ? product.images.length : 1}
                        </div>
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className='flex-[1] flex flex-col gap-3 mt-5 md:mt-20 md:mr-10'>
                    <h2 className="p-2 line-clamp-3 break-words text-3xl md:text-4xl font-bold overflow-hidden">{product.name}</h2>
                    <div className="px-2 py-2 pt-0 pb-0"><StarRating modeRate={false}/></div>
                    <div className="flex justify-start items-center p-2 text-3xl md:text-4xl font-bold">
                        ${product.sale ? (
                            <div className="flex justify-start items-center gap-3">
                                {finalPrice} {' '}
                                <span className='line-through text-gray-300'>${originalPrice}</span>
                                <span>
                                    <button className='rounded-3xl cursor-default pl-4 pr-4 pt-1 pb-1 text-base md:text-lg bg-red-100 text-red-400'>-{product.sale}%</button>
                                </span>
                            </div>
                        ) : originalPrice}
                    </div>
                    <div className='p-2 text-sm md:text-base text-gray-500'>
                        {details ? details.description : "No details provided for this product."}
                    </div>
                    
                    <div className='border-t-2 border-t-gray-200 w-full h-0'></div>
                    
                    {/* --- Product Information --- */}
                    <div className="p-2 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="font-semibold text-gray-800">Category:</span>
                            <span className="text-gray-600">{details.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-semibold text-gray-800">Location:</span>
                            <span className="text-gray-600">{details.location}</span>
                        </div>
                    </div>

                    {/* --- Phần chọn số lượng và nút Add to Cart --- */}
                    <div className="p-2 flex items-center gap-4 mt-4">
                        {/* Bộ đếm số lượng */}
                        <div className="flex items-center justify-between gap-4 bg-gray-100 rounded-full px-4 py-3">
                            <button onClick={() => handleQuantityChange(-1)} className="text-xl font-bold text-gray-600 disabled:opacity-50" disabled={quantity === 1}>-</button>
                            <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)} className="text-xl font-bold text-gray-600">+</button>
                        </div>

                        {/* Nút Add to Cart */}
                        <button className="flex-1 bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors"
                            onClick={() => updateProduct(quantity)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Seller Information Section */}
            <div className='mx-5 md:mx-10 mb-10'>
                <h2 className='text-2xl md:text-3xl font-bold mb-5'>Seller Information</h2>
                <div className='bg-gray-50 p-6 rounded-lg'>
                    <div className='flex items-center gap-4'>
                        <img 
                            src={details.seller.avatar} 
                            alt={details.seller.name}
                            className='w-20 h-20 rounded-full object-cover border-2 border-gray-300'
                        />
                        <div className='flex-1'>
                            <h3 className='text-xl font-semibold text-gray-900'>{details.seller.name}</h3>
                            <div className='flex items-center gap-4 mt-2'>
                                <div className='flex items-center gap-1'>
                                    <StarRating modeRate={false} displayRate={details.seller.rating} showRatingText={true} />
                                </div>
                                <div className='text-gray-600'>
                                    <span className='font-semibold'>{details.seller.totalOrders}</span> orders completed
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Rating & Reviews Section */}
            <div className='mx-5 md:mx-10 mb-10'>
                <h2 className='text-2xl md:text-3xl font-bold mb-5'>Rating & Reviews</h2>
                <CommentList comments={details.comments}/>
            </div>
            
            {/* More Products */}
            <div className='mt-10 ml-5 md:ml-10 mr-5 md:mr-10'>
                <div className='flex justify-center items-center mb-10'>
                    <h1 className='text-3xl md:text-4xl font-black'>You might also like</h1>
                </div>

                <div className='mb-20'>
                    <ProductList View='horizontal' Products={details.other_products} modeRate={false}/>
                </div>

            </div>

            {/* Cart Confirmation Popup */}
            <MessagePopup
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                title="Added to Cart!"
                message={`${product.name} has been added to your cart.`}
                icon="success"
                primaryButton={{
                    label: "Go to Cart",
                    onClick: () => {
                        setShowPopup(false);
                        navigate('/cart');
                    }
                }}
                secondaryButton={{
                    label: "Continue Shopping",
                    onClick: () => setShowPopup(false)
                }}
            />

            <Footer />
        </div>
    )
}

export default ProductDetails;