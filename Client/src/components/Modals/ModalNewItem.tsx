export const ModalNewItem = ({
  index = 0,
  title = "",
  date = "",
  image = "",
  paragraphs = [""],
}) => {
  return (
    <div
      id={`news-modal-${index + 1}`}
      className="news-modal modal modal-fullscreen"
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4
              className="modal-title text-center"
              id={`newsModal${index + 1}Label`}
            >
              {title}
            </h4>
          </div>

          <div className="modal-body">
            <div className="meta text-center">{date}</div>
            <div className="post">
              <p>
                <img className="img-fluid" src={image} alt="" />
              </p>

              {paragraphs.map((data) => {
                return <p>{data}</p>;
              })}
            </div>
          </div>

          <div className="modal-footer text-center">
            <button
              type="button"
              className="btn btn-primary mx-auto"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
