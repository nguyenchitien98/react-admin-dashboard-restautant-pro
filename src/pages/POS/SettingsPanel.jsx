import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import { Separator } from '@/components/ui/Separator';
import { Button } from '@/components/ui/Button';

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    enableDiscount: true,
    enableNote: true,
    autoPrint: false,
    requireCashierPIN: false,
    currencySymbol: '₫',
    theme: 'light',
  });

  const handleChange = (key, value) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };
  
      // Áp dụng class 'dark' vào <html> nếu đổi theme
      if (key === 'theme') {
        const root = document.documentElement;
        if (value === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
  
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Cài đặt POS
        </h2>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="font-medium">Tuỳ chọn hệ thống</CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Cho phép giảm giá</span>
              <Switch
                checked={settings.enableDiscount}
                onCheckedChange={(value) =>
                  handleChange('enableDiscount', value)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Cho phép ghi chú món</span>
              <Switch
                checked={settings.enableNote}
                onCheckedChange={(value) => handleChange('enableNote', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Tự động in khi tạo đơn</span>
              <Switch
                checked={settings.autoPrint}
                onCheckedChange={(value) => handleChange('autoPrint', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Yêu cầu PIN khi thanh toán</span>
              <Switch
                checked={settings.requireCashierPIN}
                onCheckedChange={(value) =>
                  handleChange('requireCashierPIN', value)
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="font-medium">Tuỳ chọn giao diện</CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Ký hiệu tiền tệ
              </label>
              <Input
                value={settings.currencySymbol}
                onChange={(e) =>
                  handleChange('currencySymbol', e.target.value)
                }
                placeholder="₫, $, €..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Giao diện</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
              >
                <option value="light">Sáng</option>
                <option value="dark">Tối</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-right">
        <Button onClick={() => alert('✅ Đã lưu cài đặt')}>Lưu thay đổi</Button>
      </div>
    </div>
  );
}