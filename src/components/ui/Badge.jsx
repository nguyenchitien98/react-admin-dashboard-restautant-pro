export function Badge({ children, color = 'gray', className = '' }) {
    const colorMap = {
      green: 'bg-green-100 text-green-800',
      blue: 'bg-blue-100 text-blue-800',
      red: 'bg-red-100 text-red-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      gray: 'bg-gray-100 text-gray-800',
    };
  
    return (
      <span
        className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${colorMap[color] || colorMap.gray} ${className}`}
      >
        {children}
      </span>
    );
  }