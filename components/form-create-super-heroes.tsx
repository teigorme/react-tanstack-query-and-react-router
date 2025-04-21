import { useMutation } from "@tanstack/react-query";
import { BASEURL } from "constants/base-url";
import { useState } from "react";
import { queryClient } from "~/root";

interface HeroData {
  email: string;
  alterEgo: string;
}

export default function FormCreateSuperHeroes() {
  const [email, setEmail] = useState<string>("");
  const [alterEgo, setAlterEgo] = useState<string>("");

  const { mutate, isError, error, isSuccess, isPending } = useMutation({
    mutationFn: (hero: HeroData) =>
      fetch(`${BASEURL}/superheroes`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(hero),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create hero");
        }
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
      setEmail("");
      setAlterEgo("");
    },
  });

  function handleAddHero() {
    if (!email || !alterEgo) {
      alert("Please fill in all fields");
      return;
    }
    mutate({ email, alterEgo });
  }

  return (
    <div>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-4">Add New Hero</h2>

      {isError && (
        <div className="text-red-500 mb-4">
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to create hero"}
        </div>
      )}

      {isSuccess && (
        <div className="text-green-500 mb-4">Hero added successfully!</div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-600 px-2 py-1 w-full rounded"
          disabled={isPending}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="alterEgo" className="block mb-1">
          AlterEgo
        </label>
        <input
          type="text"
          id="alterEgo"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
          className="border border-gray-600 px-2 py-1 w-full rounded"
          disabled={isPending}
        />
      </div>

      <button
        type="button"
        onClick={handleAddHero}
        disabled={isPending}
        className={`bg-blue-500 hover:bg-blue-600 px-4 py-2 mt-2 font-semibold text-white rounded 
                   ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isPending ? "Adding..." : "Add Hero"}
      </button>
    </div>
  );
}
