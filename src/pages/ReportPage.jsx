import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { Button } from '@/components/ui/Button';
import { Calendar } from 'lucide-react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const COLORS = ['#22c55e', '#3b82f6'];

const originalDailyRevenue = [
  { date: '2025-05-23', revenue: 320000 },
  { date: '2025-05-24', revenue: 400000 },
  { date: '2025-05-28', revenue: 280000 },
  { date: '2025-05-29', revenue: 500000 },
  { date: '2025-05-30', revenue: 420000 },
];

const originalTopItems = [
  { name: 'Trà sữa trân châu', quantity: 120 },
  { name: 'Cà phê sữa đá', quantity: 95 },
  { name: 'Khoai tây chiên', quantity: 90 },
  { name: 'Soda bạc hà', quantity: 70 },
  { name: 'Bánh mì trứng', quantity: 65 },
];

const originalHourlyOrders = [
  { hour: '7h', orders: 10 },
  { hour: '9h', orders: 20 },
  { hour: '11h', orders: 30 },
  { hour: '13h', orders: 25 },
  { hour: '15h', orders: 18 },
  { hour: '17h', orders: 35 },
  { hour: '19h', orders: 50 },
  { hour: '21h', orders: 40 },
];

const categoryRatio = [
  { name: 'Đồ uống', value: 65 },
  { name: 'Đồ ăn', value: 35 },
];

const timeRanges = [
  'Hôm nay',
  'Hôm qua',
  'Tuần này',
  'Tuần trước',
  'Tháng này',
  'Tuỳ chọn...',
];

// Popover component tự viết, đơn giản, không dùng thư viện ngoài
function Popover({ children, className }) {
  return <div className={`relative inline-block ${className || ''}`}>{children}</div>;
}

function PopoverTrigger({ children, onClick }) {
  return React.cloneElement(children, { onClick, type: 'button' });
}

function PopoverContent({ children, isOpen }) {
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 z-20 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
      {children}
    </div>
  );
}

export default function ReportPage() {
  const [selectedRange, setSelectedRange] = useState('Tuần này');
  const [customRange, setCustomRange] = useState({
    from: dayjs().startOf('week').toDate(),
    to: dayjs().endOf('week').toDate(),
  });
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const popoverRef = useRef(null);

  // Đóng popover khi click ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setPopoverOpen(false);
      }
    }
    if (popoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popoverOpen]);

  // Cập nhật dữ liệu khi customRange thay đổi
  useEffect(() => {
    const filtered = originalDailyRevenue.filter(item => {
      const d = dayjs(item.date);
      return d.isBetween(dayjs(customRange.from).startOf('day'), dayjs(customRange.to).endOf('day'), null, '[]');
    });
    setDailyRevenue(filtered);
  }, [customRange]);

  const formatDate = (d) => dayjs(d).format('DD/MM/YYYY');

  const getRangeLabel = () => {
    if (selectedRange === 'Tuỳ chọn...') {
      return `${formatDate(customRange.from)} - ${formatDate(customRange.to)}`;
    }
    return selectedRange;
  };

  const handleSelectRange = (range) => {
    setSelectedRange(range);
    setPopoverOpen(false);
    setShowCustomPicker(range === 'Tuỳ chọn...');

    const today = dayjs();

    switch (range) {
      case 'Hôm nay':
        setCustomRange({
          from: today.startOf('day').toDate(),
          to: today.endOf('day').toDate(),
        });
        break;
      case 'Hôm qua':
        setCustomRange({
          from: today.subtract(1, 'day').startOf('day').toDate(),
          to: today.subtract(1, 'day').endOf('day').toDate(),
        });
        break;
      case 'Tuần này':
        setCustomRange({
          from: today.startOf('week').toDate(),
          to: today.endOf('week').toDate(),
        });
        break;
      case 'Tuần trước':
        setCustomRange({
          from: today.startOf('week').subtract(1, 'week').toDate(),
          to: today.endOf('week').subtract(1, 'week').toDate(),
        });
        break;
      case 'Tháng này':
        setCustomRange({
          from: today.startOf('month').toDate(),
          to: today.endOf('month').toDate(),
        });
        break;
      case 'Tuỳ chọn...':
        // giữ nguyên customRange
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Báo cáo</h1>
        <div ref={popoverRef}>
          <Popover>
            <PopoverTrigger onClick={() => setPopoverOpen(!popoverOpen)}>
              <Button variant="outline" className=" text-white border-green-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{getRangeLabel()}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent isOpen={popoverOpen}>
              <ul className="space-y-1 p-2">
                {timeRanges.map((r) => (
                  <li key={r}>
                    <button
                      type="button"
                      className={`w-full text-left px-3 py-1 rounded ${
                        selectedRange === r ? 'bg-green-100 font-semibold' : 'hover:bg-green-100'
                      }`}
                      onClick={() => handleSelectRange(r)}
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {showCustomPicker && (
        <div className="flex gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Từ ngày</label>
            <input
              type="date"
              value={dayjs(customRange.from).format('YYYY-MM-DD')}
              onChange={e => {
                const newFrom = dayjs(e.target.value).toDate();
                setCustomRange((prev) => ({
                  from: newFrom,
                  to: dayjs(prev.to).isBefore(newFrom) ? newFrom : prev.to,
                }));
              }}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Đến ngày</label>
            <input
              type="date"
              value={dayjs(customRange.to).format('YYYY-MM-DD')}
              onChange={e => {
                const newTo = dayjs(e.target.value).toDate();
                setCustomRange((prev) => ({
                  from: dayjs(prev.from).isAfter(newTo) ? newTo : prev.from,
                  to: newTo,
                }));
              }}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>
      )}

      {/* Doanh thu theo ngày */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Doanh thu theo ngày</h2>
          {dailyRevenue.length === 0 ? (
            <p className="text-gray-500">Không có dữ liệu trong khoảng thời gian này.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyRevenue}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(str) => dayjs(str).format('DD/MM')}
                />
                <YAxis
                  tickFormatter={(value) => (value / 1000).toFixed(0) + 'k'}
                />
                <Tooltip
                  formatter={(value) =>
                    new Intl.NumberFormat('vi-VN').format(value) + '₫'
                  }
                  labelFormatter={(label) => dayjs(label).format('DD/MM/YYYY')}
                />
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Top món bán chạy */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Top món bán chạy</h2>
          <ul className="space-y-2">
            {originalTopItems.map((item, idx) => (
              <li key={idx} className="flex justify-between text-gray-700">
                <span>{item.name}</span>
                <span>{item.quantity} món</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Khung giờ cao điểm */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Khung giờ cao điểm</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={originalHourlyOrders}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tỷ lệ đồ uống vs đồ ăn */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Tỷ lệ Đồ uống / Đồ ăn</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryRatio}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoryRatio.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}