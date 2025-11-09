import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import type { Person } from "@/types/types";

export default function PersonCard(props: { person: Person }) {
  const { person } = props;
  return (
    <Card className="w-full">
      <Link to={`/person/${person.id}`}>
        <CardHeader>
          <CardTitle>{person.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base">Gender: {person.gender}</p>
          <p className="text-base">Birth year: {person.birth_year}</p>
          <p className="text-base">Height: {person.height} cm</p>
          <p className="text-base">Mass: {person.mass} kg</p>
          <p className="text-base">Hair color: {person.hair_color}</p>
          <p className="text-base">Eyes color: {person.eye_color}</p>
          <p className="text-base">Skin color: {person.skin_color}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
