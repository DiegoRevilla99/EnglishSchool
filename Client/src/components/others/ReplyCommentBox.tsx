import { Avatar, Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import IFormikProps from "@/interfaces/IFormikProps";

import Auth from "@/models/Auth";

interface Props {
  formik: IFormikProps["formik"];
  currentUser: Auth | null;
  handleCancelLeaveReply: () => void;
  isLoadingCreateComment: boolean;
}

const ReplyCommentBox = ({
  formik,
  currentUser,
  handleCancelLeaveReply,
  isLoadingCreateComment,
}: Props) => {
  return (
    <Box
      display="flex"
      className="comment-item-box"
      ml={5}
      flexDirection="column"
    >
      <Box>
        <div className="comment-author">
          <Avatar sx={{ bgcolor: "#61b3ea" }} variant="square">
            {currentUser ? currentUser?.firstName.charAt(0) : "X"}
          </Avatar>
        </div>
        <TextField
          label="Escribe tu comentario"
          variant="standard"
          fullWidth
          multiline
          value={formik.values.content}
          name="content"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={
            formik.touched.content && formik.errors.content ? (
              <>{formik.errors.content}</>
            ) : null
          }
        />
      </Box>
      <Box display="flex" justifyContent="right" pt={3}>
        <Button
          variant="contained"
          size="small"
          onClick={handleCancelLeaveReply}
          sx={{
            backgroundColor: "#2c3d4f",
            border: `2px solid #2c3d4f`,
            transition:
              "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
            "&:hover": {
              background: "transparent",
              boxShadow: 0,
              color: "#2c3d4f",
            },
          }}
        >
          Cancelar
        </Button>

        <LoadingButton
          size="small"
          type="submit"
          variant="contained"
          onClick={formik.submitForm}
          loading={isLoadingCreateComment}
          sx={{
            ml: 4,
            backgroundColor: "#61b3ea",
            border: `2px solid #61b3ea`,
            transition:
              "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
            "&:hover": {
              background: "transparent",
              boxShadow: 0,
              color: "#61b3ea",
            },
          }}
        >
          Responder
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ReplyCommentBox;
