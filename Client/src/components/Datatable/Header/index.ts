import { IDataTableHeader } from "@/interfaces/IDataTable";

const headerId: IDataTableHeader = { label: "Id", field: "id", type: "string" };

const headerRowNumber: IDataTableHeader = {
  label: "#",
  field: "rowNumber",
  type: "string",
};

const roleHeaders: IDataTableHeader[] = [
  { label: "Nombre", field: "name", type: "string" },
  { label: "Descripción", field: "description", type: "string" },
];

const levelHeaders: IDataTableHeader[] = [
  { label: "Nombre", field: "name", type: "string" },
  { label: "Descripción", field: "description", type: "string" },
];

const unitHeaders: IDataTableHeader[] = [
  { label: "Nombre", field: "name", type: "string" },
];

const lessonHeaders: IDataTableHeader[] = [
  { label: "Nombre", field: "name", type: "string" },
];

const planHeaders: IDataTableHeader[] = [
  { label: "Nombre", field: "name", type: "string" },
  { label: "Descripción", field: "description", type: "string" },
  { label: "Precio", field: "price", type: "price" },
  { label: "Créditos", field: "credits", type: "number" },
  { label: "Paypal Id", field: "paypalId", type: "string" },
  { label: "Activo", field: "status", type: "boolean" },
];

const userHeaders: IDataTableHeader[] = [
  { label: "Nombre(s)", field: "firstName", type: "string" },
  { label: "Apellidos", field: "lastName", type: "string" },
  { label: "Correo", field: "email", type: "string" },
  { label: "Teléfono", field: "phone", type: "phone" },
  { label: "Rol", field: "role", type: "string" },
];

const studentHeaders: IDataTableHeader[] = [
  { label: "Nombre(s)", field: "user.firstName", type: "string" },
  { label: "Apellidos", field: "user.lastName", type: "string" },
  { label: "Correo", field: "user.email", type: "string" },
  { label: "Teléfono", field: "user.phone", type: "phone" },
  { label: "Nivel", field: "level", type: "string" },
  { label: "Verificado", field: "user.verified", type: "boolean" },
];

const teacherHeaders: IDataTableHeader[] = [
  { label: "Nombre(s)", field: "user.firstName", type: "string" },
  { label: "Apellidos", field: "user.lastName", type: "string" },
  { label: "Licencia", field: "license", type: "string" },
  { label: "Correo", field: "user.email", type: "string" },
  { label: "Teléfono", field: "user.phone", type: "phone" },
  { label: "Niveles", field: "levels", type: "arrayLevel" },
];

const sessionHeaders: IDataTableHeader[] = [
  { label: "Alumno", field: "student.name", type: "string" },
  { label: "Profesor", field: "teacher.name", type: "string" },
  { label: "Zoom Id", field: "zoomMeetingId", type: "string" },
  { label: "Duración (min)", field: "duration", type: "string" },
  { label: "Fecha", field: "sessionDate", type: "dateWithHour" },
  { label: "Primera vez", field: "isFirst", type: "boolean" },
];

const subscriptionHeaders: IDataTableHeader[] = [
  { label: "Alumno", field: "student", type: "string" },
  { label: "Plan", field: "plan", type: "string" },
  { label: "Fecha de inicio", field: "start", type: "date" },
  { label: "Fecha de vencimiento", field: "expiration", type: "date" },
  { label: "Activa", field: "status", type: "boolean" },
  { label: "Paypal Id", field: "paypalId", type: "string" },
];

const tagsHeaders: IDataTableHeader[] = [
  { label: "Nombre del Tag", field: "name", type: "string" },
];

const postHeaders: IDataTableHeader[] = [
  { label: "Título", field: "title", type: "string" },
  { label: "Contenido", field: "body", type: "string" },
  { label: "Tags", field: "tags", type: "arrayTag" },
];

export function getHeaders(tableName: string, useId: boolean) {
  let headers: IDataTableHeader[] = [];
  headers.push(useId ? headerId : headerRowNumber);

  switch (tableName) {
    case "Roles":
      headers = headers.concat(roleHeaders);
      break;
    case "Niveles":
      headers = headers.concat(levelHeaders);
      break;
    case "Unidades":
      headers = headers.concat(unitHeaders);
      break;
    case "Lecciones":
      headers = headers.concat(lessonHeaders);
      break;
    case "Planes":
      headers = headers.concat(planHeaders);
      break;
    case "Usuarios":
      headers = headers.concat(userHeaders);
      break;
    case "Estudiantes":
      headers = headers.concat(studentHeaders);
      break;
    case "Profesores":
      headers = headers.concat(teacherHeaders);
      break;
    case "Sesiones":
      headers = headers.concat(sessionHeaders);
      break;
    case "Suscripciones":
      headers = headers.concat(subscriptionHeaders);
      break;
    case "Tags":
      headers = headers.concat(tagsHeaders);
      break;
    case "Posts":
      headers = headers.concat(postHeaders);
      break;
    default:
      break;
  }

  return headers;
}
