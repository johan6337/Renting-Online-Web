import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CommentCard from './components/comments/CommentCard'
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="space-y-4">
      <CommentCard 
        rating={4.5}
        name="Samantha D."
        verified={true}
        comment="I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
        date="August 14, 2023"
      />
      <CommentCard 
        rating={5}
        name="Alex M."
        verified={true}
        comment="The quality of this product exceeded my expectations! It's comfortable, stylish, and the material is top-notch. Highly recommend to anyone looking for great value."
        date="September 2, 2023"
      />
    </div>
  </StrictMode>,
)
