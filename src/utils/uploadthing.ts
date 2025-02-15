import { generateUploadButton } from "@uploadthing/react";
import { server } from "../redux/store";
export const UploadButton = generateUploadButton({
  url: `${server}/api/v1/uploadthing`,
});
