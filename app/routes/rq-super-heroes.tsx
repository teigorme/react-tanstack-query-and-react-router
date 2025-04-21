import { useQuery } from "@tanstack/react-query";
import FormCreateSuperHeroes from "components/form-create-super-heroes";
import { BASEURL } from "constants/base-url";
import { Link } from "react-router";
import type { Hero } from "types/super-heroes";

export default function RqSuperHeroes() {
  const { data, isLoading, error } = useQuery<Hero[]>({
    queryKey: ["super-heroes"],
    queryFn: () =>
      fetch(`${BASEURL}/superheroes`, {
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),
  });

  if (isLoading) return <h2>Carregando...</h2>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data) {
    return <div>Nenhum heroi encontrado</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">RQ Super Heroes</h2>
      {data.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}

      <FormCreateSuperHeroes />
    </div>
  );
}
