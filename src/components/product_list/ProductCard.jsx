import StarRating from "../comments/StarRating"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

function ProductCard({ product, modeRate=true, view }) {
    const navigate = useNavigate();

    let originalPrice = product.price.toFixed(2);

        const finalPrice = useMemo(() => {
            if (!product.sale || product.sale <= 0)
                return originalPrice;
            return (originalPrice * (1 - product.sale / 100)).toFixed(2);
        }, [product.sale, originalPrice]);

    const handleClick = () => {
        navigate(`/product/${product.id || 1}`);
    };

    return (
        <>
            <div 
                onClick={handleClick}
                className="rounded-lg h-full w-full
                transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 hover:cursor-pointer hover:ring-2 ring-gray-700" 
            >
                <div className="w-full h-48 flex items-center justify-center bg-gradient-to-b from-gray-300 to-gray-200 rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt="Product Image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="p-2 line-clamp-2 break-words text-[1.2rem] font-bold">{product.name}</h2>
                <div className="px-2 py-1"><StarRating modeRate={modeRate}/></div>
                <div className="flex justify-start items-center p-2 pt-0 text-lg md:text-2xl font-bold flex-wrap">
                    {product.sale ? (
                        <div className="flex justify-start items-center gap-2 flex-wrap">
                            <span>${finalPrice}</span>
                            {view === 'horizontal' && (
                                <span className='line-through text-gray-300 text-base md:text-xl'>${originalPrice}</span>
                            )}
                            <button className='rounded-3xl cursor-default px-3 py-1 text-sm md:text-base bg-red-100 text-red-400'>-{product.sale}%</button>
                        </div>
                    ) : (
                        <span>${originalPrice}</span>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductCard