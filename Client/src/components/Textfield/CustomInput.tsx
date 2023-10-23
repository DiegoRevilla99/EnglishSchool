const CustomInput = ({ label = "", name = "", type = "", minLength = 2 }) => {
  return (
    <>
      <label className="sr-only" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        name={name}
        placeholder={label}
        minLength={minLength}
        required
      />
    </>
  );
};

export default CustomInput;
