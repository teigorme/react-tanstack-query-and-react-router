import { useQueries } from "@tanstack/react-query";
import { BASEURL } from "constants/base-url";
import type { Friend } from "types/friends";
import type { Hero } from "types/super-heroes";

export default function RqSuperHeroesParallelQueries() {

  const results = useQueries({
    queries: [
      {
        queryKey: ["super-heroes"],
        queryFn: (): Promise<Hero[]> =>
          fetch(`${BASEURL}/superheroes`, {
            headers: { "Content-Type": "application/json" },
          }).then((res) => res.json()),
      },
      {
        queryKey: ["friends"],
        queryFn: (): Promise<Friend[]> =>
          fetch(`${BASEURL}/friends`, {
            headers: { "Content-Type": "application/json" },
          }).then((res) => res.json()),
      },
    ],
  });

 
  const [heroesResult, friendsResult] = results;


  const isLoading = heroesResult.isLoading || friendsResult.isLoading;
 
  const error = heroesResult.error || friendsResult.error;

  if (isLoading) return <h2>Carregando...</h2>;
  if (error) return <div>Error: {error.message}</div>;


  const superheroes = heroesResult.data;
  const friends = friendsResult.data;

  if (!superheroes || !friends) {
    return <div>Nenhum dado encontrado</div>;
  }

  return (
    <div>
      <h2>Super Heróis</h2>
      <ul>
        {superheroes.map((hero) => (
          <li key={hero.id}>
            {hero.name} ({hero.alterEgo})
          </li>
        ))}
      </ul>
<hr />
      <h2>Amigos</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
}
