import { Character } from "@/types/Character";
import Image from "next/image";
import React from "react";

type Props = {
  character: Character;
};

const Card: React.FC<Props> = ({ character }: Props) => {
  return (
    <div className="m-4">
      <div className="w-[400px] p-4 bg-gray-100 rounded-md flex">
        <Image
          src={character.image}
          alt=""
          width={130}
          height={130}
          className="rounded-md"
          priority
        />
        <div className="ml-3">
          <p className="text-black font-semibold text-xl">{character.name}</p>
          <p className="text-black font-semibold">{character.location.name}</p>
          <p className="text-black font-semibold">{character.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
