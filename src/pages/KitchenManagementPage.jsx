import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

const STATUS = {
  PENDING: 'Chờ xử lý',
  IN_PROGRESS: 'Đang làm',
  COMPLETED: 'Hoàn thành',
};

export default function KitchenManagementPage() {
  const [orders, setOrders] = useState([
    {
      id: 101,
      items: [
        { name: 'Cà phê sữa', quantity: 2 },
        { name: 'Bánh tráng trộn', quantity: 1 },
        { name: 'Bánh tráng trộn', quantity: 1 },
      ],
      status: STATUS.IN_PROGRESS,
    },
    {
      id: 102,
      items: [{ name: 'Trà đào', quantity: 1 }],
      status: STATUS.PENDING,
    },
    {
      id: 103,
      items: [{ name: 'Trà đào', quantity: 1 }],
      status: STATUS.PENDING,
    },
  ]);

  const changeStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Bếp</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map(order => (
            <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col space-y-3"
            >
            <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-green-700">
                Order #{order.id}
                </span>
                <span
                className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                    order.status === STATUS.PENDING
                    ? 'bg-yellow-400'
                    : order.status === STATUS.IN_PROGRESS
                    ? 'bg-blue-500'
                    : 'bg-green-600'
                }`}
                >
                {order.status}
                </span>
            </div>

            <div>
                {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-700">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                </div>
                ))}
            </div>

            <div className="flex justify-end space-x-3">
                {order.status === STATUS.PENDING && (
                <Button
                    onClick={() => changeStatus(order.id, STATUS.IN_PROGRESS)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                    Bắt đầu làm
                </Button>
                )}
                {order.status === STATUS.IN_PROGRESS && (
                <Button
                    onClick={() => changeStatus(order.id, STATUS.COMPLETED)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    Hoàn thành
                </Button>
                )}
            </div>
            </div>
        ))}
      </div>
    </div>
    
  );
}
