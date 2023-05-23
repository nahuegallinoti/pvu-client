import { Plant } from "../../models/plant";
import { factionOptions } from "../../constants/factions";

type Props = {
  plant: Plant;
  index: number;
};

function PlantCmp({ plant, index }: Props) {
  const factionLabel = factionOptions.find(
    (f) => f.value === plant.faction
  )?.label;

  return (
    <tr key={plant.uniqueId}>
      <td>{index + 1}</td>
      <td>{plant.plantId}</td>
      <td>{plant.plantConfig.rarity}</td>
      <td>{plant.endingPrice}</td>
      <td>{plant.formattedDate}</td>
      <td>{factionLabel}</td>
      <td>
        {plant.plantSkill.skillTier.substring(4, 5)}
        <br />
        {plant.plantSkill.description}
      </td>
      <td>
        {plant.plantSkillZone.skillZoneTier.substring(4, 5)}
        <br />
        {plant.plantSkillZone.description}
      </td>
    </tr>
  );
}

export default PlantCmp;
