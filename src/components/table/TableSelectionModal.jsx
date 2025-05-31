// src/components/table/TableSelectionModal.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

export default function TableSelectionModal({ open, onClose, onSelect }) {
  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chọn bàn</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {tables.map((table) => (
            <Button
              key={table}
              onClick={() => {
                onSelect(table);
                onClose();
              }}
              className="py-6 text-lg"
            >
              Bàn {table}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}