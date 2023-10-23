import { ModalStaff } from "../Modals/ModalStaff";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

export const LeaderCard = ({
  name = "",
  title = "",
  image = "",
  cols = "",
  modal = false,
  description = "",
  thumb = "",
}) => {
  return (
    <>
      <div className={`item ${cols}`}>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          justifyItems="center"
        >
          <Box maxWidth="18rem">
            <div className="item-inner">
              <div className="profile-holder">
                <img className="img-fluid" src={image} alt="" />
              </div>
              <div className="profile-desc">
                <h4 className="name">{name}</h4>
                <div className="title">{title}</div>
              </div>
              {modal && (
                <Link
                  className="link"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target={`#staff-modal-${name.replace(/\s|\.+/g, "")}`}
                ></Link>
              )}
            </div>
          </Box>
        </Box>
      </div>
      {modal && (
        <ModalStaff
          id={name.replace(/\s|\.+/g, "")}
          name={name}
          thumb={thumb}
          title={title}
          description={description}
        />
      )}
    </>
  );
};
