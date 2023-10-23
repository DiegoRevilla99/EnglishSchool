import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import {
  DeleteOutline,
  FolderOutlined,
  LinkOutlined,
} from "@mui/icons-material";
import { FileType } from "@/models/Lesson";
import IFormikProps from "@/interfaces/IFormikProps";
import { Link } from "react-router-dom";

export default function FilesArchivesList({
  formik,
  field,
  type,
  items,
}: IFormikProps & {
  field: string;
  type: "files" | "links";
  items: (FileType | string)[];
}) {
  function onDeleteData(data: string) {
    const oldData = formik.values[field];
    const newData = oldData?.filter((item: string | FileType) => {
      if (typeof item === "string") {
        return item !== data;
      }

      return item.fileName !== data;
    });
    formik.setFieldValue(field, newData);
  }

  return (
    <List dense={true}>
      {items.map((item) => {
        return (
          <ListItem
            secondaryAction={
              <IconButton
                onClick={() => {
                  onDeleteData(typeof item === "string" ? item : item.fileName);
                }}
              >
                <DeleteOutline color="error" />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "wheat" }}>
                {type === "links" ? (
                  <Link to={item as string} target="_blank">
                    <LinkOutlined color="primary" />
                  </Link>
                ) : (
                  <FolderOutlined color="warning" />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                typeof item === "string" ? (
                  <Link to={item as string} target="_blank">
                    {new URL(item).hostname}
                  </Link>
                ) : (
                  item.fileName
                )
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
