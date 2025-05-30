import React, { useState } from 'react';

export function Tabs({ defaultValue, children, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const childrenWithProps = React.Children.map(children, child => {
    if (child.type === TabsList) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    if (child.type === TabsContent) {
      return child.props.value === activeTab ? child : null;
    }
    return child;
  });

  return <div className={className}>{childrenWithProps}</div>;
}

export function TabsList({ children, activeTab, setActiveTab, className = '' }) {
  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, { activeTab, setActiveTab });
  });

  return <div className={`flex gap-2 ${className}`}>{childrenWithProps}</div>;
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded-xl text-sm font-medium ${
        isActive ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <div className="mt-4">{children}</div>;
}