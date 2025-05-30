import {
    CreditCard,
    Wallet,
    DollarSign,
    Printer,
    User,
    Receipt,
    BadgePercent,
    ClipboardCheck,
  } from 'lucide-react';
  import { Button } from '@/components/ui/Button';
  import Input from '@/components/ui/Input';
  import { Textarea } from '@/components/ui/Textarea';
  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
  import { Separator } from '@/components/ui/Separator';
  
  export default function CheckoutPanel({ total = 220000, onCheckout }) {
    return (
      <Card className="w-full max-w-md bg-white border shadow-xl rounded-2xl p-4 space-y-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Thanh toán</CardTitle>
        </CardHeader>
  
        <CardContent className="space-y-4">
          {/* Tổng tiền */}
          <div className="text-right text-lg font-semibold text-green-600">
            Tổng cộng: {(total / 1000).toFixed(3)}₫
          </div>
  
          {/* Phương thức thanh toán */}
          <div className="space-y-2">
            <div className="font-medium text-sm">Chọn phương thức thanh toán</div>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="flex-col">
                <DollarSign className="w-5 h-5" />
                Tiền mặt
              </Button>
              <Button variant="outline" className="flex-col">
                <CreditCard className="w-5 h-5" />
                Quẹt thẻ
              </Button>
              <Button variant="outline" className="flex-col">
                <Wallet className="w-5 h-5" />
                Ví điện tử
              </Button>
            </div>
          </div>
  
          <Separator />
  
          {/* Thông tin khách hàng */}
          <div className="space-y-2">
            <div className="font-medium text-sm">Khách hàng</div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Tên khách hàng" icon={<User className="w-4 h-4" />} />
              <Input placeholder="SĐT" />
            </div>
            <Textarea placeholder="Ghi chú..." />
          </div>
  
          {/* Mã khuyến mãi */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Mã giảm giá</span>
            </div>
            <Input placeholder="Nhập mã khuyến mãi" />
          </div>
  
          <Separator />
  
          {/* Xác nhận thanh toán */}
          <div className="flex flex-col gap-2">
            <Button
              className="w-full bg-green-600 text-white text-sm font-bold py-2"
              onClick={onCheckout}
            >
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Xác nhận thanh toán & Tạo đơn
            </Button>
            <Button variant="outline" className="w-full text-sm">
              <Printer className="w-4 h-4 mr-2" />
              In hóa đơn
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }