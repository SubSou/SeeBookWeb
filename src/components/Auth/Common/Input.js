const Input = ({ placeholder, type = "", marginTop = 0, value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={"main-input"} style={{ marginTop: `${marginTop}px` }}>
      <input
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
