import { insertImage } from "./insertImage";
import imageExtensions from "image-extensions";
import isUrl from "is-url";

export const withImage = (editor) => {
  const { insertData, isVoid } = editor;

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };
};

const isImageUrl = (url) => {
  if (!url) {
    return false;
  }
  if (!isUrl(url)) {
    return false;
  }
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions;
};
