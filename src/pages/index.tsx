import { useEffect, useState } from "react";
import Card from "@/components/Card";
import LeftSide from "@/components/LeftSide";
import { Character } from "@/types/Character";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [orderedCharacters, setOrderedCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const a = async () => {
      const res = await fetch("https://rickandmortyapi.com/api/character", {});
      const data = await res.json();

      setCharacters(data.results);
      setOrderedCharacters(data.results);
    };
    a();
  }, []);

  return (
    <div className="justify-around flex ">
      {characters[0] ? (
        <LeftSide {...{ setOrderedCharacters, characters }} />
      ) : null}
      <div>
        {orderedCharacters[0] ? (
          orderedCharacters.map((character: Character) => (
            <Card key={character.id} {...{ character }} />
          ))
        ) : (
          <div className="mt-10">
            <p className="font-semibold">There is no result</p>
          </div>
        )}
      </div>
    </div>
  );
}
