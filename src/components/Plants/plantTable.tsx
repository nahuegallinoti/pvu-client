import { Plant } from "../../models/plant";
import PlantCmp from "./plant";

function PlantTable({ plants }: { plants: Plant[] }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Rarity</th>
            <th>Price</th>
            <th>Updated</th>
            <th>Faction</th>
            <th>Skill Tier</th>
            <th>Skill Zone</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant: Plant, index: number) => (
            <PlantCmp key={plant.uniqueId} plant={plant} index={index} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PlantTable;
