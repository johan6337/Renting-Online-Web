import StarRating from "../comments/StarRating"

function ProductCard({Name = "Product Name", Price = "$10", Image, modeRate=true}) {
    return (
        <>
            <div className="rounded-lg h-full w-full sm:w-[4/5] md:w-[3/4] lg:w-[5/6]">
                <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" 
                    alt="Product Image" className="p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg bg-gradient-to-b from-gray-300  to-gray-200"/>
                <h2 className="p-2 line-clamp-3 break-words text-[1.2rem] font-bold overflow-hidden">{Name}</h2>
                <div className="px-2 py-2 pt-0 pb-0"><StarRating modeRate={modeRate}/></div>
                <p className="p-2">{Price}</p>
            </div>
        </>
    )
}

export default ProductCard