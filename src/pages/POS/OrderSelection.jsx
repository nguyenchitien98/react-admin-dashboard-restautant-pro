import { useState } from 'react';
import { ScrollArea } from '@/components/ui/Scroll-area';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Search, Trash2 } from 'lucide-react';

const categories = ['Tất cả', 'Cà phê', 'Trà', 'Sinh tố', 'Ăn vặt'];

const sampleMenu = [
  { id: 1, name: 'Cà phê sữa đá', price: 30000, category: 'Cà phê', emoji: '☕' },
  { id: 2, name: 'Trà đào', price: 25000, category: 'Trà', emoji: '🍵' },
  { id: 3, name: 'Sinh tố dâu', price: 40000, category: 'Sinh tố', emoji: '🍓' },
  { id: 4, name: 'Khoai tây chiên', price: 25000, category: 'Ăn vặt', emoji: '🍟' },
  { id: 5, name: 'Cà phê sữa đá', price: 30000, category: 'Cà phê', emoji: '☕' },
  { id: 6, name: 'Trà đào', price: 25000, category: 'Trà', emoji: '🍵' },
  { id: 7, name: 'Sinh tố dâu', price: 40000, category: 'Sinh tố', emoji: '🍓' },
  { id: 8, name: 'Khoai tây chiên', price: 25000, category: 'Ăn vặt', emoji: '🍟' },
  { id: 9, name: 'Cà phê sữa đá', price: 30000, category: 'Cà phê', emoji: '☕' },
  { id: 10, name: 'Trà đào', price: 25000, category: 'Trà', emoji: '🍵' },
  { id: 11, name: 'Sinh tố dâu', price: 40000, category: 'Sinh tố', emoji: '🍓' },
  { id: 12, name: 'Khoai tây chiên', price: 25000, category: 'Ăn vặt', emoji: '🍟' },
];

export default function OrderSelection() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderItems, setOrderItems] = useState([]);

  const filteredMenu = sampleMenu.filter(
    (item) =>
      (selectedCategory === 'Tất cả' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = (item) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1, note: '' }];
    });
  };

  const removeItem = (id) => {
    setOrderItems((prev) => prev.filter((i) => i.id !== id));
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
            <Search className="w-5 h-5" />
            <Input
              placeholder="Tìm món..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[80vh]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow hover:bg-green-50 cursor-pointer text-center"
                  onClick={() => addItem(item)}
                >
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.price.toLocaleString()}đ</div>
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
                <div
                  key={item.id}
                  className="flex justify-between items-start py-2 border-b"
                >
                  <div>
                    <div className="font-medium">
                      {item.emoji} {item.name} x{item.qty}
                    </div>
                    {item.note && (
                      <div className="text-xs text-gray-500 italic">→ {item.note}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div>{(item.qty * item.price).toLocaleString()}đ</div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:underline text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {orderItems.length === 0 && (
                <div className="text-gray-500 italic text-center py-10">Chưa có món nào</div>
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
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                Tiếp tục
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}