import { useSlate } from "slate-react";
import isBlockActive from "./isblockActive";
import TEXT_ALIGN_TYPES from "./textAlignTypes";
import toggleBlock from "./toggleBlock";
import { Button, Icon } from "~/componet/components";

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default BlockButton;
