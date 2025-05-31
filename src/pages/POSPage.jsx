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
import TableSelectionModal from '@/components/table/TableSelectionModal';
import { toast } from 'sonner';

export default function POSPage() {
  const [activeTab, setActiveTab] = useState('menu');
  const [cartItems, setCartItems] = useState([]);
  const [serviceType, setServiceType] = useState(null);
  const [heldOrders, setHeldOrders] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showTableModal, setShowTableModal] = useState(false);

  const mainTabs = ['menu', 'hold', 'bill'];
  const serviceTypes = ['delivery', 'takeaway', 'dinin'];

  const handleServiceTypeClick = (type) => {
    if (type === "dinin") {
      setShowTableModal(true); // mở modal chọn bàn
    } else {
      setSelectedTable(null);
      setServiceType(type);
    }
  };

  const handleTableSelect = (tableNumber) => {
    setSelectedTable(tableNumber);
    setServiceType("dinin");
    setShowTableModal(false); // đóng modal sau khi chọn
  };

  const serviceTypeMap = {
    takeaway: 'Mang đi',
    dinin: 'Tại quán',
    delivery: 'Giao hàng',
  };

  const tabs = [
    { key: 'menu', title: 'Chọn món', icon: Coffee },
    { key: 'hold', title: 'Tạm giữ', icon: ClipboardList },
    { key: 'bill', title: 'Hóa đơn', icon: FileText },
    { key: 'kot', title: 'KOT', icon: ClipboardList },
    { key: 'delivery', title: 'Giao hàng', icon: Truck },
    { key: 'takeaway', title: 'Mang đi', icon: ShoppingBag },
    { key: 'dinin', title: 'Tại quán', icon: Home },
  ];

  const handleKot = () => {
    if (!cartItems.length) {
      toast.error('Chưa có món nào trong đơn hàng');
      return;
    }

    const order = {
      id: Date.now(),
      items: cartItems,
      serviceType,
      tableNumber: serviceType === 'dinin' ? selectedTable : null, 
      total: cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    };

    setHeldOrders((prev) => [...prev, order]);
    setCartItems([]);
    setServiceType(null);
    toast.success('Đơn hàng đã được tạo và gửi cho bếp!');
    setActiveTab('hold');
  };

  const handleCreateOrderFromSelection = (orderData) => {
    const { items, serviceType } = orderData;

    const order = {
      id: Date.now(),
      items,
      serviceType,
      tableNumber: serviceType === 'dinin' ? selectedTable : null,
      total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
    };
  
    setHeldOrders((prev) => [...prev, order]);
    setCartItems([]);
    setServiceType(null);
    setSelectedTable(null);
    setActiveTab('hold');
    toast.success('Đơn hàng đã được tạo và gửi cho bếp!');
  };

  const handleTabClick = (key) => {
    if (mainTabs.includes(key)) {
      setActiveTab(key);
    } else if (serviceTypes.includes(key)) {
    //   setServiceType(key);
    //   toast.info(`Chọn phương thức: ${tabs.find(t => t.key === key)?.title}`);
    handleServiceTypeClick(key);
    toast.info(`Chọn phương thức: ${tabs.find(t => t.key === key)?.title}`);
    } else if (key === 'kot') {
      handleKot();
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Tab bar */}
      <div className="flex space-x-4 mb-4 overflow-x-auto">
      {tabs.map(({ key, title, icon: Icon }) => {
          const isActiveMainTab = activeTab === key;
          const isActiveServiceType = serviceType === key;
          const isActive =
            (mainTabs.includes(key) && isActiveMainTab) ||
            (serviceTypes.includes(key) && isActiveServiceType);

          return (
            <button
              key={key}
              onClick={() => handleTabClick(key)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl transition ${
                isActive
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow p-4 overflow-auto">
        {activeTab === 'menu' && (
          <OrderSelection
            cartItems={cartItems}
            setCartItems={setCartItems}
            serviceType={serviceType}
            onCreateOrder={handleCreateOrderFromSelection}
          />
        )}

        {activeTab === 'hold' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Đơn tạm giữ</h2>
            {heldOrders.length === 0 ? (
              <p className="text-gray-500 italic">Chưa có đơn nào</p>
            ) : (
              <div className="space-y-4">
                {heldOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    <p className="text-sm font-medium">
                      Phương thức: 
                      <span className="capitalize">
                        {serviceTypeMap[order.serviceType] || 'Không xác định'}
                        {order.serviceType === 'dinin' && order.tableNumber ? ` (Bàn ${order.tableNumber})` : ''}
                      </span>
                    </p>
                    <ul className="text-sm mt-2 space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>
                            {item.name} {item.size && <span className="text-gray-500"> (Size {item.size})</span>} × {item.qty}
                          </span>
                          <span>{(item.price * item.qty).toLocaleString()}₫</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 font-semibold text-right">
                      Tổng: {order.total.toLocaleString()}₫
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bill' && (
          <div className="text-center text-gray-500 italic">Danh sách hóa đơn (đang phát triển)</div>
        )}
      </div>

      <TableSelectionModal
        open={showTableModal}
        onClose={() => setShowTableModal(false)}
        onSelect={handleTableSelect}
      />
    </div>
  );
}