const DetailInput = ({ text, handleText, type = "text", disabled = false }) => {
  return (
    <div className="userinfo-content-input">
      <input
        disabled={!disabled}
        type={type}
        value={text}
        onChange={handleText}
      />
    </div>
  );
};

export default DetailInput;
