import { useRef } from "react";
import { usePeopleList } from "@/hooks/hooks";

export default function PeopleList() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { data } = usePeopleList(loadMoreRef);

  return (
    <div className="p-6 grid gap-8 grid-cols-2 md:grid-cols-2">
      {data?.pages.flatMap((page) =>
        page.results.map((person) => (
          <button
            key={person.id}
            className="p-4 bg-white border border-gray-700 text-black rounded-lg hover:bg-gray-300 cursor-pointer"
            // onClick={() => onSelect(hero.id)}
          >
            <h3 className="font-bold">{person.name}</h3>
            <p className="text-base">Gender: {person.gender}</p>
            <p className="text-base">Birth year: {person.birth_year}</p>
            <p className="text-base">Height: {person.height} cm</p>
            <p className="text-base">Mass: {person.mass} kg</p>
            <p className="text-base">Hair color: {person.hair_color}</p>
            <p className="text-base">Eyes color: {person.eye_color}</p>
            <p className="text-base">Skin color: {person.skin_color}</p>
          </button>
        )),
      )}
      <div className="target" ref={loadMoreRef}></div>
    </div>
  );
}
