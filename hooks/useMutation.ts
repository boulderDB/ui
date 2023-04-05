import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function useMutation(): {
  isFetching: boolean;
  isPending: boolean;
  isMutating: boolean;
  mutate: (callback: () => Promise<void>) => Promise<void>;
} {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const isMutating = isFetching || isPending;

  const mutate = async (callback: () => Promise<void>) => {
    setIsFetching(true);

    await callback();

    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return {
    isFetching,
    isPending,
    isMutating,
    mutate,
  };
}
