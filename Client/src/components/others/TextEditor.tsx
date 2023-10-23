import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

import IFormikProps from "@/interfaces/IFormikProps";

export default function TextEditor({
  formik,
  field,
}: IFormikProps & { field: string }) {
  const handleQuillChange = (value: string) => {
    formik.setFieldValue(field, value);
  };

  return (
    <div className="reactQuillCustom">
      <ReactQuill
        placeholder="Agrega el cuerpo de la nota"
        value={formik.values[field]}
        onChange={handleQuillChange}
        theme="snow"
        bounds={".reactQuillCustom"}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
        ]}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
          clipboard: {
            matchVisual: false,
          },
        }}
      />
    </div>
  );
}
