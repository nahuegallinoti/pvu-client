import { Decoration } from "../../models/decoration";
import DecorationCmp from "./decoration";

function DecorationTable({ decorations }: { decorations: Decoration[] }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Rarity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {decorations.map((decoration: Decoration, index: number) => (
            <DecorationCmp
              key={decoration.uniqueId}
              decoration={decoration}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DecorationTable;
