export interface Decoration {
  _id: string;
  uniqueId: number;
  __v: number;
  createdAt: string;
  decorId: number;
  endingPrice: number;
  graphCreatedAt: string;
  graphUpdatedAt: string;
  ownerId: string;
  startingPrice: number;
  tokenId: number;
  updatedAt: string;
  decorationConfig: DecorationConfig;
}

export interface DecorationConfig {
  _id: string;
  decorId: number;
  __v: number;
  createdAt: string;
  imageUrl: string;
  rarity: string;
  updatedAt: string;
}
