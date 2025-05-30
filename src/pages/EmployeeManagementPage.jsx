import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

export default function EmployeeManagementPage() {
    const roles = ['Phục vụ', 'Bếp', 'Thu ngân', 'Quản lý'];
  
    const [employees, setEmployees] = useState([
      { id: 1, name: 'Nguyễn Văn A', role: 'Phục vụ', phone: '0123456789' },
      { id: 2, name: 'Trần Thị B', role: 'Thu ngân', phone: '0987654321' },
    ]);
  
    const [modalOpen, setModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [form, setForm] = useState({ name: '', role: '', phone: '' });
  
    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState('');
  
    const handleOpenCreate = () => {
      setEditingEmployee(null);
      setForm({ name: '', role: '', phone: '' });
      setModalOpen(true);
    };
  
    const handleOpenEdit = (emp) => {
      setEditingEmployee(emp);
      setForm({ name: emp.name, role: emp.role, phone: emp.phone });
      setModalOpen(true);
    };
  
    const handleDelete = (id) => {
      if (confirm('Bạn có chắc muốn xoá nhân viên này không?')) {
        setEmployees((prev) => prev.filter((e) => e.id !== id));
      }
    };
  
    const handleSave = () => {
      if (!form.name.trim() || !form.role.trim()) return;
  
      if (editingEmployee) {
        setEmployees((prev) =>
          prev.map((e) =>
            e.id === editingEmployee.id ? { ...e, ...form } : e
          )
        );
      } else {
        const newId = employees.length
          ? Math.max(...employees.map((e) => e.id)) + 1
          : 1;
        setEmployees((prev) => [...prev, { id: newId, ...form }]);
      }
  
      setModalOpen(false);
    };
  
    const filteredEmployees = employees.filter(
      (e) =>
        e.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterRole === '' || e.role === filterRole)
    );
  
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Quản lý nhân viên</h1>
          <Button onClick={handleOpenCreate} className="bg-green-600 text-white">
            + Thêm nhân viên
          </Button>
        </div>
  
        {/* Tìm kiếm và lọc */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
          <Input
            placeholder="Tìm theo tên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-1/3"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border rounded px-3 py-2 text-green-800 bg-white md:w-1/4"
          >
            <option value="">Tất cả chức vụ</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
  
        {/* Danh sách nhân viên */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-left rounded-xl overflow-hidden">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="px-4 py-2">Họ tên</th>
                <th className="px-4 py-2">Chức vụ</th>
                <th className="px-4 py-2">SĐT</th>
                <th className="px-4 py-2 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((e) => (
                <tr key={e.id} className="border-t hover:bg-green-50">
                  <td className="px-4 py-2">{e.name}</td>
                  <td className="px-4 py-2">{e.role}</td>
                  <td className="px-4 py-2">{e.phone}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Button
                      onClick={() => handleOpenEdit(e)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 text-sm"
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => handleDelete(e.id)}
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
  
        {/* Modal thêm/sửa */}
        <Modal
          show={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingEmployee ? 'Sửa nhân viên' : 'Thêm nhân viên'}
        >
          <div className="space-y-4">
            <Input
              placeholder="Họ tên"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Chọn chức vụ --</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <Input
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
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