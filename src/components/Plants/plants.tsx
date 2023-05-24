import { useState, useEffect } from "react";
import axios from "axios";
import { Plant } from "../../models/plant";
import { rarityOptions } from "../../constants/rarities";
import PlantTable from "./plantTable";

function Plants() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantsByPrice, setPlantsByPrice] = useState<Plant[]>([]);
  useState(true);
  const [selectedPlantRarities, setSelectedPlantRarities] = useState<string[]>([
    "legendary",
  ]);
  const [showPlantsByPrice, setShowPlantsByPrice] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlantData();
    fetchPlantDataByPrice();

    const interval = setInterval(() => {
      fetchPlantData();
      fetchPlantDataByPrice();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  async function fetchPlantData() {
    try {
      const response = await axios.get("http://localhost:3000/plants");
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plant data:", error);
    } finally {
      setLoading(false);
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

  function handleRarityPlantChange(rarity: string) {
    if (selectedPlantRarities.includes(rarity)) {
      setSelectedPlantRarities(
        selectedPlantRarities.filter((r) => r !== rarity)
      );
    } else {
      setSelectedPlantRarities([...selectedPlantRarities, rarity]);
    }
  }

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
        <h1 className="text-3xl font-bold flex justify-center">Plants</h1>

        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {" "}
              <div className="flex items-center space-x-4 mb-4">
                {rarityOptions.map((option) => (
                  <label
                    className="inline-flex items-center"
                    key={option.value}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={option.value}
                      checked={selectedPlantRarities.includes(option.value)}
                      onChange={(e) => handleRarityPlantChange(e.target.value)}
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
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
              Total:{" "}
              {showPlantsByPrice
                ? applyFilterPlants(plantsByPrice).length
                : applyFilterPlants(plants).length}
              <PlantTable
                plants={applyFilterPlants(
                  showPlantsByPrice ? plantsByPrice : plants
                )}
              />
            </>
          )}
        </>
      </div>
    </>
  );
}

export default Plants;
