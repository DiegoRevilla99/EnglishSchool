import dayjs from "dayjs";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import SessionBooked from "@/assets/images/classTaken.jpeg";
import SessionToBook from "@/assets/images/takeClass.jpeg";

export default function SessionDetails({
  sessionDate,
  isBooked,
}: {
  sessionDate: string;
  isBooked?: boolean;
}) {
  const details = dayjs(sessionDate);

  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          alt="Imagen"
          sx={{ backgroundPosition: "start" }}
          image={isBooked ? SessionBooked : SessionToBook}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Clase: {details.locale("es").format("dddd, MMMM D, YYYY")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hora de entrada:{" "}
            <strong>{details.locale("es").format("h:mm A")}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hora de salida:{" "}
            <strong>
              {details.add(1, "hour").locale("es").format("h:mm A")}
            </strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duración: <strong>60 minutos</strong>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
