import { useState } from "react";
import axios from "axios";
import { Coordinate } from "../../models/coordinate";

function Coordinates() {
  const [coordinateX, setCoordinateX] = useState<number>(0);
  const [coordinateY, setCoordinateY] = useState<number>(0);

  const [coordinateData, setCoordinateData] = useState<Coordinate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCoordinateData() {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/coordinates?x=${coordinateX}&y=${coordinateY}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHgxYmM5OThjNmJmY2RiOTFmOTAyMTI1NjY3OGYzZWE0Nzk4MWYzOGVhIiwiaWF0IjoxNjg0OTMxMzk0fQ.8jgqSO7mcpWCs4LS8N7lka1LVNz2lqys79MzB7mBEWY`,
          },
        }
      );
      console.table(response.data[0]);
      setCoordinateData(response.data[0]);
    } catch (error: any) {
      setError(error.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoordinateX(Number(e.target.value));
  };

  const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoordinateY(Number(e.target.value));
  };

  const sortedCoordinates = coordinateData
    ? [...coordinateData.slots]
        .filter((slot) => slot.harvestTime !== undefined)
        .sort((a, b) =>
          a.harvestTime && b.harvestTime ? a.harvestTime - b.harvestTime : 0
        )
    : [];

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold flex justify-center">Coordinates</h1>
        <div className="flex mx-auto mt-5 items-center">
          <label htmlFor="coordinateX" className="mr-2">
            <span className="text-yellow-400">X</span>
          </label>
          <input
            type="number"
            value={coordinateX}
            onChange={handleXChange}
            placeholder="Enter X coordinate"
            className="mb-2 px-1"
          />
        </div>
        <div className="flex mx-auto mb-2 items-center">
          <label htmlFor="coordinateX" className="mr-2">
            <span className="text-violet-400">Y</span>
          </label>

          <input
            type="number"
            value={coordinateY}
            onChange={handleYChange}
            placeholder="Enter Y coordinate"
            className="mb-2 px-1"
          />
        </div>

        <button
          className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchCoordinateData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
        {error && <p>Error: {error}</p>}
        {coordinateData && (
          <table className="table-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Harvest Time</th>
                <th>Bad Crow</th>
                <th>Good Crow</th>
                <th>Need Water</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {sortedCoordinates.map((slot, index) => (
                <tr key={slot._id}>
                  <td>{index}</td>
                  <td>
                    {slot.harvestTime
                      ? new Date(slot.harvestTime).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </td>
                  <td>{slot.actionInfos.isHaveCrow ? "Yes" : "No"}</td>
                  <td>
                    {coordinateData.decoStatus.goodCrow.length > 0
                      ? "Yes"
                      : "No"}
                  </td>
                  <td>{slot.actionInfos.isNeedWater ? "Yes" : "No"}</td>
                  <td>
                    X: {slot?.location[0]} Y:{slot?.location[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Coordinates;
