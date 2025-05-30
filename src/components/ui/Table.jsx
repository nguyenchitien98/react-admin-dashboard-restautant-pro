
export default function Table({ headers = [], data = [] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-green-100 text-gray-800 font-semibold">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-t hover:bg-green-50 transition"
            >
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}