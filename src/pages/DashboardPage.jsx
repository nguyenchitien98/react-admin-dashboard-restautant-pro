import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, DollarSign, Flame, Coffee } from 'lucide-react';

const stats = [
  {
    label: 'Đơn hàng hôm nay',
    value: 128,
    icon: <ShoppingCart className="text-green-600 w-6 h-6" />,
  },
  {
    label: 'Doanh thu hôm nay',
    value: '3,500,000đ',
    icon: <DollarSign className="text-green-600 w-6 h-6" />,
  },
  {
    label: 'Món bán chạy',
    value: 'Trà sữa trân châu',
    icon: <Coffee className="text-green-600 w-6 h-6" />,
  },
  {
    label: 'Bếp đang hoạt động',
    value: '3/4 bếp',
    icon: <Flame className="text-green-600 w-6 h-6" />,
  },
];

const orderData = [
  { name: 'T2', orders: 90 },
  { name: 'T3', orders: 110 },
  { name: 'T4', orders: 70 },
  { name: 'T5', orders: 120 },
  { name: 'T6', orders: 100 },
  { name: 'T7', orders: 140 },
  { name: 'CN', orders: 130 },
];

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Trang chủ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-4 flex items-center gap-4">
            {stat.icon}
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-lg font-semibold text-green-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Biểu đồ đơn hàng theo ngày</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={orderData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}