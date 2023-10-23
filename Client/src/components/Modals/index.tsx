import { IModalProps } from "@/interfaces/IModal";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

const ModalContainer = ({ maxWidth = "md", ...props }: IModalProps) => {
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={props.open}
      onClose={props.closeFn}
    >
      <DialogTitle>
        <Typography variant="h5" color="primary">
          {props.title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={props.closeFn}
          sx={{
            color: "red",
            position: "absolute",
            right: 14,
            top: 8,
          }}
        >
          <CloseOutlined />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ paddingTop: 2 }}>{props.children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalContainer;
