import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

export default function InventoryManagementPage() {
  const [items, setItems] = useState([
    { id: 1, name: 'Trà xanh', quantity: 10, unit: 'kg' },
    { id: 2, name: 'Đường', quantity: 25, unit: 'kg' },
    { id: 3, name: 'Sữa đặc', quantity: 15, unit: 'lon' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', quantity: '', unit: '' });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setForm({ name: '', quantity: '', unit: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({ name: item.name, quantity: item.quantity, unit: item.unit });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xoá nguyên liệu này không?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.quantity || !form.unit) return;

    if (editingItem) {
      setItems(prev =>
        prev.map(i =>
          i.id === editingItem.id ? { ...i, ...form, quantity: parseFloat(form.quantity) } : i
        )
      );
    } else {
      const newId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
      setItems(prev => [
        ...prev,
        { id: newId, name: form.name, quantity: parseFloat(form.quantity), unit: form.unit },
      ]);
    }

    setModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Quản lý kho</h1>
        <Button onClick={handleOpenCreate} className="bg-green-600 text-white">
          + Thêm nguyên liệu
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border text-left rounded-xl overflow-hidden">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">Số lượng</th>
              <th className="px-4 py-2">Đơn vị</th>
              <th className="px-4 py-2 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t hover:bg-green-50">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.unit}</td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <Button
                    onClick={() => handleOpenEdit(item)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 text-sm"
                  >
                    Sửa
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
                  >
                    Xoá
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Sửa nguyên liệu' : 'Thêm nguyên liệu'}
      >
        <div className="space-y-4">
          <Input
            placeholder="Tên nguyên liệu"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Số lượng"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <Input
            placeholder="Đơn vị (kg, gói, lon...)"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setModalOpen(false)} className="bg-gray-200">
              Huỷ
            </Button>
            <Button onClick={handleSave} className="bg-green-600 text-white">
              Lưu
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}