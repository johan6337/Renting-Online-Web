import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import StarRating from '../components/comments/StarRating';
import CommentList from '../components/comments/CommentList';
import ProductList from '../components/product_list/ProductList';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams();
    
    // Sample product data - In real app, fetch from API using productId
    const product = {
        id: productId,
        name: "Gradient Graphic T-shirt",
        price: 145,
        sale: 20,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    };
    
    const details = {
        description: "This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
        colors: [
            { name: "Olive", hex: "#4F7942" },
            { name: "Navy", hex: "#2D3E50" },
            { name: "Black", hex: "#000000" }
        ],
        sizes: ["Small", "Medium", "Large", "X-Large"],
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
            }
        ],
        other_products: [
            {
                name: "Polo with Tipping Details",
                price: 180,
                image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
                sale: 0
            },
            {
                name: "Black Striped T-shirt",
                price: 150,
                image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
                sale: 30
            }
        ]
    };
    
    let originalPrice = parseFloat(product.price.replace('$', '')).toFixed(2);

    const finalPrice = useMemo(() => {
        if (!product.sale || product.sale <= 0)
            return originalPrice;
        return (originalPrice * (1 - product.sale / 100)).toFixed(2);
    }, [product.sale, originalPrice]);

    // State để quản lý các lựa chọn của người dùng
    const [selectedColor, setSelectedColor] = useState(details.colors[0]);
    const [selectedSize, setSelectedSize] = useState('Large'); 
    const [quantity, setQuantity] = useState(1);
    
    // Hàm xử lý tăng/giảm số lượng
    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount)); 
    };
    
    const sections = ["Product Details", "Rating & Reviews", "FAQs"];
    const [selectedSection, setSection] = useState(sections[0]);

    const renderSectionContent = () => {
        switch (selectedSection) {
            case "Product Details":
                return <div className='p-5 text-gray-600'>{details.description}</div>;
            case "Rating & Reviews":
                return <CommentList comments={details.comments}/>;
            case "FAQs":
                return <div className='p-5 text-gray-600'>No FAQs available.</div>;
        }
    }

    const updateProduct = (quantity) => {
        product.quantity = quantity;
    }
    
    return (
        <div className='h-screen'>
            <Header />
            <div className='flex flex-col md:flex-row md:mb-10'>
                {/* Hình ảnh sản phẩm */}
                <div className='flex-[2] grid grid-cols-3 grid-rows-3 gap-3 ml-5 md:ml-10 mr-5 md:mt-20 md:flex-1'>
                    {/* Các item còn lại sẽ tự động lấp vào các ô trống */}
                    <div className='bg-green-400 rounded-lg flex items-center justify-center'>B</div>
                    <div className='col-span-2 row-span-3 bg-blue-400 rounded-lg flex items-center justify-center'>
                        <img src={product.image} alt={product.name} className='object-cover h-full w-full rounded-lg'/>
                    </div>
                    <div className='bg-green-400 rounded-lg flex items-center justify-center'>C</div>
                    <div className='bg-green-400 rounded-lg flex items-center justify-center'>D</div>
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
                        {details ? details.description : "No details provided for this product."} {/*Cần đặt limit cho số chữ vừa khít 2 dòng*/}
                    </div>
                    
                    <div className='border-t-2 border-t-gray-200 w-full h-0'></div>
                    
                    {/* --- Phần chọn màu sắc --- */}
                    <div className="p-2 flex flex-col gap-3">
                        <h3 className="font-semibold text-gray-800">Select Colors</h3>
                        <div className="flex items-center gap-3">
                            {details.colors.map((color) => (
                                <button
                                    key={color.hex}
                                    onClick={() => setSelectedColor(color)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110"
                                    style={{ backgroundColor: color.hex }}
                                    aria-label={`Select color ${color.name}`}
                                >
                                    {/* Dấu check sẽ hiện khi màu được chọn */}
                                    {selectedColor.hex === color.hex && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- Phần chọn kích cỡ --- */}
                    <div className="p-2 flex flex-col gap-3">
                        <h3 className="font-semibold text-gray-800">Choose Size</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                            {details.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors duration-200
                                        ${selectedSize === size
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`
                                    }
                                >
                                    {size}
                                </button>
                            ))}
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

            <div className='flex flex-row mb-5 md:ml-10 md:mr-10'>
                {sections.map((title) => (
                    <button key={title} onClick={() => setSection(title)} className={`flex-1 border-b-2
                ${selectedSection === title ? 'text-black border-b-black' : 'text-gray-500 border-b-gray-100 '} hover:border-b-black p-3  hover:text-black`}>
                    {title}</button>
                ))}
            </div>
            
            {/* Section Selection */}
            <div className='flex items-center'>
                {renderSectionContent()}
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

            <Footer />
        </div>
    )
}

export default ProductDetails;