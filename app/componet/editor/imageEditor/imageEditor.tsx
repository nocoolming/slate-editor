import { useMemo } from "react";
import { Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import { withImage } from "./withImage";
import { Editable, Slate, withReact } from "slate-react";
import { Toolbar } from "~/componet/components";
import InsertImageButton from "./insertImageButton";
import isHotkey from "is-hotkey";

const ImageSlateEditor = () => {
  const editor = useMemo(
    () => withImage(withHistory(withReact(createEditor()))),
    []
  );

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar>
        <InsertImageButton />
      </Toolbar>
      <Editable
        onKeyDown={(event) => {
          if (isHotkey("mod+a", event)) {
            event.preventDefault();
            Transforms.select(editor, []);
          }
        }}
        renderElement={(props) => <Element {...props} />}
        placeholder="Enter some text..."
      />
    </Slate>
  );
};

export default ImageSlateEditor;

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos.",
      },
    ],
  },
  {
    type: "image",
    url: "https://source.unsplash.com/kFrdX5IeQzI",
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your clipboard and paste it anywhere in the editor!",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "You can delete images with the cross in the top left. Try deleting this sheep:",
      },
    ],
  },
  {
    type: "image",
    url: "https://source.unsplash.com/zOwZKwZOZq8",
    children: [{ text: "" }],
  },
];
