import { ScrollArea } from "@/components/ui/Scroll-area";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Minus, Plus, Trash2, CreditCard, DollarSign } from "lucide-react";
import { useState } from "react";

export default function CartPanel() {
  const [items, setItems] = useState([
    { id: 1, name: "Trà đào", price: 35000, quantity: 2, note: "" },
    { id: 2, name: "Bánh mì gà", price: 40000, quantity: 1, note: "" },
  ]);

  const handleQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleNoteChange = (id, note) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card className="h-full flex flex-col shadow-lg rounded-2xl border">
      <CardContent className="p-4 flex flex-col gap-4 h-full">
        <h2 className="text-lg font-semibold">🛒 Giỏ hàng</h2>
        <ScrollArea className="flex-1 pr-2">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="border rounded-xl p-3">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleQuantity(item.id, -1)}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button size="icon" variant="ghost" onClick={() => handleQuantity(item.id, 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <Input
                  placeholder="Ghi chú món..."
                  value={item.note}
                  onChange={(e) => handleNoteChange(item.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Tổng cộng:</span>
            <span className="font-bold text-lg text-green-600">{total.toLocaleString()}đ</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="flex items-center gap-2 justify-center">
              <CreditCard className="w-4 h-4" />
              Thẻ
            </Button>
            <Button variant="outline" className="flex items-center gap-2 justify-center">
              <DollarSign className="w-4 h-4" />
              Tiền mặt
            </Button>
          </div>

          <Button className="w-full mt-2 text-white font-bold bg-green-600 hover:bg-green-700">
            Tạo đơn & Thanh toán
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}