import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Coffee,
  LogOut,
  Flame,
  LayoutGrid,
  Boxes,
  Users,
  BarChart,
  BookOpen,
  Bell,
  User,
  CreditCard,
  Utensils,
  Unplug,
} from 'lucide-react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

export default function Sidebar() {
  const navigate = useNavigate();

  const user = {
    name: 'Chí Tiến',
    avatar: '/image/profile.jpg',
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

  const [showTitles, setShowTitles] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // trạng thái dropdown

  const handleLogout = () => {
    console.log('Logging out...');
    setIsMenuOpen(false); // đóng dropdown
    // TODO: Add real logout logic
  };

  const handleNavigateAndClose = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const links = [
    { to: '/', title: 'Trang Chủ', icon: LayoutDashboard },
    { to: '/product-categories', title: 'Quản Lý Loại Thực Đơn', icon: Utensils },
    { to: '/menu', title: 'Quản Lý Thực đơn', icon: Coffee },
    { to: '/kitchen', title: 'Quản Lý Bếp', icon: Flame },
    { to: '/orders', title: 'Quản Lý Đơn hàng', icon: ClipboardList },
    { to: '/pos', title: 'POS', icon: CreditCard },
    { to: '/tables', title: 'Quản Lý Bàn', icon: LayoutGrid },
    { to: '/inventory', title: 'Quản Lý Kho', icon: Boxes },
    { to: '/employees', title: 'Quản Lý Nhân Viên', icon: Users },
    { to: '/report', title: 'Báo Cáo', icon: BarChart },
    { to: '/tutorials', title: 'Công Thức / Hướng Dẫn', icon: BookOpen },
    { to: '/device', title: 'Quản Lý Thiết Bị', icon: Unplug },
    { to: '/accounts', title: 'Tài khoản', icon: User },
  ];

  return (
    <aside className="w-20 sm:w-24 bg-primary text-white flex flex-col items-center py-6 space-y-6">
      {/* Avatar + Dropdown */}
      <Menu as="div" className="relative mb-2">
  <Menu.Button className="relative flex flex-col items-center cursor-pointer focus:outline-none">
    <img
      src={user.avatar}
      alt="Avatar"
      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white"
    />
    <span className="text-xs text-center leading-tight font-medium max-w-[5rem] truncate">
      {user.name}
    </span>
    <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow">
      <Bell className="w-4 h-4 text-red-500" />
      {notifications.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full font-semibold">
          {notifications.length}
        </span>
      )}
    </div>
  </Menu.Button>

  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items className="absolute left-full top-0 z-50 mt-2 w-64 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-black">
      <div className="p-2 max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-2">Không có thông báo</div>
        ) : (
          notifications.slice(0, 10).map((note) => (
            <Menu.Item key={note.id} as="div" onClick={(e) => e.preventDefault()}>
              {({ active }) => (
                <div className={`p-2 rounded cursor-default select-none ${active ? 'bg-green-100' : ''}`}>
                  {note.text}
                </div>
              )}
            </Menu.Item>
          ))
        )}
      </div>

      {notifications.length > 10 && (
        <div className="border-t border-gray-200 px-4 py-2 text-center">
          <Menu.Item>
            {({ close }) => (
              <button
                onClick={() => {
                  navigate('/notifications');
                  close();
                }}
                className="text-green-600 text-sm font-medium hover:underline"
              >
                Xem tất cả
              </button>
            )}
          </Menu.Item>
        </div>
      )}

      {/* Footer actions */}
      <div className="border-t border-gray-200 px-4 py-2 flex flex-col gap-2">
        <Menu.Item>
          {({ close }) => (
            <button
              onClick={() => {
                navigate('/accounts');
                close();
              }}
              className="text-sm text-gray-800 hover:underline flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Cài đặt tài khoản
            </button>
          )}
        </Menu.Item>

        <Menu.Item>
          {({ close }) => (
            <button
              onClick={() => {
                setShowTitles((prev) => !prev);
                close();
              }}
              className="text-sm text-gray-800 hover:underline flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              {showTitles ? 'Đổi Icon' : 'Đổi Tiêu Đề'}
            </button>
          )}
        </Menu.Item>

        <Menu.Item>
          {({ close }) => (
            <button
              onClick={() => {
                handleLogout();
                close();
              }}
              className="text-sm text-red-600 hover:underline flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>

      {/* Navigation links */}
      {links.map(({ to, title, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          title={title}
          className="flex flex-col items-center px-4 py-2 hover:bg-green-100 rounded text-xs break-words text-center"
        >
          {showTitles ? <span>{title}</span> : <Icon className="w-6 h-6" />}
        </NavLink>
      ))}
    </aside>
  );
}