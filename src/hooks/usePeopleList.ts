import { useEffect, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPeople } from "@/queries/queries";

export function usePeopleList(
  loadMoreRef: React.RefObject<HTMLDivElement | null>,
) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["people"],
    queryFn: getPeople,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next ? pages.length + 1 : undefined;
    },
  });

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const { current: currentRef } = loadMoreRef;
    if (!currentRef) return;

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 1,
    });

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMoreRef, observerCallback]);

  return {
    data,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
