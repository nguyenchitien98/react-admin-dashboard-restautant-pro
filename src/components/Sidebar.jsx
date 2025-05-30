// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Coffee, Flame, LayoutGrid, Boxes, Users, BarChart, BookOpen, Home } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className='w-20 sm:w-24 bg-primary text-white flex flex-col items-center py-6 space-y-6'>
      <NavLink to='/' title='Dashboard' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <LayoutDashboard className='w-6 h-6' />
      </NavLink>
      <NavLink to='/orders' title='Đơn hàng' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <ClipboardList className='w-6 h-6' />
      </NavLink>
      <NavLink to='/menu' title='Thực đơn' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <Coffee className='w-6 h-6' />
      </NavLink>
        <NavLink to="/kitchen" title='Bếp' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <Flame className='w-6 h-6' />
      </NavLink>
        <NavLink to="/tables" className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <LayoutGrid className='w-6 h-6' />
        {/* Quản lý bàn */}
      </NavLink>
      <NavLink to="/inventory" className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <Boxes className='w-6 h-6' />
        {/* Quản lý kho */}
      </NavLink>
      <NavLink to="/employees" className="flex items-center px-4 py-2 hover:bg-green-100 rounded"
      >
        <Users className="w-6 h-6" />
        {/* Nhân viên */}
      </NavLink>
      <NavLink to="/report" className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <BarChart className="w-6 h-6" />
        {/* <span className="ml-2">Báo cáo</span> */}
      </NavLink>
      <NavLink to="/tutorials" className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <BookOpen className="w-6 h-6" />
        {/* <span className="ml-2">Hướng dẫn</span> */}
      </NavLink>
    </aside>
  );
}
