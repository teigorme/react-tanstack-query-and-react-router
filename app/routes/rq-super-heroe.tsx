import { useQuery } from "@tanstack/react-query";
import { BASEURL } from "constants/base-url";
import type { Hero } from "types/super-heroes";
import { useParams } from "react-router";

export default function RqSuperHeroe() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery<Hero>({
    queryKey: ["super-hero", id],
    queryFn: () =>
      fetch(`${BASEURL}/${id}`, {
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
      <h2 className="text-2xl font-semibold">RQ Super Hero</h2>
      <div>{data.id}</div>
      <div>{data.name}</div>
      <div>{data.alterEgo}</div>
    </div>
  );
}
