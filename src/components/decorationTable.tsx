import { Decoration } from "../models/decoration";
import DecorationCmp from "./decoration";

function DecorationTable({ decorations }: { decorations: Decoration[] }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Rarity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {decorations.map((decoration: Decoration) => (
            <DecorationCmp key={decoration.uniqueId} decoration={decoration} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DecorationTable;
