import { z } from "zod";

export function selectValidation() {
  return z.object(
    {
      id: z.union([z.number(), z.string()]),
    },
    {
      errorMap: () => ({
        message: "Please select an option",
      }),
    }
  );
}
