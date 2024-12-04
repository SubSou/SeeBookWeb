const CheckInput = ({ isChecked = false, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <div className="checkbox">
      <label className="custom-checkbox">
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default CheckInput;
