import { z } from "zod";

export function selectValidation() {
  return z.object(
    {
      id: z.number(),
    },
    {
      errorMap: () => ({
        message: "Please select an option",
      }),
    }
  );
}
