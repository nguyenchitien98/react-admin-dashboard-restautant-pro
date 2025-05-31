import { useState } from 'react';
import { Monitor, Printer, TabletSmartphone, Wifi, Settings, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import Input from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/Scroll-area';

const sampleDevices = [
  { id: 1, name: 'POS Quầy Thu Ngân', type: 'pos', status: 'online', location: 'Quầy chính' },
  { id: 2, name: 'Máy in hóa đơn', type: 'printer', status: 'online', location: 'Quầy' },
  { id: 3, name: 'Máy in bếp', type: 'printer', status: 'offline', location: 'Bếp chính' },
  { id: 4, name: 'Tablet phục vụ', type: 'mobile', status: 'online', location: 'Khu A' },
  { id: 5, name: 'KDS Bếp', type: 'kds', status: 'online', location: 'Bếp phụ' },
  { id: 6, name: 'Router mạng', type: 'network', status: 'online', location: 'Phòng kỹ thuật' },
];

const deviceTypeMap = {
  all: { icon: Monitor, label: 'Tất cả' },
  pos: { icon: TabletSmartphone, label: 'Máy POS' },
  printer: { icon: Printer, label: 'Máy in' },
  mobile: { icon: TabletSmartphone, label: 'Thiết bị cầm tay' },
  kds: { icon: Eye, label: 'Màn hình bếp' },
  network: { icon: Wifi, label: 'Thiết bị mạng' },
};

export default function DeviceManagementPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevices = sampleDevices.filter(
    (d) =>
      (filter === 'all' || d.type === filter) &&
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold mb-4 text-primary">Quản lý thiết bị</h1>
        </div>
      <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="mb-4">
        <TabsList className="grid grid-cols-6 gap-1">
          {Object.entries(deviceTypeMap).map(([key, { icon: Icon, label }]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mb-4">
        <Input
          placeholder="Tìm thiết bị..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredDevices.map((device) => (
            <Card key={device.id} className="p-4 shadow border">
              <CardContent className="space-y-2">
                <div className="font-semibold text-lg">{device.name}</div>
                <div className="text-sm text-gray-500">Vị trí: {device.location}</div>
                <div
                  className={`text-sm font-medium ${
                    device.status === 'online' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  Trạng thái: {device.status === 'online' ? 'Đang hoạt động' : 'Mất kết nối'}
                </div>
                <Button variant="outline" className="w-full">
                  Cài đặt thiết bị
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredDevices.length === 0 && (
          <div className="text-center text-gray-500 italic py-10">Không tìm thấy thiết bị nào</div>
        )}
      </ScrollArea>
    </div>
  );
}
