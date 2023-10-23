import { useNavigate } from "react-router-dom";

import { IReturnButtonProps } from "@/interfaces/INavigateButton";
import { BLACK_BUTTON_STYLE } from "@/utils/theme";

import { Button, Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const ReturnButton = ({ xs = 12, ...props }: IReturnButtonProps) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={xs}>
      <Button
        fullWidth
        color="warning"
        variant="contained"
        sx={BLACK_BUTTON_STYLE}
        onClick={() => navigate(-1)}
      >
        <ArrowBack />
      </Button>
    </Grid>
  );
};

export default ReturnButton;
