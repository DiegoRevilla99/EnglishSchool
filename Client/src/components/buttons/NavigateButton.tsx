import { INavigateIconButtonProps } from "@/interfaces/INavigateButton";
import { IconButton, Tooltip } from "@mui/material";

const NavigateButton = (props: INavigateIconButtonProps) => {
  return (
    <Tooltip title={props.title}>
      <IconButton
        id={String(props.id || "")}
        onClick={(event) => {
          props.navigateFn(event);
        }}
      >
        {props.icon}
      </IconButton>
    </Tooltip>
  );
};

export default NavigateButton;
