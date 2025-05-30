import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';

const mockTables = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Bàn ${i + 1}`,
  status: i % 3 === 0 ? 'occupied' : 'available',
}));

export default function CustomerTablePanel({ selectedTable, setSelectedTable, customerInfo, setCustomerInfo }) {
  const [search, setSearch] = useState('');

  const filteredTables = mockTables.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Danh sách bàn */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Chọn bàn</h2>
          <Input
            placeholder="Tìm bàn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          <div className="grid grid-cols-3 gap-3">
            {filteredTables.map((table) => (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table)}
                className={`p-3 rounded-xl text-sm border transition-all
                  ${
                    selectedTable?.id === table.id
                      ? 'bg-green-600 text-white'
                      : table.status === 'occupied'
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-white hover:bg-green-50'
                  }`}
                disabled={table.status === 'occupied'}
              >
                {table.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Thông tin khách hàng */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Thông tin khách hàng</h2>
          <div className="space-y-3">
            <Input
              placeholder="Tên khách hàng"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            />
            <Input
              placeholder="Số điện thoại"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            />
            <Input
              placeholder="Ghi chú (nếu có)"
              value={customerInfo.note}
              onChange={(e) => setCustomerInfo({ ...customerInfo, note: e.target.value })}
            />
            <Separator />
            <div className="text-sm text-muted-foreground">
              Bàn đã chọn: <span className="font-semibold">{selectedTable?.name || 'Chưa chọn'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}