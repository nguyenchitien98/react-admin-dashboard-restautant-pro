
export default function Input({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}