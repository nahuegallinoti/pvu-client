import { Plant } from "../models/plant";
import { factionOptions } from "../constants/factions";

type Props = {
  plant: Plant;
};

function PlantCmp({ plant }: Props) {
  const factionLabel = factionOptions.find(
    (f) => f.value === plant.faction
  )?.label;

  return (
    <tr key={plant.uniqueId}>
      <td>{plant.plantId}</td>
      <td>{plant.plantConfig.rarity}</td>
      <td>{plant.endingPrice}</td>
      <td>{plant.formattedDate}</td>
      <td>{factionLabel}</td>
      <td>{plant.plantSkill.skillTier}</td>
      <td>{plant.plantSkillZone.skillZoneTier}</td>
      <td>{plant.plantSkill.description}</td>
      <td>{plant.plantSkillZone.description}</td>
    </tr>
  );
}

export default PlantCmp;
