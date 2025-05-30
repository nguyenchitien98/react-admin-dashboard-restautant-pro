import { useState } from 'react';
import {
  Coffee,
  ShoppingCart,
  Users,
  CreditCard,
  Printer,
  Clock,
  Settings,
} from 'lucide-react';
import CartPanel from './POS/CartPanel';
import CheckoutPanel from './POS/CheckoutPanel';
import OrderSelection from './POS/OrderSelection';
import CustomerTablePanel from './POS/CustomerTablePanel';
import RecentOrdersPanel from './POS/RecentOrdersPanel';
import PrinterSettingsPanel from './POS/PrinterSettingsPanel';
import SettingsPanel from './POS/SettingsPanel';

const tabs = [
  { key: 'menu', title: 'Chọn món', icon: Coffee },
  { key: 'cart', title: 'Giỏ hàng', icon: ShoppingCart },
  { key: 'customer', title: 'Khách & Bàn', icon: Users },
  { key: 'payment', title: 'Thanh toán', icon: CreditCard },
  { key: 'printer', title: 'Máy in', icon: Printer },
  { key: 'recent', title: 'Đơn gần đây', icon: Clock },
  { key: 'settings', title: 'Cài đặt', icon: Settings },
];

export default function POSPage() {
  // Giả sử cartItems là state quản lý giỏ hàng
  const [cartItems, setCartItems] = useState([
    // ví dụ item
    // { id: 1, name: 'Cà phê sữa', price: 30000, quantity: 2 },
    // { id: 2, name: 'Bánh mì', price: 20000, quantity: 1 },
  ]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    note: '',
  });

  const orderTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Hàm xử lý thanh toán (bạn có thể viết logic thực tế)
  const handleCheckout = () => {
    alert(`Thanh toán tổng ${orderTotal} VNĐ`);
    // Xử lý logic thanh toán
  };

  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="flex flex-col h-full p-4">
      {/* Thanh icon tab */}
      <div className="flex space-x-4 mb-4">
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

      {/* Nội dung tương ứng từng tab */}
      <div className="flex-1 bg-white rounded-xl shadow p-4 overflow-auto">
        {activeTab === 'menu' && (
          <OrderSelection
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        )}
        {activeTab === 'cart' && (
          <CartPanel
            cartItems={cartItems}
            setCartItems={setCartItems}
            orderTotal={orderTotal}
          />
        )}
        {activeTab === 'customer' && (
          <CustomerTablePanel
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
          />
        )}
        {activeTab === 'payment' && (
          <CheckoutPanel total={orderTotal} onCheckout={handleCheckout} />
        )}
        {activeTab === 'printer' && <PrinterSettingsPanel />}
        {activeTab === 'recent' && <RecentOrdersPanel />}
        {activeTab === 'settings' && <SettingsPanel />}
      </div>
    </div>
  );
}