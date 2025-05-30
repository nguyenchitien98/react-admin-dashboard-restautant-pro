import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function TutorialPage() {
    const [tutorials, setTutorials] = useState([{
        id: 1,
        title: 'Trà sữa trân châu',
        category: 'Đồ uống',
        description: 'Pha trà, nấu trân châu và kết hợp sữa hoàn hảo.',
        image: 'https://source.unsplash.com/400x300/?milk-tea',
        ingredients: [
          '2 gói trà đen',
          '100ml sữa đặc',
          '50g trân châu đen',
          '500ml nước sôi',
        ],
        steps: [
          'Ngâm trà đen trong nước sôi 5 phút.',
          'Cho sữa đặc vào khuấy đều.',
          'Nấu trân châu trong 10 phút rồi ngâm nước đường.',
          'Cho trà + sữa + trân châu vào ly, thêm đá và thưởng thức.',
        ],
      },
      {
        id: 2,
        title: 'Khoai tây chiên giòn',
        category: 'Đồ ăn',
        description: 'Chiên vàng giòn, giữ độ giòn lâu.',
        image: 'https://source.unsplash.com/400x300/?french-fries',
        ingredients: [
          '3 củ khoai tây',
          '1 muỗng canh giấm',
          'Dầu ăn',
          'Muối',
        ],
        steps: [
          'Gọt vỏ, cắt khoai thành sợi, ngâm nước muối + giấm 30 phút.',
          'Luộc sơ khoai rồi để ráo.',
          'Chiên lần 1 ở 160°C đến khi vàng nhạt.',
          'Chiên lần 2 ở 190°C đến khi giòn.',
        ],
      },
      {
        id: 3,
        title: 'Cà phê sữa đá',
        category: 'Đồ uống',
        description: 'Tỷ lệ chuẩn giữa cà phê pha phin và sữa đặc.',
        image: 'https://source.unsplash.com/400x300/?vietnamese-coffee',
        ingredients: [
          '25g cà phê phin',
          '40ml sữa đặc',
          '100ml nước sôi',
          'Đá viên',
        ],
        steps: [
          'Cho cà phê vào phin, nén nhẹ, đổ nước sôi từ từ.',
          'Cho sữa đặc vào ly.',
          'Đợi cà phê nhỏ giọt hết, khuấy đều với sữa.',
          'Thêm đá và thưởng thức.',
        ],
      },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [expandedId, setExpandedId] = useState(null);
    const [selectedTutorial, setSelectedTutorial] = useState(null);
  
    const initialForm = {
      title: '',
      description: '',
      category: 'Đồ uống',
      image: '',
      ingredients: '',
      steps: '',
    };
    const [form, setForm] = useState(initialForm);
  
    const openModal = (item = null) => {
      if (item) {
        setEditing(item);
        setForm({
          ...item,
          ingredients: item.ingredients.join('\n'),
          steps: item.steps.join('\n'),
        });
        setPreviewImage(item.image);
      } else {
        setEditing(null);
        setForm(initialForm);
        setPreviewImage('');
      }
      setModalOpen(true);
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewImage(url);
      }
    };
  
    const handleSubmit = () => {
      const newItem = {
        ...form,
        id: editing?.id || Date.now(),
        image: previewImage || form.image,
        ingredients: form.ingredients.split('\n').filter(Boolean),
        steps: form.steps.split('\n').filter(Boolean),
      };
  
      if (editing) {
        setTutorials((prev) =>
          prev.map((t) => (t.id === editing.id ? newItem : t))
        );
      } else {
        setTutorials((prev) => [...prev, newItem]);
      }
  
      setModalOpen(false);
      setForm(initialForm);
      setPreviewImage('');
    };
  
    const handleDelete = (id) => {
      if (confirm('Bạn có chắc muốn xoá món hướng dẫn này?')) {
        setTutorials((prev) => prev.filter((t) => t.id !== id));
      }
    };
  
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-primary">Hướng dẫn làm đồ</h1>
          <Button onClick={() => openModal()} className="text-white bg-green-600 hover:bg-green-700">
            + Thêm món
          </Button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow "
            >
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover cursor-pointer" onClick={() => setSelectedTutorial(item)}/>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-green-800 cursor-pointer" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
                    {item.title}
                  </h2>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
  
                <div className="flex gap-2 mt-4">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 text-sm" variant="outline" size="sm" onClick={() => openModal(item)}>Sửa</Button>
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm" variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Xoá</Button>
                </div>
  
                {expandedId === item.id && (
                  <div className="mt-4 text-sm text-gray-700">
                    <p className="font-semibold text-green-800">Nguyên liệu:</p>
                    <ul className="list-disc ml-5 mb-2">
                      {item.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
                    </ul>
                    <p className="font-semibold text-green-800">Cách làm:</p>
                    <ol className="list-decimal ml-5">
                      {item.steps.map((s, idx) => <li key={idx}>{s}</li>)}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
  
        <Modal
          show={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setForm(initialForm);
            setPreviewImage('');
          }}
          title={editing ? 'Chỉnh sửa món' : 'Thêm món mới'}
        >
          <div className="max-h-[85vh] overflow-y-auto space-y-4 pr-2">
            <div>
              <label className="block text-sm font-medium text-green-900">Tên món</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-green-900">Phân loại</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border rounded p-2 mt-1"
              >
                <option>Đồ uống</option>
                <option>Đồ ăn</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-green-900">Mô tả ngắn</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border rounded p-2 mt-1"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-green-900">Hình ảnh</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1" />
              {previewImage && (
                <img src={previewImage} alt="Preview" className="w-full mt-2 rounded-md h-40 object-cover" />
              )}
            </div>
  
            <div>
              <label className="block text-sm font-medium text-green-900">Nguyên liệu</label>
              <textarea
                rows={3}
                value={form.ingredients}
                onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
                className="w-full border rounded p-2 mt-1"
                placeholder="Mỗi dòng 1 nguyên liệu"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-green-900">Cách làm</label>
              <textarea
                rows={4}
                value={form.steps}
                onChange={(e) => setForm({ ...form, steps: e.target.value })}
                className="w-full border rounded p-2 mt-1"
                placeholder="Mỗi dòng 1 bước"
              />
            </div>
  
            <div className="text-right space-x-2">
              <Button className=" text-white" onClick={() => setModalOpen(false)}>Hủy</Button>
              <Button onClick={handleSubmit} className="text-white bg-green-600 hover:bg-green-700">
                {editing ? 'Cập nhật' : 'Thêm'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* modal xem chi tiết */}
        <Modal
            show={!!selectedTutorial}
            onClose={() => setSelectedTutorial(null)}
            title={selectedTutorial?.title} // sửa thành title vì dữ liệu có trường title, không phải name
            >
            {selectedTutorial && (
                <div className="space-y-4">
                <img
                    src={selectedTutorial.image}
                    alt={selectedTutorial.title}
                    className="w-full h-48 object-cover rounded-xl"
                />
                <p><strong>Loại:</strong> {selectedTutorial.category}</p>

                <div>
                    <strong>Nguyên liệu:</strong>
                    <ul className="list-disc ml-5 whitespace-pre-line">
                    {selectedTutorial.ingredients.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                    </ul>
                </div>

                <div>
                    <strong>Hướng dẫn:</strong>
                    <ol className="list-decimal ml-5 whitespace-pre-line">
                    {selectedTutorial.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                    ))}
                    </ol>
                </div>
                </div>
            )}
        </Modal>    
      </div>
    );
  }