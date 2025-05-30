
export function Popover({ children, className }) {
  // Đây là wrapper chứa PopoverTrigger và PopoverContent
  return <div className={`relative inline-block ${className || ''}`}>{children}</div>;
}

export function PopoverTrigger({ children, onClick }) {
  // Gán onClick cho trigger
  // Chỉ nhận 1 element con, clone để thêm props onClick
  return React.cloneElement(children, { onClick });
}

export function PopoverContent({ children, isOpen }) {
  if (!isOpen) return null;
  return (
    <div
      className="absolute z-20 mt-2 w-56 bg-white border rounded shadow-lg"
      style={{ minWidth: '224px' }}
    >
      {children}
    </div>
  );
}