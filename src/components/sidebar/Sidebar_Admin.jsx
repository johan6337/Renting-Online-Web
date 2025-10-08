import React from 'react'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Package, 
  ShoppingCart, 
  CreditCard 
} from 'lucide-react'

const Sidebar_Admin = ({ active = 'Dashboard' }) => {
  const items = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'User Management', icon: Users },
    { name: 'Reports', icon: FileText },
    { name: 'Products', icon: Package },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Payments', icon: CreditCard }
  ]

  return (
    <aside className="w-[280px] min-h-screen bg-[#0a0a0a] text-white px-4 py-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-3">
        <span className="text-xl font-bold tracking-wide">BORROWIT</span>
        <span className="bg-[#ff4757] text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl tracking-wide">
          ADMIN
        </span>
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col gap-1">
          {items.map(item => {
            const Icon = item.icon
            const isActive = item.name === active
            return (
              <li 
                key={item.name} 
                className={`
                  flex items-center gap-3.5 px-4 py-3.5 rounded-lg cursor-pointer
                  transition-all duration-200 text-[15px] font-medium
                  ${isActive 
                    ? 'bg-[#ff4757] text-white' 
                    : 'text-[#8e8e8e] hover:bg-[#1a1a1a] hover:text-white'
                  }
                `}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="flex-1">{item.name}</span>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar_Admin