import { z } from "zod";

export const statusResponse = z
  .object({
    error: z.string(),
    message: z.string(),
    status: z.coerce.number().or(z.undefined()),
  })
  .nullable();

export type StatusResponse = z.infer<typeof statusResponse>;
