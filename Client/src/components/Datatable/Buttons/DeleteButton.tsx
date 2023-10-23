import { ITableButtonProps } from "@/interfaces/IDataTable";

import { DeleteOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const DeleteButton = ({ fn, item }: ITableButtonProps) => {
  return (
    <Tooltip title="Eliminar">
      <IconButton
        id={`deleteElement#${item.user?.id || item.id}`}
        onClick={(event) => {
          if (fn) {
            fn(event);
          }
        }}
      >
        <DeleteOutlined />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
