const TextAreaField = ({ label = "", name = "", rows = 2 }) => {
  return (
    <>
      <label className="sr-only" htmlFor="cmessage">
        {label}
      </label>
      <textarea
        className="form-control"
        id={name}
        name={name}
        placeholder={label}
        rows={rows}
        required
      ></textarea>
    </>
  );
};

export default TextAreaField;
