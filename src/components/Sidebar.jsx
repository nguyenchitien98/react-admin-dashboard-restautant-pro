import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Coffee, LogOut, Flame, LayoutGrid, Boxes, Users, BarChart, BookOpen, Bell, User } from 'lucide-react';
import { Menu } from '@headlessui/react';

export default function Sidebar() {
  const navigate = useNavigate();

  const user = {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/100?img=3',
  };

  const notifications = [
    { id: 1, text: 'Đơn hàng #1234 đã được tạo' },
  { id: 2, text: 'Bàn số 5 đã thanh toán' },
  { id: 3, text: 'Kho hàng sắp hết cà phê' },
  { id: 4, text: 'Nhân viên mới đã được thêm' },
  { id: 5, text: 'Đơn hàng #1235 đang chờ bếp' },
  { id: 6, text: 'Thông báo từ hệ thống' },
  { id: 7, text: 'Bếp đã hoàn thành món #A2' },
  { id: 8, text: 'Khách mới đánh giá quán 5 sao' },
  { id: 9, text: 'Đơn hàng #1236 bị huỷ' },
  { id: 10, text: 'Tài khoản admin vừa đăng nhập' },
  { id: 11, text: 'Quán sẽ nghỉ ngày mai' },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    // TODO: Add real logout logic
  };

  const handleSettings = () => {
    navigate('/accounts');
  };

  return (
    <aside className='w-20 sm:w-24 bg-primary text-white flex flex-col items-center py-6 space-y-6'>
      {/* Avatar + Dropdown */}
      <Menu as="div" className="relative mb-2">
  <Menu.Button as="div" className="relative flex flex-col items-center cursor-pointer focus:outline-none">
    {/* Avatar */}
    <img
      src={user.avatar}
      alt="Avatar"
      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white"
    />
    <span className="text-xs text-center leading-tight font-medium">{user.name}</span>

    {/* Bell icon nằm trên avatar */}
    <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow">
      <Bell className="w-4 h-4 text-red-500" />
      {notifications.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full font-semibold">
          {notifications.length}
        </span>
      )}
    </div>
  </Menu.Button>

  <Menu.Items className="absolute left-full top-0 z-50 mt-2 w-64 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-black">
    <div className="p-2 max-h-80 overflow-y-auto">
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-2">Không có thông báo</div>
      ) : (
        <>
          {notifications.slice(0, 10).map((note) => (
            <Menu.Item key={note.id}>
              {({ active }) => (
                <div
                  className={`p-2 rounded cursor-pointer ${
                    active ? 'bg-green-100' : ''
                  }`}
                >
                  {note.text}
                </div>
              )}
            </Menu.Item>
          ))}
        </>
      )}
    </div>

    {/* Xem tất cả */}
    {notifications.length > 10 && (
      <div className="border-t border-gray-200 px-4 py-2 text-center">
        <button
          onClick={() => navigate('/notifications')}
          className="text-green-600 text-sm font-medium hover:underline"
        >
          Xem tất cả
        </button>
      </div>
    )}

    {/* Cài đặt và đăng xuất */}
    <div className="border-t border-gray-200 px-4 py-2 flex flex-col gap-2">
      <button
        onClick={() => navigate('/accounts')}
        className="text-sm text-gray-800 hover:underline flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        Cài đặt tài khoản
      </button>
      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Đăng xuất
      </button>
    </div>
    </Menu.Items>
  </Menu>

      {/* Navigation links */}
      <NavLink to='/' title='Dashboard' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <LayoutDashboard className='w-6 h-6' />
      </NavLink>
      <NavLink to='/orders' title='Quản Lý Đơn hàng' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <ClipboardList className='w-6 h-6' />
      </NavLink>
      <NavLink to='/menu' title='Quản Lý Thực đơn' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <Coffee className='w-6 h-6' />
      </NavLink>
      <NavLink to="/kitchen" title='Quản Lý Bếp' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <Flame className='w-6 h-6' />
      </NavLink>
      <NavLink to="/tables" title='Quản Lý Bàn' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <LayoutGrid className='w-6 h-6' />
      </NavLink>
      <NavLink to="/inventory" title='Quản Lý Kho' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <Boxes className='w-6 h-6' />
      </NavLink>
      <NavLink to="/employees" title='Quản Lý Nhân Viên' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <Users className="w-6 h-6" />
      </NavLink>
      <NavLink to="/report" title='Báo Cáo' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <BarChart className="w-6 h-6" />
      </NavLink>
      <NavLink to="/tutorials" title='Công Thức / Hướng Dẫn' className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <BookOpen className="w-6 h-6" />
      </NavLink>
      <NavLink to="/accounts" title="Tài khoản" className="flex items-center px-4 py-2 hover:bg-green-100 rounded">
        <User className="w-6 h-6" />
      </NavLink>
    </aside>
  );
}