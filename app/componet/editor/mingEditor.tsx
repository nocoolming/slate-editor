import { useCallback, useMemo } from "react";
import { withImages } from "./imageEditor/withImage";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { Transforms, createEditor } from "slate";
import { Toolbar } from "../components";
import InsertImageButton from "./imageEditor/insertImageButton";
import isHotkey from "is-hotkey";
import Element from "./element";
import Leaf from "./richText/leaf";
import MarkButton from "./richText/markButton";
import BlockButton from "./richText/blockButton";
import HOTKEYS from "./richText/hotkeys";
import toggleMark from "./richText/toggleMark";

const MingEditor = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
        <InsertImageButton />
      </Toolbar>
      <Editable
        onKeyDown={(event) => {
          if (isHotkey("mod+a", event)) {
            event.preventDefault();
            Transforms.select(editor, []);
            return;
          }

          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        placeholder="Enter some text..."
      />
    </Slate>
  );
};

export default MingEditor;

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
