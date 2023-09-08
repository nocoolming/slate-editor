import { useSlateStatic } from "slate-react";
import { Button, Icon } from "~/componet/components";
import { isImageUrl } from "./isImageUrl";
import { insertImage } from "./insertImage";

const InsertImageButton = () => {
  const editor = useSlateStatic();
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (url && !isImageUrl(url)) {
          alert("URL is not an image");
          return;
        }
        url && insertImage(editor, url);
      }}
    >
      <Icon>image</Icon>
    </Button>
  );
};

export default InsertImageButton;
