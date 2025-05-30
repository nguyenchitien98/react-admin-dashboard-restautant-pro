import { useState } from 'react';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Utensils, CupSoda, Cake } from 'lucide-react';
import  Modal  from '@/components/ui/Modal';

const defaultCategories = [
    { id: 1, name: 'Đồ ăn', icon: Utensils },
    { id: 2, name: 'Đồ uống', icon: CupSoda },
    { id: 3, name: 'Tráng miệng', icon: Cake },
  ];
  
  export default function ProductCategoryPage() {
    const [categories, setCategories] = useState(defaultCategories);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
  
    const filteredCategories = categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  
    const openModal = () => {
      setNewCategoryName('');
      setShowModal(true);
    };
    const closeModal = () => setShowModal(false);
  
    const handleAddCategory = () => {
      if (newCategoryName.trim() === '') return;
      setCategories([
        ...categories,
        {
          id: Date.now(),
          name: newCategoryName.trim(),
          icon: Utensils, // mặc định icon
        },
      ]);
      closeModal();
    };
  
    return (
        <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary mb-4">Quản lý loại thực đơn</h1>
                <Button onClick={openModal} className="text-white">+ Thêm loại</Button>
              </div>
  
        <div className="max-w-sm">
          <Input
            placeholder="Tìm kiếm loại sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.id}>
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-base">{cat.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-500">ID: {cat.id}</CardContent>
              </Card>
            );
          })}
        </div>
  
        <Modal show={showModal} onClose={closeModal} title="Thêm loại sản phẩm mới">
          <Input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Tên loại sản phẩm"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddCategory();
            }}
            autoFocus
          />
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={closeModal}>
              Hủy
            </Button>
            <Button onClick={handleAddCategory}>Thêm</Button>
          </div>
        </Modal>
      </div>
    );
  }