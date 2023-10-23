import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type Props = {
  badgeLabel?: string;
  title: string;
  description?: string;
  to: string;
  icon: string;
  badge?: boolean;
  handleDeleteFile: (title: string) => void;
};

interface FileImage {
  [key: string]: string;
  jpeg: string;
  jpg: string;
  png: string;
  pdf: string;
  docx: string;
  xlsx: string;
  ppt: string;
  pptx: string;
  other: string;
  link: string;
}

const fileType: FileImage = {
  jpeg: "fa-solid fa-file-image",
  jpg: "fa-solid fa-file-image",
  png: "fa-solid fa-file-image",
  pdf: "fas fa-file-pdf pdf-file",
  docx: "fas fa-file-word word-file",
  xlsx: "fas fa-file-excel excel-file",
  ppt: "fas fa-file-powerpoint powerpoint-file",
  pptx: "fas fa-file-powerpoint powerpoint-file",
  other: "fa-solid fa-file",
  link: "fa-solid fa-link",
};

export const DocCard = ({
  badgeLabel = "",
  title = "Lorem Ipsum",
  description = "",
  to = "#",
  icon = "other",
  badge = false,
  handleDeleteFile,
}: Props) => {
  return (
    <Box className="item col-6 col-md-4 col-lg-3" zIndex={20}>
      <div className="item-inner">
        <div className="thumb-holder">
          <span className="icon-holder">
            <i className={fileType[icon]}></i>
          </span>
          {badge && <span className="badge bg-success">{badgeLabel}</span>}
        </div>

        <Box className="desc" height="7rem" overflow="hidden">
          <h4 className="title" style={{ wordBreak: "break-all" }}>
            {to !== "#" ? (
              <Link to={title} target="_blank">
                {title}
              </Link>
            ) : (
              <>{title}</>
            )}
          </h4>
          <div className="intro">{description}</div>
        </Box>

        {/* <Link className="link" to={to}></Link> */}
        <Box display="flex" flexDirection="row-reverse">
          <Box zIndex={20}>
            <IconButton color="error" onClick={() => handleDeleteFile(title)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </Box>
      </div>
    </Box>
  );
};
