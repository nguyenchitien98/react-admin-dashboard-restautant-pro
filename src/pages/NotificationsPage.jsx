import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotificationsPage() {
  const navigate = useNavigate();

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

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="mb-4 flex items-center text-green-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại Dashboard
      </button>

      <h1 className="text-2xl font-bold text-green-700 mb-4">Tất cả thông báo</h1>

      <div className="bg-white rounded-xl shadow p-4 space-y-3">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="p-3 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition"
          >
            {note.text}
          </div>
        ))}
      </div>
    </div>
  );
}