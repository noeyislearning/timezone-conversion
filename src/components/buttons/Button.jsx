const Button = ({ label, onClick, isActive }) => {
  return (
    <button
      className={`px-4 py-1 border border-dashed rounded-lg hover:border-black ${isActive ? "border-black" : "border-gray-300"}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button