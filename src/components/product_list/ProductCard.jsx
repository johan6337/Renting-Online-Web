import StarRating from "./StarRating"
import "./ProductCard.css"

function ProductCard({Name = "Product Name", Price = "$10", Image, modeRate=true}) {
    return (
        <>
            <div className="product-card">
                <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" 
                    alt="Product Image" />
                <h2>{Name}</h2>
                <StarRating modeRate={modeRate}/>
                <p>{Price}</p>
            </div>
        </>
    )
}

export default ProductCard