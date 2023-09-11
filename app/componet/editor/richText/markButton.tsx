import { useSlate } from "slate-react";
import isMarkActive from "./isMarkActive";
import { Button, Icon } from "~/componet/components";
import toggleMark from "./toggleMark";

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default MarkButton;
