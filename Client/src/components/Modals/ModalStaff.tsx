export const ModalStaff = ({
  id = "0",
  thumb = "",
  name = "",
  title = "",
  description = "",
}) => {
  return (
    <div
      id={`staff-modal-${id}`}
      className="staff-modal modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="staffModal1Label"
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
          </div>

          <div className="modal-body">
            <div className="profile-meta text-center">
              <img className="img-fluid profile-image" src={thumb} alt="" />
              <div className="profile-desc">
                <h4 className="name">{name}</h4>
                <div className="title">{title}</div>
              </div>
            </div>

            <div className="profile-info">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
