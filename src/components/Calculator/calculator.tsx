import { useEffect, useState } from "react";
import axios from "axios";
import { AddPlant } from "../../models/addPlant";

const Calculator = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [plants, setPlants] = useState<AddPlant[]>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedPlants = JSON.parse(localStorage.getItem("plants") || "[]");
    setPlants(storedPlants);
  }, []);

  const handlePlantDelete = (id: number) => {
    const storedPlants = JSON.parse(localStorage.getItem("plants") || "[]");

    const updatedPlants = storedPlants.filter((plant: AddPlant) => {
      return plant.data.plantId !== id;
    });

    localStorage.setItem("plants", JSON.stringify(updatedPlants));
    setPlants(updatedPlants);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUniqueId(e.target.value);
  };

  const handleAddPlant = async () => {
    if (plants.find((plant) => plant.data.uniqueId === parseInt(uniqueId))) {
      setError(true);
      setErrorMessage("Plant ID already exists");
      return;
    }

    if (uniqueId === "") {
      setError(true);
      setErrorMessage("Please enter a Plant ID");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/addPlant`, {
        uniqueId,
      });

      if (response.status === 200) {
        setUniqueId("");
        setError(false);
        setErrorMessage("");

        const storedPlants = JSON.parse(localStorage.getItem("plants") || "[]");
        storedPlants.push(response.data);
        localStorage.setItem("plants", JSON.stringify(storedPlants));

        setPlants([...plants, response.data]);
      } else {
        setError(true);
        setErrorMessage(response.data.message);
      }
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <label className="text-center" htmlFor="uniqueId">
          Plant ID:
        </label>

        <input
          type="number"
          id="uniqueId"
          value={uniqueId}
          onChange={handleInputChange}
          className="w-1/3 mx-auto"
        />

        <button
          className="w-1/4 mx-auto flex justify-center items-center bg-green-600
          hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5"
          onClick={handleAddPlant}
        >
          Add Plant
        </button>
        {error && (
          <p className="text-center font-bold text-red-600 mt-2 mb-5">
            {errorMessage}
          </p>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>LE/S1</th>
            <th>LE/S2</th>
            <th>LE/Day</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant, index: number) => (
            <tr key={plant.data.uniqueId}>
              <td>{index + 1}</td>
              <td>{plant.data.uniqueId}</td>
              <td>{plant.data.plantConfig.leStage[0]}</td>
              <td>{plant.data.plantConfig.leStage[1]}</td>
              <td>
                {plant.data.plantConfig.leStage[0] +
                  plant.data.plantConfig.leStage[1] +
                  plant.data.plantConfig.leStage[0]}
              </td>
              <td>
                <img
                  src={plant.data.plantConfig.imageUrl}
                  alt=""
                  width={50}
                  height={50}
                />
              </td>
              <td>
                <button
                  className="flex bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handlePlantDelete(plant.data.plantId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <h2 className="text-2xl mr-2 font-bold mb-5">
          {plants.reduce((acc, plant) => {
            return (
              acc +
              plant.data.plantConfig.leStage[0] +
              plant.data.plantConfig.leStage[1] +
              plant.data.plantConfig.leStage[0]
            );
          }, 0)}{" "}
          LE/Day
        </h2>
      </div>
    </div>
  );
};

export default Calculator;
