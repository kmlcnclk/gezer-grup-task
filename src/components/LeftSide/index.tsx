import { Character } from "@/types/Character";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  setOrderedCharacters: Function;
  characters: Character[];
};

const LeftSide: React.FC<Props> = ({
  setOrderedCharacters,
  characters,
}: Props) => {
  const [status, setStatus] = useState<string>("");
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [selectedCheckboxValues, setSelectedCheckboxValues] = useState<
    string[]
  >([]);

  const filterRefForRadio = useRef<HTMLDivElement>(null);
  const filterRefForCheckbox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let a: string[] = [];
    characters.forEach((character: Character) => {
      a.push(character.location.name);
    });
    const uniqueArray = a.filter((item, index) => a.indexOf(item) === index);
    setCheckboxValues(uniqueArray);
  }, [characters]);

  const filterByStatus = (result: any) => {
    let orderedList = result.filter((p: any) => p.status === status);
    return orderedList;
  };

  const filterByCheckBox = (result: any) => {
    let orderedList = result.filter((character: Character) =>
      selectedCheckboxValues.includes(character.location.name)
    );
    return orderedList;
  };

  const find = () => {
    let result = characters;

    if (status) {
      result = filterByStatus(result);
    }

    if (selectedCheckboxValues[0]) {
      result = filterByCheckBox(result);
    }

    setOrderedCharacters(result);
  };

  const reset = () => {
    setOrderedCharacters(characters);
    setStatus("");
    setSelectedCheckboxValues([]);
    resetAllFilterElements();
  };

  const resetAllFilterElements = () => {
    if (filterRefForCheckbox.current) {
      const inputs = filterRefForCheckbox.current.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
      }
    }

    if (filterRefForRadio.current) {
      const inputs = filterRefForRadio.current.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
      }
    }
  };

  return (
    <div className="fixed left-10 h-screen bg-gray-200 w-[400px] p-10 ">
      <h3 className="font-bold text-center mb-5">Filters</h3>

      <div className="flex flex-col">
        <div
          onChange={(e: any) => {
            setStatus(e.target.value);
          }}
          ref={filterRefForRadio}
        >
          <div className="flex">
            <p>Alive</p>
            <input type="radio" value="Alive" name="status" className="ml-4" />
          </div>
          <div className="flex">
            <p>Dead</p>
            <input type="radio" value="Dead" name="status" className="ml-4" />
          </div>
          <div className="flex">
            <p>Unknown</p>
            <input
              type="radio"
              value="unknown"
              name="status"
              className="ml-4"
            />
          </div>
        </div>

        <div className="mt-10" ref={filterRefForCheckbox}>
          {checkboxValues.map((checkboxValue: string, i: number) => (
            <div key={i} className="flex">
              <p>{checkboxValue}</p>
              <input
                className="ml-5"
                type="checkbox"
                value={checkboxValue}
                onChange={() => {
                  setSelectedCheckboxValues((prev: string[]) => {
                    if (prev.includes(checkboxValue)) {
                      return prev.filter((p: string) => p !== checkboxValue);
                    } else {
                      return [...prev, checkboxValue];
                    }
                  });
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <button
          className="bg-blue-600 p-4 w-[100px] rounded-md text-white "
          onClick={() => find()}
        >
          Find
        </button>
        <button
          className="bg-red-600 p-4 w-[100px] rounded-md ml-5 text-white "
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
