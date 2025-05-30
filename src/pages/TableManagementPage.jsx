import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';

const STATUS = {
  AVAILABLE: 'Trống',
  OCCUPIED: 'Đang phục vụ',
  RESERVED: 'Đã đặt',
};

export default function TableManagementPage() {
  const [tables, setTables] = useState([
    { id: 1, name: 'Bàn 1', status: STATUS.AVAILABLE },
    { id: 2, name: 'Bàn 2', status: STATUS.RESERVED },
    { id: 3, name: 'Bàn 3', status: STATUS.OCCUPIED },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [tableName, setTableName] = useState('');

  const handleOpenCreate = () => {
    setEditingTable(null);
    setTableName('');
    setModalOpen(true);
  };

  const handleOpenEdit = (table) => {
    setEditingTable(table);
    setTableName(table.name);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!tableName.trim()) return;

    if (editingTable) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === editingTable.id ? { ...t, name: tableName } : t
        )
      );
    } else {
      const newId = tables.length ? Math.max(...tables.map(t => t.id)) + 1 : 1;
      setTables((prev) => [
        ...prev,
        { id: newId, name: tableName, status: STATUS.AVAILABLE },
      ]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xoá bàn này?')) {
      setTables(prev => prev.filter(t => t.id !== id));
    }
  };

  const nextStatus = (status) => {
    if (status === STATUS.AVAILABLE) return STATUS.RESERVED;
    if (status === STATUS.RESERVED) return STATUS.OCCUPIED;
    return STATUS.AVAILABLE;
  };

  const updateStatus = (tableId) => {
    setTables(prev =>
      prev.map(table =>
        table.id === tableId
          ? { ...table, status: nextStatus(table.status) }
          : table
      )
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Quản lý bàn</h1>
        <Button onClick={handleOpenCreate} className="bg-green-600 text-white">
          + Thêm bàn
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {tables.map(table => (
          <div
            key={table.id}
            className={`
              rounded-xl p-4 text-center shadow-md relative
              ${
                table.status === STATUS.AVAILABLE
                  ? 'bg-green-100 text-green-800'
                  : table.status === STATUS.OCCUPIED
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }
            `}
          >
            <div
              onClick={() => updateStatus(table.id)}
              className="cursor-pointer select-none"
            >
              <div className="text-xl font-semibold mb-1">{table.name}</div>
              <div className="text-sm">{table.status}</div>
            </div>

            <div className="flex justify-center space-x-2 mt-3">
              <Button
                onClick={() => handleOpenEdit(table)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 text-sm"
              >
                Sửa
              </Button>
              <Button
                onClick={() => handleDelete(table.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
              >
                Xoá
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-black">
          {editingTable ? 'Sửa bàn' : 'Thêm bàn'}
        </h2>
        <div className="space-y-4">
          <Input
            placeholder="Tên bàn (VD: Bàn VIP, Bàn 1...)"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setModalOpen(false)} className="bg-gray-200 text-white">
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