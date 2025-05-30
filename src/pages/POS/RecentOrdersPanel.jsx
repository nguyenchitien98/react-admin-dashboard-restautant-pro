import { useState } from 'react';
import { ScrollArea } from '@/components/ui/Scroll-area';
import { Badge } from '@/components/ui/Badge';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/Separator';

const mockOrders = [
  {
    id: 'ORD-00123',
    table: 'Bàn 3',
    customer: 'Nguyễn Văn A',
    createdAt: new Date(),
    total: 185000,
    status: 'paid',
  },
  {
    id: 'ORD-00122',
    table: 'Mang đi',
    customer: '',
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
    total: 89000,
    status: 'processing',
  },
  {
    id: 'ORD-00121',
    table: 'Bàn 7',
    customer: 'Lê Thị B',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    total: 45000,
    status: 'cancelled',
  },
];

const statusMap = {
  paid: { label: 'Đã thanh toán', color: 'green' },
  processing: { label: 'Đang xử lý', color: 'blue' },
  cancelled: { label: 'Đã huỷ', color: 'red' },
};

export default function RecentOrdersPanel() {
  const [orders] = useState(mockOrders);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">🕒 Đơn gần đây</h2>
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-4 hover:shadow cursor-pointer transition"
            >
              <div className="flex justify-between items-center">
                <div className="font-medium text-lg">{order.id}</div>
                <Badge color={statusMap[order.status].color}>
                  {statusMap[order.status].label}
                </Badge>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {order.customer || 'Khách lẻ'} - {order.table}
              </div>
              <div className="text-sm text-gray-400">
                {format(order.createdAt, 'HH:mm dd/MM/yyyy')}
              </div>
              <Separator className="my-2" />
              <div className="text-right font-semibold text-green-600">
                {order.total.toLocaleString()} ₫
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}