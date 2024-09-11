const OutlinedButton = ({ onClick, icon: Icon, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-base font-medium tracking-wide flex items-center justify-center px-5 py-2 text-gray-600 transition-colors duration-300 transform border rounded-xl hover:bg-primary hover:text-white hover:border-white ${className}`}
    >
      {children}
      {Icon && <Icon className=" w-6 h-4" />}
    </button>
  );
};

export default OutlinedButton;
