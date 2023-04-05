import { z } from "zod";

export function selectValidation() {
  return z.object(
    {
      id: z.string(),
    },
    {
      errorMap: () => ({
        message: "Please select an option",
      }),
    }
  );
}
