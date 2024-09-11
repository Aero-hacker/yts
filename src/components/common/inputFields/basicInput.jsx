const BasicInput = ({
  icon: Icon,
  placeholder,
  type,
  inputClass,
  name,
  onChange,
}) => {
  return (
    <div className="relative flex items-center mt-2">
      <span className="absolute">
        {Icon && <Icon className="text-gray-500 w-6 h-6 mx-3 mr-6" />}
      </span>

      <input
        onChange={onChange}
        name={name}
        type={type}
        className={`block text-base w-full py-3 text-gray-700 bg-white border rounded-xl px-11 focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 ${inputClass}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default BasicInput;
