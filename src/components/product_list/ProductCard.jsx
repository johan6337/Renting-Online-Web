import StarRating from "../comments/StarRating"
import { useMemo } from "react"

function ProductCard({ product, modeRate=true, view }) {

    let originalPrice = parseFloat(product.price.replace('$', '')).toFixed(2);

        const finalPrice = useMemo(() => {
            if (!product.sale || product.sale <= 0)
                return originalPrice;
            return (originalPrice * (1 - product.sale / 100)).toFixed(2);
        }, [product.sale, originalPrice]);

    return (
        <>
            <div className="rounded-lg h-full w-full sm:w-[4/5] md:w-[3/4] lg:w-[5/6]
                transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 hover:cursor-pointer hover:ring-2 ring-gray-700 overflow-hidden" >
                <div className="w-full h-48 flex items-center justify-center bg-gradient-to-b from-gray-300 to-gray-200 rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt="Product Image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="p-2 line-clamp-3 break-words text-[1.2rem] font-bold overflow-hidden">{product.name}</h2>
                <div className="px-2 py-2 pt-0 pb-0"><StarRating modeRate={modeRate}/></div>
                <div className="flex justify-start items-center p-2 text-lg md:text-2xl font-bold">
                    ${product.sale ? (
                        <div className="flex justify-start items-center gap-3">
                            {finalPrice} {' '}
                            {view === 'horizontal' && (
                                <span className='line-through text-gray-300'>${originalPrice}</span>
                            )}
                            <span>
                                <button className='rounded-3xl cursor-default pl-4 pr-4 pt-1 pb-1 text-base md:text-lg bg-red-100 text-red-400'>-{product.sale}%</button>
                            </span>
                        </div>
                    ) : originalPrice}
                </div>
            </div>
        </>
    )
}

export default ProductCard