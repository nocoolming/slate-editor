import { Transforms } from "slate";
import { ImageElement } from "../custom-types";

export const insertImage = (editor, url) => {
  const text = { text: "" };
  const image: ImageElement = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};
