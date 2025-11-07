import { useEffect } from "react";
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

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("Fetching next page...");
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "50px",
      },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    data,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
