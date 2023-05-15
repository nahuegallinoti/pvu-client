import { useState, useEffect } from "react";
import axios from "axios";
import PlantTable from "./components/plantTable";
import DecorationTable from "./components/decorationTable";
import { rarityOptions } from "./constants/rarities";
import { Plant } from "./models/plant";
import { Decoration } from "./models/decoration";

function App() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantsByPrice, setPlantsByPrice] = useState<Plant[]>([]);
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [isPlantTableExpanded, setIsPlantTableExpanded] = useState(true);
  const [isDecorationTableExpanded, setIsDecorationTableExpanded] =
    useState(true);
  const [selectedPlantRarities, setSelectedPlantRarities] = useState<string[]>([
    "legendary",
  ]);
  const [selectedDecorationRarities, setSelectedDecorationRarities] = useState<
    string[]
  >(["legendary"]);
  const [showPlantsByPrice, setShowPlantsByPrice] = useState(false);

  useEffect(() => {
    fetchPlantData();
    fetchPlantDataByPrice();
    fetchDecorationData();
    const interval = setInterval(() => {
      fetchPlantData();
      fetchPlantDataByPrice();
      fetchDecorationData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  async function fetchPlantData() {
    try {
      const response = await axios.get("http://localhost:3000/plants");
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plant data:", error);
    }
  }

  async function fetchPlantDataByPrice() {
    try {
      const response = await axios.get("http://localhost:3000/plantsByPrice");
      setPlantsByPrice(response.data);
    } catch (error) {
      console.error("Error fetching plants by price data:", error);
    }
  }

  async function fetchDecorationData() {
    try {
      const response = await axios.get("http://localhost:3000/decorations");
      setDecorations(response.data);
    } catch (error) {
      console.error("Error fetching decoration data:", error);
    }
  }

  function applyFilterPlants(plants: Plant[]) {
    const filteredPlants = filterPlantsByRarity(plants);
    return filteredPlants.map((plant) => {
      const formattedDate = formatDate(plant.updatedAt);
      return {
        ...plant,
        formattedDate: formattedDate,
      };
    });
  }

  function filterPlantsByRarity(plants: Plant[]) {
    return plants.filter((plant) => {
      const rarity = plant.plantConfig.rarity;
      return selectedPlantRarities.includes(rarity);
    });
  }

  function filterDecorationsByRarity(decorations: Decoration[]) {
    return decorations.filter((decoration) => {
      const rarity = decoration.decorationConfig.rarity;
      return selectedDecorationRarities.includes(rarity);
    });
  }

  function handleRarityPlantChange(rarity: string) {
    if (selectedPlantRarities.includes(rarity)) {
      setSelectedPlantRarities(
        selectedPlantRarities.filter((r) => r !== rarity)
      );
    } else {
      setSelectedPlantRarities([...selectedPlantRarities, rarity]);
    }
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

  const togglePlantTable = () => {
    setIsPlantTableExpanded(!isPlantTableExpanded);
  };

  const toggleDecorationTable = () => {
    setIsDecorationTableExpanded(!isDecorationTableExpanded);
  };

  const handleShowPlantsByPriceChange = () => {
    setShowPlantsByPrice(!showPlantsByPrice);
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      <div className="flex flex-col">
        <h1
          className="text-3xl font-bold cursor-pointer flex justify-center"
          onClick={togglePlantTable}
        >
          Plants
        </h1>

        {isPlantTableExpanded && (
          <>
            <div className="flex items-center my-4">
              <div className="mb-3">
                <h1 className="text-2xl font-bold cursor-pointer flex justify-center">
                  Rarity
                </h1>
                {rarityOptions.map((option) => (
                  <div key={option.value}>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox my-1"
                        value={option.value}
                        checked={selectedPlantRarities.includes(option.value)}
                        onChange={(e) =>
                          handleRarityPlantChange(e.target.value)
                        }
                      />
                      <span className="ml-2 mr-10">{option.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <input
                type="checkbox"
                id="showPlantsByPrice"
                checked={showPlantsByPrice}
                onChange={handleShowPlantsByPriceChange}
              />
              <label htmlFor="showPlantsByPrice" className="ml-1">
                Show plants by price
              </label>
            </div>
            Total: {showPlantsByPrice ? plantsByPrice.length : plants.length}
            <PlantTable
              plants={applyFilterPlants(
                showPlantsByPrice ? plantsByPrice : plants
              )}
            />
          </>
        )}
      </div>
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
                    checked={selectedDecorationRarities.includes(option.value)}
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
    </>
  );
}

export default App;
