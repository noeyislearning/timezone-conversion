const Button = ({ label, onClick, isActive, disabled }) => {
  if (disabled) {
    return (
      <div
        className={`px-4 py-2 border border-dashed rounded-lg cursor-not-allowed ${isActive ? "bg-gray-400 text-white border-solid" : "border-gray-400"}`}
      >
        {label}
      </div>
    );
  }

  return (
    <button
      className={`px-4 py-2 border border-dashed rounded-lg hover:border-black ${isActive ? "bg-black text-white border-solid" : "border-gray-400"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
