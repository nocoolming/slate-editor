import imageExtensions from "image-extensions";
import isUrl from "is-url";

export const isImageUrl = (url) => {
  if (!url) {
    return false;
  }
  if (!isUrl(url)) {
    return false;
  }
  const ext = new URL(url).pathname.split('.').pop();
  console.log(`ext: ${ext}`)
  return imageExtensions.includes(ext);
};
