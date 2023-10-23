import dayjs from "dayjs";
import es from "dayjs/locale/es";

import Subscription from "@/models/Subscription";

import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

import Checked from "@/assets/images/checked.png";
import Cross from "@/assets/images/cross.png";

export default function SubCard({ item }: { item: Subscription }) {
  function getDateString(date: string) {
    const subDate = dayjs(date);

    if (subDate.diff(dayjs(), "days") < 0) {
      return `Expiró: ${subDate
        .locale(es)
        .format("MMM D, YYYY")
        .toLocaleUpperCase()}`;
    }

    return `Expira: ${subDate
      .locale(es)
      .format("MMM D, YYYY")
      .toLocaleUpperCase()}`;
  }

  return (
    <Card
      sx={{
        height: 1,
        padding: 2,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          item.id === "-1" ? "#e0c23c" : item.status ? "#183E70" : "#EA583E",
      }}
    >
      <Grid
        container
        spacing={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={8} md={9}>
          <CardContent sx={{ flex: "1 auto" }}>
            <Typography component="div" variant="h5">
              {typeof item.plan === "string"
                ? String(item.plan)
                : String(item.plan.name)}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {getDateString(item.expiration)}
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CardMedia
            component="img"
            sx={{ maxHeight: 0.5, maxWidth: 0.5 }}
            image={item.status ? Checked : Cross}
            alt="Image"
          />
        </Grid>
      </Grid>
    </Card>
  );
}
