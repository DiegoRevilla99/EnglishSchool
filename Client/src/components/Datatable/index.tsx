import * as _ from "lodash";

import { IDataTable } from "@/interfaces/IDataTable";

import { Box, Typography } from "@mui/material";

import Cell from "./Cell";
import Loader from "./Loader";
import Filters from "./Filters";
import Actions from "./Action";

import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";

import NoData from "@/assets/images/no-data.jpg";
import ErrorData from "@/assets/images/error-data.jpg";

const DataTable = ({
  filters = <></>,
  actions = null,
  allowEdit = true,
  allowDelete = true,
  allowReturn = false,
  allowCreate = true,
  ...props
}: IDataTable) => {
  return (
    <Box
      sx={{
        padding: 4,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container">
        {props.loading ? (
          <Loader rows={props.headers.length} />
        ) : (
          <>
            <Filters
              allowReturn={allowReturn}
              filters={filters}
              allowCreate={allowCreate}
              createFn={props.createFn}
              refreshFn={props.refreshFn}
            />
            <table className="styled-table" style={{ marginTop: 35 }}>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  {props.headers.map((header, index) => {
                    return <th key={index}>{header.label}</th>;
                  })}
                  {(allowEdit || allowDelete || actions) && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {props.data &&
                  props.data.map((item, itemIndex) => {
                    return (
                      <tr style={{ textAlign: "center" }} key={itemIndex}>
                        {props.headers.map((header, headerIndex) => {
                          return (
                            <Cell
                              key={headerIndex}
                              type={header.type}
                              label={header.label}
                              value={
                                header.field === "rowNumber"
                                  ? itemIndex + 1
                                  : _.get(item, header.field, "N/D")
                              }
                            />
                          );
                        })}
                        {(allowEdit || allowDelete || actions) && (
                          <td data-label="Acciones">
                            {allowEdit && (
                              <EditButton fn={props.editFn} item={item} />
                            )}
                            {allowDelete && (
                              <DeleteButton fn={props.deleteFn} item={item} />
                            )}
                            <Actions actions={actions} item={item} />
                          </td>
                        )}
                      </tr>
                    );
                  })}
                {props.data && props.data.length <= 0 && (
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan={999} style={{ paddingLeft: 0 }}>
                      <Box
                        sx={{
                          gap: 2,
                          padding: 4,
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          style={{
                            width: "100%",
                            maxWidth: 450,
                            height: "auto",
                          }}
                          src={NoData}
                          alt="No data"
                        />
                        <Typography
                          variant="h6"
                          color="warning"
                          fontWeight="bold"
                        >
                          Sin datos
                        </Typography>
                      </Box>
                    </td>
                  </tr>
                )}
                {!props.data && (
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan={999} style={{ paddingLeft: 0 }}>
                      <Box
                        sx={{
                          gap: 2,
                          padding: 4,
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          style={{
                            width: "100%",
                            maxWidth: 450,
                            height: "auto",
                          }}
                          src={ErrorData}
                          alt="No data"
                        />
                        <Typography
                          variant="h6"
                          color="error"
                          fontWeight="bold"
                        >
                          Error de conexión
                        </Typography>
                      </Box>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </Box>
  );
};

export default DataTable;
