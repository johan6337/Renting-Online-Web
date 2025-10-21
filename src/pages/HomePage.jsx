import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ProductList from '../components/product_list/ProductList';
import CommentList from '../components/comments/CommentList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState({
        recommend: 'horizontal',
        recent: 'horizontal'
    });

    const comments = [
        {
            rating: 4.5,
            name: "Samantha D.",
            verified: true,
            comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
            date: "August 14, 2023"
        },
        {
            rating: 4,
            name: "Alex M.",
            verified: true,
            comment: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
            date: "August 15, 2023"
        },
        {
            rating: 3.5,
            name: "Ethan R.",
            verified: true,
            comment: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
            date: "August 16, 2023"
        },
        {
            rating: 4,
            name: "Olivia P.",
            verified: true,
            comment: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
            date: "August 17, 2023"
        },
        {
            rating: 4,
            name: "Liam K.",
            verified: true,
            comment: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
            date: "August 18, 2023"
        },
        {
            rating: 4.5,
            name: "Ava H.",
            verified: true,
            comment: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
            date: "August 19, 2023"
        }
    ];

    const products = [
        {
            name: "Checkered Shirt",
            price: "$100",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
            sale: 20,
        },
        {
            name: "Denim Jacket",
            price: "$80",
            image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=400&q=80",
        },
        {
            name: "Wireless Headphones",
            price: "$120",
            image: "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=400&q=80",
        },
        {
            name: "Running Shoes",
            price: "$95",
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80",
        },
        {
            name: "Leather Wallet",
            price: "$40",
            image: "https://images.unsplash.com/photo-1657603644005-67891fcc1577?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
        },
        {
            name: "Smart Watch",
            price: "$199",
            image: "https://images.unsplash.com/photo-1664730021931-9abb25cb0852?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
        },
        {
            name: "Backpack",
            price: "$60",
            image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhY2twYWNrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=700"
        },
        {
            name: "Sunglasses",
            price: "$75",
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700"
        },
        {
            name: "Gaming Mouse",
            price: "$49",
            image: "https://images.unsplash.com/photo-1628832306751-ec751454119c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1545"
        },
        {
            name: "Bluetooth Speaker",
            price: "$89",
            image: "https://images.unsplash.com/photo-1754142927775-8f1e97ebd030?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374"
        }
    ]

    // const recommendRef = useRef(null);
    // const recentRef = useRef(null);

    // useEffect(() => {
    //     if (recommendRef.current) {
    //         recommendRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //     }
    // }, [viewMode.recommend])

    // useEffect(() => {
    //     if (recentRef.current) {
    //         recentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //     }
    // }, [viewMode.recent])

    const changeMode = (viewName) => {
        setViewMode(prev => ({
            ...prev,
            [viewName]: prev[viewName] === 'horizontal' ? 'vertical' : 'horizontal'
        }))
    }

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center">
                <div className="flex flex-col md:flex-row w-full max-w-6xl mx-2 sm:mx-4 md:mx-10 my-5 rounded-3xl bg-gray shadow-[4px_4px_3px_rgba(0,0,0,0.5)] ring-1 ring-gray-300">
                    <div className="flex flex-col flex-1 pt-8 md:pt-20 justify-start items-center">
                        <button className="h-16 w-40 md:h-20 md:w-56 relative mx-4 md:mx-20 my-4 px-2 py-2 bg-[#f4efef] rounded-2xl font-extrabold text-gray-900 
                            shadow-[-10px_8px_0_#333] transition-all duration-150 
                            hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[-5px_3px_0_#333] text-2xl md:text-4xl"
                            onClick={() => navigate('/product')}>
                            BORROWIT
                        </button>
                        <h1 className="mt-3 mb-6 md:mt-5 md:mb-10 px-4 md:px-10 py-2 text-xl md:text-3xl font-black text-center">
                            The platform that let you rent everything!
                        </h1>
                        <div className="flex justify-center items-center w-full mb-10">
                            <button className="text-base md:text-xl text-white font-bold w-3/4 md:w-1/2 pt-2 pb-2 rounded-lg border-4 border-transparent bg-black
                                hover:bg-white hover:border-4 hover:border-black hover:text-black transition-all duration-150"
                                onClick={() => navigate('/product')}>
                                Find Product Now
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center items-center mb-6 md:mb-20">
                        <img
                            className="w-full max-w-xs md:max-w-md h-48 md:h-3/4 object-cover rounded-3xl mr-0 md:mr-5"
                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="intro image"
                        />
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col content-center my-10'>
                <h1 className='font-black text-2xl md:text-4xl mb-10 text-center'>Newest Product</h1>
                <div className='ml-10 mr-10'>
                    <ProductList View={viewMode.recommend} Products={products} modeRate={false}/>
                </div>
                <div className='flex justify-center content-center mt-10'>
                    <button className='w-36 p-2 flex justify-center content-center
                            font-medium text-sm md:text-base text-black bg-white 
                            rounded-full border-2 border-gray-200
                            hover:scale-105 transition-transform duration-300 ease-in-out'
                            onClick={() => changeMode('recommend')}>
                        {viewMode.recommend === 'horizontal' ? 'View All' : 'View Less'}
                    </button>
                </div>
            </div>

            <div className='m-20 border border-t-gray-200'></div>
            
            <div className='w-full flex flex-col content-center my-10'>
                <h1 className='font-black text-2xl md:text-4xl mb-10 text-center'>Top-Selling Product</h1>
                <div className='ml-10 mr-10'>
                    <ProductList View={viewMode.recent} Products={products} modeRate={false}/>
                </div>
                <div className='flex justify-center content-center mt-10'>
                    <button className='w-36 p-2 flex justify-center content-center
                            font-medium text-sm md:text-base text-black bg-white 
                            rounded-full border-2 border-gray-200
                            hover:scale-105 transition-transform duration-300 ease-in-out'
                            onClick={() => changeMode('recent')}>
                        {viewMode.recent === 'horizontal' ? 'View All' : 'View Less'}
                    </button>
                </div>
            </div>
            <div className='m-20 border border-t-gray-200'></div>

            <h2 className="pl-9 md:pl-14 text-2xl md:text-4xl font-black mb-6">OUR HAPPY CUSTOMERS</h2>
            <CommentList comments={comments} totalReviews={comments.length} />

            <Footer />
        </div>
    )
}

export default HomePage;