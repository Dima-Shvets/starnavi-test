import { useRef } from "react";
import { usePeopleList } from "@/hooks/usePeopleList";
import PersonCard from "@/components/PersonCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function PeopleList() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { data, isFetching, error } = usePeopleList(loadMoreRef);

  return (
    <>
      <h1 className="page-title mb-6">List of Star Wars Heroes</h1>
      <ul className="grid gap-8 grid-cols-2 md:grid-cols-3">
        {error && <div className="text-red">{error.message}</div>}
        {data?.pages.flatMap((page) =>
          page.results.map((person) => (
            <li key={person.id}>
              <PersonCard person={person} />
            </li>
          )),
        )}
        {isFetching && <PeopleListSkeleton />}
      </ul>
      <div className="target" ref={loadMoreRef}></div>
    </>
  );
}

const PeopleListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index}>
          <Skeleton className="w-full h-[242px]" />
        </li>
      ))}
    </>
  );
};
