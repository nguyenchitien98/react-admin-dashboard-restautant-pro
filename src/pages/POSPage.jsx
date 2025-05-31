import { useState, useRef } from 'react';
import {
  Coffee,
  ClipboardList,
  FileText,
  Truck,
  ShoppingBag,
  Home,
} from 'lucide-react';
import OrderSelection from './POS/OrderSelection';
// import HoldOrdersPanel from './POS/HoldOrdersPanel';
// import BillListPanel from './POS/BillListPanel';
// import KOTPanel from './POS/KOTPanel';
// import DeliveryMethodPanel from './POS/DeliveryMethodPanel';
// import TakeAwayPanel from './POS/TakeAwayPanel';

const tabs = [
  { key: 'menu', title: 'Chọn món', icon: Coffee },
  { key: 'hold', title: 'Tạm giữ', icon: ClipboardList },
  { key: 'bill', title: 'Hóa đơn', icon: FileText },
  { key: 'kot', title: 'KOT', icon: ClipboardList },
  { key: 'delivery', title: 'Giao hàng', icon: Truck },
  { key: 'takeaway', title: 'Mang đi', icon: ShoppingBag },
  { key: 'dinin', title: 'Tại quán', icon: Home },
];

export default function POSPage() {
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('menu');

  const contentRef = useRef(null);


  return (
    <div className="flex flex-col h-full p-4">
      {/* Sidebar Tabs */}
      <div className="flex space-x-4 mb-4 overflow-x-auto">
        {tabs.map(({ key, title, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex flex-col items-center px-3 py-2 rounded-xl transition ${
              activeTab === key
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{title}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="flex-1 bg-white rounded-xl shadow p-4 overflow-auto">
        {activeTab === 'menu' && (
          <OrderSelection cartItems={cartItems} setCartItems={setCartItems} />
        )}
        {/* {activeTab === 'hold' && <HoldOrdersPanel />}
        {activeTab === 'bill' && <BillListPanel />}
        {activeTab === 'kot' && <KOTPanel />}
        {activeTab === 'delivery' && <DeliveryMethodPanel />}
        {activeTab === 'takeaway' && <TakeAwayPanel />} */}
      </div>

      {/* Modal chọn bàn khi chọn Din In */}
      {/* {showDinInModal && <DinInModal onClose={() => setShowDinInModal(false)} />} */}
    
    </div>
  );
}
