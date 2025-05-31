import { useState } from 'react';
import { ScrollArea } from '@/components/ui/Scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Search, Trash2, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

const categories = ['Tất cả', 'Cà phê', 'Trà', 'Sinh tố', 'Ăn vặt'];

const sampleMenu = [
  {
    id: 1,
    name: 'Cà phê sữa đá',
    emoji: '☕',
    category: 'Cà phê',
    sizes: [
      { label: 'S', price: 25000 },
      { label: 'M', price: 30000 },
      { label: 'L', price: 35000 },
    ],
  },
  {
    id: 2,
    name: 'Trà đào',
    emoji: '🍵',
    category: 'Trà',
    price: 25000 // món không có size
  },
  {
    id: 3,
    name: 'Sinh tố',
    emoji: '☕',
    category: 'Nước ép',
    sizes: [
      { label: 'S', price: 25000 },
      { label: 'M', price: 30000 },
      { label: 'L', price: 35000 },
    ],
  },
  {
    id: 4,
    name: 'Trà quất',
    emoji: '🍵',
    category: 'Trà',
    price: 25000 // món không có size
  },
];

export default function OrderSelection() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openItem = (item) => {
    if (item.sizes) {
      setSelectedItem(item);
      setShowModal(true);
    } else {
      addItem({ ...item, price: item.price, size: null });
    }
  };

  const addItem = (item) => {
    setOrderItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...item, qty: 1, note: '' }];
    });
  };

  const handleCreateOrder = () => {
    if (!serviceType) {
      toast.error('Vui lòng chọn phương thức phục vụ trước.');
      return;
    }
    if (serviceType === 'dinin' && !table) {
      setShowTableModal(true);
      return;
    }
    // Logic tạo đơn hàng và gửi cho bếp/quầy
    console.log('Tạo đơn:', {
      items: orderItems,
      serviceType,
      table,
    });
    toast.success('Đơn hàng đã được tạo và gửi cho bếp!');
    setOrderItems([]);
  };

  const filteredMenu = sampleMenu.filter(
    (item) =>
      (selectedCategory === 'Tất cả' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeItem = (id) => {
    setOrderItems((prev) => prev.filter((i) => i.id !== id));
  };

  const changeQty = (id, delta) => {
    setOrderItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(i.qty + delta, 1) } : i
      )
    );
  };

  const total = orderItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="flex max-h-screen">
      {/* Sidebar Category */}
      <div className="w-32 bg-green-100 p-2 space-y-2 overflow-y-auto">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === selectedCategory ? 'default' : 'ghost'}
            onClick={() => setSelectedCategory(cat)}
            className="w-full justify-start"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Menu + Order Summary */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4">
        {/* Menu Items */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Tìm món..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          <ScrollArea className="h-[80vh]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow hover:bg-green-50 cursor-pointer text-center"
                  onClick={() => openItem(item)}
                >
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    {item.sizes
                      ? `${item.sizes.map((s) => s.price).join('/')}đ`
                      : `${item.price.toLocaleString()}đ`}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">🧾 Đơn hàng</h2>
            <ScrollArea className="h-[65vh] pr-2">
              {orderItems.map((item) => (
                <div key={item.id} className="py-2 border-b space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="font-medium flex-1">
                      {item.emoji} {item.name}
                      {item.size && <span className="text-sm text-gray-500"> - Size {item.size}</span>}
                    </div>
                    <div className="text-sm text-right whitespace-nowrap">
                      {(item.qty * item.price).toLocaleString()}đ
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => changeQty(item.id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-6 text-center">{item.qty}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => changeQty(item.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
              {orderItems.length === 0 && (
                <div className="text-gray-500 italic text-center py-10">
                  Chưa có món nào
                </div>
              )}
            </ScrollArea>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between text-lg font-semibold">
              <span>Tổng:</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1">
                Huỷ đơn
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleCreateOrder}>
                Tiếp tục
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal chọn size */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chọn size cho {selectedItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {selectedItem?.sizes?.map((size) => (
              <Button
                key={size.label}
                variant="outline"
                className="justify-between"
                onClick={() => {
                  addItem({
                    ...selectedItem,
                    price: size.price,
                    size: size.label,
                  });
                  setShowModal(false);
                }}
              >
                <span>Size {size.label}</span>
                <span>{size.price.toLocaleString()}đ</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      {/* Modal chọn bàn nếu chưa chọn */}
      {/* {showDinInModal && <DinInModal onClose={() => setShowDinInModal(false)} />} */}
    </div>
  );
}