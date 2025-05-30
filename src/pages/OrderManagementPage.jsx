import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

// Mock data bàn và món ăn để chọn
const tablesMock = ['Bàn 1', 'Bàn 2', 'Bàn 3', 'Bàn 4'];

const menuItemsMock = [
  { id: 'm1', name: 'Cà phê sữa', price: 20000 },
  { id: 'm2', name: 'Bánh tráng trộn', price: 35000 },
  { id: 'm3', name: 'Trà đào', price: 30000 },
  { id: 'm4', name: 'Xúc xích chiên', price: 40000 },
  { id: 'm5', name: 'Bánh mì', price: 15000 },
  { id: 'm6', name: 'Trà đào', price: 30000 },
  { id: 'm7', name: 'Xúc xích chiên', price: 40000 },
  { id: 'm8', name: 'Bánh mì', price: 15000 },
];

const ordersMock = [
  {
    id: 'HD001',
    table: 'Bàn 1',
    items: ['Cà phê sữa', 'Bánh tráng trộn'],
    itemsObj: { 'Cà phê sữa': 1, 'Bánh tráng trộn': 2 },
    total: 90000,
    status: 'pending',
    note: 'Ít đá',
  },
  {
    id: 'HD002',
    table: 'Bàn 3',
    items: ['Trà đào', 'Xúc xích chiên'],
    itemsObj: { 'Trà đào': 1, 'Xúc xích chiên': 1 },
    total: 70000,
    status: 'done',
    note: '',
  }
  ,
  {
    id: 'HD003',
    table: 'Bàn 2',
    items: ['Bánh mì'],
    itemsObj: { 'Bánh mì': 1 },
    total: 15000,
    status: 'cancelled',
    note: 'Không lấy thêm nước',
  },
];

export default function OrderManagementPage() {
  const [orders, setOrders] = useState(ordersMock);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);

  // Form state cho modal thêm/sửa
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedItems, setSelectedItems] = useState([]); // [{id, name, price, quantity}]
  const [totalPrice, setTotalPrice] = useState(0);
  const [note, setNote] = useState('');

  // Mở modal thêm đơn mới
  const openModalForAdd = () => {
    setEditingOrderId(null);
    setSelectedTable('');
    setSelectedItems([]);
    setTotalPrice(0);
    setNote('');
    setIsModalOpen(true);
  };

  // Mở modal sửa đơn
  const openModalForEdit = (order) => {
    setEditingOrderId(order.id);
    setSelectedTable(order.table);

    // Lấy selectedItems từ order, map ra có quantity
    const selectedWithQty = order.items.map(name => {
      const menuItem = menuItemsMock.find(m => m.name === name);
      return menuItem ? { ...menuItem, quantity: order.itemsObj?.[name] || 1 } : null;
    }).filter(Boolean);

    setSelectedItems(selectedWithQty);
    setNote(order.note || '');

    // Tính tổng tiền
    const total = selectedWithQty.reduce((acc, i) => acc + i.price * (i.quantity || 1), 0);
    setTotalPrice(total);

    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Toggle chọn món
  const toggleItemSelection = (item) => {
    const exists = selectedItems.find(i => i.id === item.id);
    if (exists) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  // Thay đổi số lượng món
  const changeItemQuantity = (itemId, quantity) => {
    if (quantity < 1) quantity = 1;
    setSelectedItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  // Tính lại tổng tiền khi món hoặc số lượng thay đổi
  useEffect(() => {
    const total = selectedItems.reduce((acc, cur) => acc + cur.price * (cur.quantity || 1), 0);
    setTotalPrice(total);
  }, [selectedItems]);

  // Lưu đơn hàng mới hoặc cập nhật
  const handleSaveOrder = () => {
    if (!selectedTable || selectedItems.length === 0) {
      alert('Vui lòng chọn bàn và món ăn');
      return;
    }

    const itemsNames = selectedItems.map(i => i.name);
    const itemsObj = {};
    selectedItems.forEach(i => {
      itemsObj[i.name] = i.quantity;
    });

    if (editingOrderId) {
      setOrders(prev =>
        prev.map(o =>
          o.id === editingOrderId
            ? {
                ...o,
                table: selectedTable,
                items: itemsNames,
                itemsObj,
                total: totalPrice,
                note,
              }
            : o
        )
      );
    } else {
      const newOrder = {
        id: `HD${(orders.length + 1).toString().padStart(3, '0')}`,
        table: selectedTable,
        items: itemsNames,
        itemsObj,
        total: totalPrice,
        status: 'pending',
        note,
      };
      setOrders(prev => [newOrder, ...prev]);
    }
    closeModal();
  };

  // Xóa đơn
  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Bạn có chắc muốn xóa đơn này không?')) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Quản Lý Đơn Hàng</h1>
        <Button onClick={openModalForAdd} className="bg-primary text-white px-4 py-2 rounded-xl">
          Thêm đơn hàng
        </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid grid-cols-3 sm:w-1/2 mb-4">
          <TabsTrigger value="pending">Chờ xử lý</TabsTrigger>
          <TabsTrigger value="done">Đã hoàn tất</TabsTrigger>
          <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid gap-4">
            {orders.filter(o => o.status === 'pending').map(order => (
              <Card key={order.id} className="rounded-2xl p-4">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{order.table}</p>
                      <p className="text-sm text-gray-600">
                        {order.items.map(item => {
                          const qty = order.itemsObj?.[item] || 1;
                          return `${item} x${qty}`;
                        }).join(', ')}
                      </p>
                      {order.note && <p className="text-sm italic text-gray-500">Ghi chú: {order.note}</p>}
                      <p className="text-sm font-medium mt-2">Tổng: {order.total.toLocaleString()}đ</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        className="bg-primary text-white px-4 py-2 rounded-xl"
                        onClick={() => {
                          setOrders(prev =>
                            prev.map(o =>
                              o.id === order.id ? { ...o, status: 'done' } : o
                            )
                          );
                        }}
                      >
                        Hoàn tất
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 text-sm"
                        onClick={() => openModalForEdit(order)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="done">
          <div className="grid gap-4">
            {orders.filter(o => o.status === 'done').map(order => (
              <Card key={order.id} className="rounded-2xl p-4 bg-green-200">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{order.table}</p>
                      <p className="text-sm text-gray-600">
                        {order.items.map(item => {
                          const qty = order.itemsObj?.[item] || 1;
                          return `${item} x${qty}`;
                        }).join(', ')}
                      </p>
                      {order.note && <p className="text-sm italic text-gray-500">Ghi chú: {order.note}</p>}
                      <p className="text-sm font-medium mt-2">Tổng: {order.total.toLocaleString()}đ</p>
                    </div>
                    <p className="text-sm text-green-600 font-semibold">✓ Đã xong</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled">
          <div className="grid gap-4">
            {orders.filter(o => o.status === 'cancelled').map(order => (
              <Card key={order.id} className="rounded-2xl p-4 bg-red-200">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{order.table}</p>
                      <p className="text-sm text-gray-600">
                        {order.items.map(item => {
                          const qty = order.itemsObj?.[item] || 1;
                          return `${item} x${qty}`;
                        }).join(', ')}
                      </p>
                      {order.note && <p className="text-sm italic text-gray-500">Ghi chú: {order.note}</p>}
                      <p className="text-sm font-medium mt-2">Tổng: {order.total.toLocaleString()}đ</p>
                    </div>
                    <p className="text-sm text-red-600 font-semibold">✗ Đã hủy</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal thêm/sửa đơn hàng */}
        <Modal
          show={isModalOpen}
          onClose={closeModal}
          title={editingOrderId ? 'Sửa đơn hàng' : 'Thêm đơn hàng mới'}
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Chọn bàn</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
            >
              <option value="">-- Chọn bàn --</option>
              {tablesMock.map((table) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Chọn món ăn</label>
            <div className="max-h-52 overflow-y-auto border border-gray-300 rounded p-2">
              {menuItemsMock.map((item) => {
                const selectedItem = selectedItems.find(i => i.id === item.id);
                return (
                  <div key={item.id} className="flex items-center mb-2 space-x-3">
                    <input
                      type="checkbox"
                      checked={!!selectedItem}
                      onChange={() => toggleItemSelection(item)}
                      className="form-checkbox h-5 w-5 text-primary"
                    />
                    <span
                      className="flex-1 cursor-pointer select-none"
                      onClick={() => toggleItemSelection(item)}
                    >
                      {item.name} - {item.price.toLocaleString()}đ
                    </span>
                    {selectedItem && (
                      <input
                        type="number"
                        min="1"
                        value={selectedItem.quantity}
                        onChange={(e) => changeItemQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Ghi chú</label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
              placeholder="Ví dụ: ít đá, không đường..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <p className="font-semibold text-gray-700">
              Tổng tiền: <span className="text-primary">{totalPrice.toLocaleString()}đ</span>
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button className="text-white" variant="outline" onClick={closeModal}>
              Hủy
            </Button>
            <Button onClick={handleSaveOrder} className="bg-primary text-white">
              Lưu
            </Button>
          </div>
        </Modal>
    </div>
  );
}