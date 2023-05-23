import { useState, useEffect } from "react";
import axios from "axios";
import { Decoration } from "../../models/decoration";
import { rarityOptions } from "../../constants/rarities";
import DecorationTable from "./decorationTable";

function Decorations() {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [isDecorationTableExpanded, setIsDecorationTableExpanded] =
    useState(true);
  const [selectedDecorationRarities, setSelectedDecorationRarities] = useState<
    string[]
  >(["legendary"]);

  useEffect(() => {
    fetchDecorationData();
    const interval = setInterval(() => {
      fetchDecorationData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  async function fetchDecorationData() {
    try {
      const response = await axios.get("http://localhost:3000/decorations");
      setDecorations(response.data);
    } catch (error) {
      console.error("Error fetching decoration data:", error);
    }
  }

  function filterDecorationsByRarity(decorations: Decoration[]) {
    return decorations.filter((decoration) => {
      const rarity = decoration.decorationConfig.rarity;
      return selectedDecorationRarities.includes(rarity);
    });
  }

  function handleRarityDecorationChange(rarity: string) {
    if (selectedDecorationRarities.includes(rarity)) {
      setSelectedDecorationRarities(
        selectedDecorationRarities.filter((r) => r !== rarity)
      );
    } else {
      setSelectedDecorationRarities([...selectedDecorationRarities, rarity]);
    }
  }

  const toggleDecorationTable = () => {
    setIsDecorationTableExpanded(!isDecorationTableExpanded);
  };

  return (
    <>
      <div className="flex flex-col">
        <h1
          className="text-3xl font-bold cursor-pointer flex justify-center"
          onClick={toggleDecorationTable}
        >
          Decorations
        </h1>

        {isDecorationTableExpanded && (
          <>
            <div className="flex items-center space-x-4 mb-4">
              {rarityOptions.map((option) => (
                <div key={option.value}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={option.value}
                      checked={selectedDecorationRarities.includes(
                        option.value
                      )}
                      onChange={(e) =>
                        handleRarityDecorationChange(e.target.value)
                      }
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                </div>
              ))}
            </div>

            <h1>
              Total:{" "}
              {
                decorations.filter((x) =>
                  selectedDecorationRarities.includes(x.decorationConfig.rarity)
                ).length
              }
            </h1>

            <DecorationTable
              decorations={filterDecorationsByRarity(decorations)}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Decorations;
