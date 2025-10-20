import StarRating from "../comments/StarRating"

function ProductCard({ product, modeRate=true }) {
    return (
        <>
            <div className="rounded-lg h-full w-full sm:w-[4/5] md:w-[3/4] lg:w-[5/6]
                transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 hover:cursor-pointer hover:ring-2 ring-gray-700">
                <div className="w-full h-48 flex items-center justify-center bg-gradient-to-b from-gray-300 to-gray-200 rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt="Product Image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="p-2 line-clamp-3 break-words text-[1.2rem] font-bold overflow-hidden">{product.name}</h2>
                <div className="px-2 py-2 pt-0 pb-0"><StarRating modeRate={modeRate}/></div>
                <p className="p-2">{product.price}</p>
            </div>
        </>
    )
}

export default ProductCard