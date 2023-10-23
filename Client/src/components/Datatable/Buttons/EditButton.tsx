import { ITableButtonProps } from "@/interfaces/IDataTable";

import { EditOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const EditButton = ({ fn, item }: ITableButtonProps) => {
  return (
    <Tooltip title="Editar">
      <IconButton
        id={`editElement#${item.user?.id || item.id}`}
        onClick={(event) => {
          if (fn) {
            fn(event);
          }
        }}
      >
        <EditOutlined />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
