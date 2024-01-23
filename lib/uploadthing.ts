import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";
import { createNextRouteHandler } from "uploadthing/next";
import { generateReactHelpers } from "@uploadthing/react/hooks";
 

 
// // Export routes for Next App Router
// export const { GET, POST } = createNextRouteHandler({
//   router: ourFileRouter,
// });

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();