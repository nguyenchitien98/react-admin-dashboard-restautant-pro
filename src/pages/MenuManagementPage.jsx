import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const defaultImage =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80';

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Cà phê sữa',
      price: '25.000đ',
      category: 'Nước',
      image: defaultImage,
    },
    {
      id: 2,
      name: 'Bánh tráng trộn',
      price: '20.000đ',
      category: 'Ăn vặt',
      image: defaultImage,
    },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ name: '', price: '', category: '', image: '' });
    setModalOpen(true);
  };

  const openEditModal = item => {
    setEditingItem(item);
    setFormData(item);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.category) return;

    if (editingItem) {
      setMenuItems(menuItems.map(item => (item.id === editingItem.id ? formData : item)));
    } else {
      setMenuItems([
        ...menuItems,
        { ...formData, id: Date.now(), image: formData.image || defaultImage },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = id => {
    if (confirm('Bạn chắc chắn muốn xóa món này?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary mb-4">Quản lý thực đơn</h1>
        <Button onClick={openAddModal} className="text-white">+ Thêm món</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {menuItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md flex flex-col"
            style={{ minHeight: '220px' }}
          >
            <div className="h-36 rounded-t-xl overflow-hidden">
              <img
                src={item.image || defaultImage}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1 text-green-700">{item.name}</h3>
                <p className="text-gray-700 mb-1">{item.price}</p>
                <p className="text-gray-500 text-sm">{item.category}</p>
              </div>

              <div className="mt-3 flex justify-end space-x-3">
                <Button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 text-sm"
                  onClick={() => openEditModal(item)}
                >
                  Sửa
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Sửa món' : 'Thêm món mới'}
      >
        <Input
          label="Tên món"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nhập tên món..."
        />
        <Input
          label="Giá món"
          value={formData.price}
          onChange={e => setFormData({ ...formData, price: e.target.value })}
          placeholder="VD: 25.000đ"
        />
        <Input
          label="Phân loại"
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
          placeholder="VD: Nước / Ăn vặt"
        />
        <Input
          label="URL hình ảnh (tùy chọn)"
          value={formData.image}
          onChange={e => setFormData({ ...formData, image: e.target.value })}
          placeholder="Link hình ảnh món"
        />
        <div className="mt-4 text-right space-x-2">
        <Button className=" text-white" onClick={() => setModalOpen(false)}>Hủy</Button>
        <Button className=" text-white" onClick={handleSave}>{editingItem ? 'Lưu thay đổi' : 'Thêm món'}</Button>
        </div>
      </Modal>
    </div>
  );
}