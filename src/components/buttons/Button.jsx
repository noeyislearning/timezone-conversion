const Button = ({ label, onClick, isActive }) => {
  return (
    <button
      className={`px-4 py-2 border border-dashed rounded-lg hover:border-black ${isActive ? "bg-black text-white border-solid" : "border-gray-400"}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button