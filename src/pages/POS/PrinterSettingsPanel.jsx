import { useState } from 'react';
import { Printer, Plus, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/Separator';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Switch from '@/components/ui/Switch';

export default function PrinterSettingsPanel() {
  const [printers, setPrinters] = useState([
    { id: 1, name: 'Máy in hóa đơn', ip: '192.168.1.100', enabled: true },
    { id: 2, name: 'Máy in bếp', ip: '192.168.1.101', enabled: false },
  ]);

  const addPrinter = () => {
    setPrinters([...printers, { id: Date.now(), name: '', ip: '', enabled: true }]);
  };

  const updatePrinter = (id, field, value) => {
    setPrinters((prev) =>
      prev.map((printer) => (printer.id === id ? { ...printer, [field]: value } : printer))
    );
  };

  const removePrinter = (id) => {
    setPrinters((prev) => prev.filter((printer) => printer.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Printer className="w-6 h-6" />
          Cài đặt máy in
        </h2>
        <Button onClick={addPrinter} variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Thêm máy in
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {printers.map((printer) => (
          <Card key={printer.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="font-medium">{printer.name || 'Máy in mới'}</h3>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removePrinter(printer.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Tên máy in</label>
                <Input
                  value={printer.name}
                  onChange={(e) => updatePrinter(printer.id, 'name', e.target.value)}
                  placeholder="Nhập tên..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Địa chỉ IP</label>
                <Input
                  value={printer.ip}
                  onChange={(e) => updatePrinter(printer.id, 'ip', e.target.value)}
                  placeholder="192.168.x.x"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-700">Kích hoạt</span>
                <Switch
                  checked={printer.enabled}
                  onCheckedChange={(checked) =>
                    updatePrinter(printer.id, 'enabled', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}