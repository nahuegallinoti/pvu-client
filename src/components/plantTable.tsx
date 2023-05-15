import { Plant } from "../models/plant";
import PlantCmp from "./plant";

function PlantTable({ plants }: { plants: Plant[] }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Rarity</th>
            <th>Price</th>
            <th>Updated At</th>
            <th>Faction</th>
            <th>Skill Tier</th>
            <th>Skill Zone Tier</th>
            <th>Skill Description</th>
            <th>Skill Zone Description</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant: Plant) => (
            <PlantCmp key={plant.uniqueId} plant={plant} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PlantTable;
