import { Button, Grid } from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";

import { IFiltersProps } from "@/interfaces/IDataTable";
import ReturnButton from "@/components/Buttons/ReturnButton";

import { BLACK_BUTTON_STYLE } from "@/utils/theme";

const Filters = (props: IFiltersProps) => {
  const getRefreshSize = () => {
    if (props.allowCreate && props.allowReturn) return 3;

    if (props.allowCreate && !props.allowReturn) return 6;

    if (!props.allowCreate && props.allowReturn) return 6;

    return 12;
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item xs={12} sm={12} lg={7}>
        <Grid container alignItems="center" justifyContent="start" spacing={1}>
          {props.filters}
        </Grid>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Grid container alignItems="center" justifyContent="end" spacing={1}>
          {props.allowCreate && (
            <Grid item xs={6} lg={3} display="flex" justifyContent="end">
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<Add />}
                sx={BLACK_BUTTON_STYLE}
                onClick={(event) => {
                  if (props.createFn) {
                    props.createFn(event);
                  }
                }}
              >
                Nuevo
              </Button>
            </Grid>
          )}
          <Grid item xs={getRefreshSize()} lg={2}>
            <Button
              fullWidth
              sx={BLACK_BUTTON_STYLE}
              onClick={(event) => props.refreshFn(event)}
            >
              <Refresh color="inherit" />
            </Button>
          </Grid>
          {props.allowReturn && (
            <Grid item xs={3} lg={2}>
              <ReturnButton xs={12} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Filters;
