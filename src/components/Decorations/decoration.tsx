import { Decoration } from "../../models/decoration";

type Props = {
  decoration: Decoration;
  index: number;
};

function DecorationCmp({ decoration, index }: Props) {
  return (
    <tr key={decoration.uniqueId}>
      <td>{index + 1}</td>
      <td>{decoration.uniqueId}</td>
      <td>{decoration.decorationConfig.rarity}</td>
      <td>{decoration.endingPrice}</td>
    </tr>
  );
}

export default DecorationCmp;
