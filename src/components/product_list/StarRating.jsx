import { FaStar } from "react-icons/fa"
import { useState, useEffect } from "react"
import './StarRating.css'

function StarRating({modeRate=true, displayRate=4}) {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    useEffect(() => {
        if (!modeRate) setRating(displayRate)    
    }, [modeRate, displayRate])

    return (
        <div className="container">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1
                return (
                    <label key={ratingValue}>
                        {modeRate && (
                            <input 
                                type="radio" 
                                name="rating" 
                                value={ratingValue} 
                                onClick={()=>setRating(ratingValue)}
                            />
                        )}
                        <FaStar 
                            color = {ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={modeRate ? ()=>setHover(ratingValue) : undefined}
                            onMouseLeave={modeRate ? ()=>setHover(null) : undefined}
                            style = {{cursor: modeRate ? "pointer" : "default"}}
                        />
                    </label>
                ) 
            })}
            <p className="rating">{rating}/5</p>
        </div>
    )
}

export default StarRating