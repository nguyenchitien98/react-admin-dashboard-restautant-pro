import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

export function ScrollArea({ children, className }) {
  return (
    <ScrollAreaPrimitive.Root className={`overflow-hidden ${className}`}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex touch-none select-none p-0.5 bg-gray-200 hover:bg-gray-300 transition-colors duration-150"
      >
        <ScrollAreaPrimitive.Thumb className="flex-1 bg-gray-500 rounded" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
}