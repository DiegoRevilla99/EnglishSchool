import { FileType } from "@/models/Lesson";
import { truncateString } from "@/utils";
import { Grid } from "@mui/material";

export default function ArchiveFileCard({ item }: { item: string | FileType }) {
  const getFileIcon = (file: string) => {
    const extension = file ? file.split(".")[1] : "";

    switch (extension) {
      case "pdf":
        return "pdf";

      case "docx":
        return "word";

      default:
        return "fas fa-file-alt text-file";
    }
  };

  return (
    <Grid item xs={3}>
      <div className="item" style={{ marginBottom: 0, width: "100%" }}>
        <div className="item-inner">
          <div className="thumb-holder">
            <span className="icon-holder">
              <i
                className={
                  typeof item === "string"
                    ? "fa-solid fa-link"
                    : getFileIcon(item.fileName)
                }
              />
            </span>
          </div>
          <div
            className="desc"
            style={{ textAlign: "center", backgroundColor: "#ccefea" }}
          >
            <h6 className="title">
              {typeof item === "string"
                ? truncateString(`${new URL(item).hostname}`, 10)
                : truncateString(item.fileName.split(".")[0], 10)}
            </h6>
          </div>
          <a
            className="link"
            target={typeof item === "string" ? "_blank" : "_top"}
            href={typeof item === "string" ? item : item.fileUrl}
          />
        </div>
      </div>
    </Grid>
  );
}
