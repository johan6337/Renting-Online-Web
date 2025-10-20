import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ProductDetails from './pages/ProductDetails'
import './main.css'

const sampleComments = [
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

const sampleOrders = [
  {
    orderNumber: "ORD-2025-0324",
    placedDate: "September 15, 2025",
    status: "Active",
    items: [
      {
        productId: "PRD-001",
        name: "Checkered Shirt",
        size: "Medium",
        color: "Red",
        rentalPeriod: "7 days",
        price: 180,
        imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop"
      },
      {
        productId: "PRD-002",
        name: "Skinny Fit Jeans",
        size: "Large",
        color: "Blue",
        rentalPeriod: "7 days",
        price: 240,
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"
      }
    ],
    totalAmount: 467,
    subtotal: 420,
    tax: 47,
    shippingAddress: {
      name: "John Doe",
      address: "123 Fashion Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1 (555) 123-4567"
    },
    timeline: [
      {
        title: "Order Placed",
        date: "September 15, 2025 - 10:30 AM",
        completed: true,
        description: "Your order has been confirmed"
      },
      {
        title: "Processing",
        date: "September 15, 2025 - 2:45 PM",
        completed: true,
        description: "Items are being prepared for shipment"
      },
      {
        title: "Shipped",
        date: "September 16, 2025 - 9:00 AM",
        completed: true,
        description: "Package is on the way. Tracking: TRK123456789"
      },
      {
        title: "Delivered",
        date: "Expected: September 17, 2025",
        completed: false,
        description: "Estimated delivery time"
      }
    ]
  },
  {
    orderNumber: "ORD-2025-0298",
    placedDate: "September 8, 2025",
    status: "Completed",
    items: [
      {
        productId: "PRD-003",
        name: "Gradient Graphic T-shirt",
        size: "Large",
        color: "Multi",
        rentalPeriod: "3 days",
        price: 145,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
      }
    ],
    totalAmount: 145,
    subtotal: 145,
    shippingAddress: {
      name: "John Doe",
      address: "123 Fashion Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1 (555) 123-4567"
    },
    timeline: [
      {
        title: "Order Placed",
        date: "September 8, 2025",
        completed: true
      },
      {
        title: "Shipped",
        date: "September 9, 2025",
        completed: true
      },
      {
        title: "Delivered",
        date: "September 10, 2025",
        completed: true
      },
      {
        title: "Returned",
        date: "September 13, 2025",
        completed: true,
        description: "Item successfully returned"
      }
    ]
  },
  {
    orderNumber: "ORD-2025-0267",
    placedDate: "August 28, 2025",
    status: "Completed",
    items: [
      {
        productId: "PRD-004",
        name: "Sleeve Striped T-shirt",
        size: "Medium",
        color: "White/Black",
        rentalPeriod: "5 days",
        price: 130,
        imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop"
      },
      {
        productId: "PRD-005",
        name: "Loose Fit Bermuda Shorts",
        size: "Large",
        color: "Khaki",
        rentalPeriod: "5 days",
        price: 80,
        imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop"
      }
    ],
    totalAmount: 225,
    subtotal: 210,
    tax: 15,
    discount: 20,
    shippingAddress: {
      name: "John Doe",
      address: "123 Fashion Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1 (555) 123-4567"
    },
    timeline: [
      {
        title: "Order Placed",
        date: "August 28, 2025",
        completed: true
      },
      {
        title: "Shipped",
        date: "August 29, 2025",
        completed: true
      },
      {
        title: "Delivered",
        date: "August 30, 2025",
        completed: true
      },
      {
        title: "Returned",
        date: "September 5, 2025",
        completed: true
      }
    ]
  },
  {
    orderNumber: "ORD-2025-0201",
    placedDate: "August 15, 2025",
    status: "Returned",
    items: [
      {
        productId: "PRD-006",
        name: "Polo with Contrast Trims",
        size: "Medium",
        color: "Navy",
        rentalPeriod: "7 days",
        price: 195,
        imageUrl: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop"
      },
      {
        productId: "PRD-007",
        name: "Black Striped T-shirt",
        size: "Large",
        color: "Black",
        rentalPeriod: "7 days",
        price: 120,
        imageUrl: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400&h=400&fit=crop"
      }
    ],
    totalAmount: 315,
    subtotal: 315,
    shippingAddress: {
      name: "John Doe",
      address: "123 Fashion Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1 (555) 123-4567"
    },
    timeline: [
      {
        title: "Order Placed",
        date: "August 15, 2025",
        completed: true
      },
      {
        title: "Shipped",
        date: "August 16, 2025",
        completed: true
      },
      {
        title: "Delivered",
        date: "August 17, 2025",
        completed: true
      },
      {
        title: "Returned",
        date: "August 24, 2025",
        completed: true,
        description: "All items returned in good condition"
      }
    ]
  },
  {
    orderNumber: "ORD-2025-0156",
    placedDate: "July 30, 2025",
    status: "Completed",
    items: [
      {
        productId: "PRD-008",
        name: "Vertical Striped Shirt",
        size: "Large",
        color: "Blue/White",
        rentalPeriod: "5 days",
        price: 155,
        imageUrl: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=400&fit=crop"
      },
      {
        productId: "PRD-009",
        name: "Casual Chinos",
        size: "34",
        color: "Beige",
        rentalPeriod: "5 days",
        price: 185,
        imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop"
      }
    ],
    totalAmount: 367,
    subtotal: 340,
    tax: 27,
    discount: 30,
    shippingAddress: {
      name: "John Doe",
      address: "123 Fashion Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1 (555) 123-4567"
    },
    timeline: [
      {
        title: "Order Placed",
        date: "July 30, 2025",
        completed: true
      },
      {
        title: "Shipped",
        date: "July 31, 2025",
        completed: true
      },
      {
        title: "Delivered",
        date: "August 1, 2025",
        completed: true
      },
      {
        title: "Returned",
        date: "August 6, 2025",
        completed: true
      }
    ]
  },
  {
    orderNumber: "ORD-2025-0089",
    placedDate: "July 10, 2025",
    status: "Completed",
    items: [
      {
        productId: "PRD-010",
        name: "Courage Graphic T-shirt",
        size: "Medium",
        color: "Orange",
        rentalPeriod: "3 days",
        price: 125,
        imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop"
      }
    ],
    totalAmount: 125,
    subtotal: 125,
    shippingAddress: {
      name: "John Doe",
      address: "123 Fashion Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1 (555) 123-4567"
    },
    timeline: [
      {
        title: "Order Placed",
        date: "July 10, 2025",
        completed: true
      },
      {
        title: "Shipped",
        date: "July 11, 2025",
        completed: true
      },
      {
        title: "Delivered",
        date: "July 12, 2025",
        completed: true
      },
      {
        title: "Returned",
        date: "July 15, 2025",
        completed: true
      }
    ]
  }
];

const sampleProducts = [
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
];


const sampleProfile = {
  userInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: 'January 15, 1990',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  },
  stats: [
    { label: 'Total Rentals', value: '24', color: 'text-orange-500' },
    { label: 'Hours Used', value: '12', color: 'text-yellow-500' },
    { label: 'Rating', value: '4.8', color: 'text-green-500' },
    { label: 'Member Since', value: '6 Months', color: 'text-blue-500' }
  ],
  activities: [
    {
      type: 'Rental Completed',
      description: 'MacBook Air Completed - Returned on Oct 1, 2025',
      time: '1 day ago',
      status: 'completed',
      color: 'bg-green-100 text-green-800'
    },
    {
      type: 'New Rental',
      description: 'Samsung Tab - Rented for 7 days',
      time: '3 days ago',
      status: 'active',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      type: 'Review Received',
      description: 'You received a review for Apple',
      time: '1 week ago',
      status: 'review',
      color: 'bg-yellow-100 text-yellow-800'
    }
  ]
};

const sampleAdminData = {
  stats: [
    { label: 'Total Users', value: '1,234', color: 'bg-blue-500' },
    { label: 'Active Users', value: '1,189', color: 'bg-green-500' },
    { label: 'Suspended', value: '32', color: 'bg-orange-500' },
    { label: 'Pending Verification', value: '13', color: 'bg-purple-500' }
  ],
  users: [
    {
      id: '#10234',
      name: 'John Anderson',
      email: 'john.anderson@gmail.com',
      phone: '+1 234-567-8901',
      joinDate: 'Jan 15, 2025',
      rentals: 12,
      status: 'Active'
    },
    {
      id: '#10233',
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@gmail.com',
      phone: '+1 234-567-8902',
      joinDate: 'Jan 14, 2025',
      rentals: 8,
      status: 'Active'
    },
    {
      id: '#10232',
      name: 'Michael Chen',
      email: 'michael.chen@gmail.com',
      phone: '+1 234-567-8903',
      joinDate: 'Jan 13, 2025',
      rentals: 5,
      status: 'Suspended'
    },
    {
      id: '#10231',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@gmail.com',
      phone: '+1 234-567-8904',
      joinDate: 'Jan 12, 2025',
      rentals: 15,
      status: 'Active'
    },
    {
      id: '#10230',
      name: 'David Thompson',
      email: 'david.thompson@gmail.com',
      phone: '+1 234-567-8905',
      joinDate: 'Jan 11, 2025',
      rentals: 3,
      status: 'Pending'
    },
    {
      id: '#10229',
      name: 'Lisa Parker',
      email: 'lisa.parker@gmail.com',
      phone: '+1 234-567-8906',
      joinDate: 'Jan 10, 2025',
      rentals: 20,
      status: 'Active'
    }
  ]
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App 
      sampleComments={sampleComments} 
      sampleOrders={sampleOrders} 
      sampleProducts={sampleProducts} 
      sampleProfile={sampleProfile}
      sampleAdminData={sampleAdminData}
    /> */}
    <ProductDetails product={sampleProducts[0]} details={{description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."}}/>
  </StrictMode>,
)
