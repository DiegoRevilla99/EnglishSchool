import dayjs from "dayjs";
import es from "dayjs/locale/es";

import Level from "@/models/Level";
import Tag from "@/models/Tag";

import { IDataTableCell } from "@/interfaces/IDataTable";

import { Box, Chip } from "@mui/material";

const Cell = (props: IDataTableCell) => {
  const getBooleanString = () => {
    switch (props.label) {
      case "Verificado":
        return props.value ? "Verificado" : "No verificado";

      case "Activo":
        return props.value ? "Activo" : "Inactivo";

      case "Activa":
        return props.value ? "Suscrito" : "Cancelado";

      default:
        return props.value ? "Si" : "No";
    }
  };

  switch (props.type) {
    case "boolean":
      return (
        <td data-label={props.label}>
          <Chip
            label={getBooleanString()}
            color={props.value ? "success" : "error"}
          />
        </td>
      );

    case "price":
      return (
        <td data-label={props.label}>
          {new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
          }).format(props.value)}
        </td>
      );

    case "number":
      return (
        <td data-label={props.label}>
          {new Intl.NumberFormat("es-MX").format(props.value)}
        </td>
      );

    case "date":
      return (
        <td data-label={props.label}>
          {dayjs(props.value).locale(es).format("LL")}
        </td>
      );

    case "dateWithHour":
      return (
        <td data-label={props.label}>
          {dayjs(props.value).locale(es).format("LL LT A")}
        </td>
      );

    case "arrayLevel":
      return (
        <td data-label={props.label}>
          <Box
            sx={{
              gap: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.value.map((item: Level) => {
              return (
                <Chip
                  key={item.id}
                  label={item.name}
                  size="small"
                  color="warning"
                />
              );
            })}
          </Box>
        </td>
      );

    case "arrayTag":
      return (
        <td data-label={props.label}>
          <Box
            sx={{
              gap: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.value.map((item: Tag) => {
              return (
                <Chip
                  key={item.name}
                  label={item.name}
                  size="small"
                  color="warning"
                />
              );
            })}
          </Box>
        </td>
      );

    default:
      return <td data-label={props.label}>{props.value}</td>;
  }
};

export default Cell;
