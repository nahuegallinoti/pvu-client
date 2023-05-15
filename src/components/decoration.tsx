import { Decoration } from "../models/decoration";

type Props = {
  decoration: Decoration;
};

function DecorationCmp({ decoration }: Props) {
  return (
    <tr key={decoration.uniqueId}>
      <td>{decoration.uniqueId}</td>
      <td>{decoration.decorationConfig.rarity}</td>
      <td>{decoration.endingPrice}</td>
    </tr>
  );
}

export default DecorationCmp;
