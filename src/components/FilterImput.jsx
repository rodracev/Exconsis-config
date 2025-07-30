// components/FilterInput.jsx
export default function FilterInput({ label, name, value, onChange, placeholder }) {
    return (
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }