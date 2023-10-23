import { Box, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

interface IRemoveComment {
  commentId: number;
  userId: string;
  parentId: number;
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
  deleteComment: MutationTrigger<any>;
}

const CommentSettings = ({
  commentId,
  userId,
  parentId,
  setEditState,
  deleteComment,
}: IRemoveComment) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteComment = () => {
    deleteComment({ commentId, userId, parentId });
    setAnchorEl(null);
  };
  const handleEditComment = () => {
    setEditState(true);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleEditComment}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Editar
        </MenuItem>
        <MenuItem onClick={handleDeleteComment}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Eliminar
        </MenuItem>
      </Menu>
    </>
  );
};

export default CommentSettings;
