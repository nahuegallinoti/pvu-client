export interface Coordinate {
  __v: number;
  _id: string;
  createdAt: Date;
  decoStatus: DecoStatus;
  height: number;
  isCenter: boolean;
  isGrowthMotherTree: boolean;
  location: number[];
  mtreeEffects: MtreeEffectElement[];
  numberFarmSlot: number;
  numberSynergys: { [key: string]: number };
  regionName: string;
  slots: Slot[];
  updatedAt: Date;
  width: number;
  status: number;
}

export interface DecoStatus {
  effects: Effect[];
  goodCrow: any[];
  numberDeco: number;
  point: number;
}

export interface Effect {
  $incFarmingPerformance?: number;
  description: string;
  faction?: string;
  id: number;
  luckyRate?: number;
  percent?: number;
  quanlity?: number[];
  type: string;
}

export interface MtreeEffectElement {
  _id: string;
  plantUniqueId: number;
  skillId: string;
  value?: number;
}

export interface Slot {
  __v: number;
  _id: string;
  actionInfos: ActionInfos;
  createdAt: Date;
  currentEffects: MtreeEffectElement[];
  decInfos?: DECInfos;
  decoEffects: DecoEffects;
  harvestTime?: number;
  landId: string;
  location: number[];
  ownerId: ErID;
  plantInfos: PlantInfos;
  prices: Prices;
  removeStartTime?: number;
  skillInfos: SkillInfos;
  stage?: number;
  startCycle: number;
  startDate: number;
  status: number;
  type: number;
  updatedAt: Date;
}

export interface ActionInfos {
  isHaveCrow: boolean;
  isNeedWater: boolean;
  lastCrowTime: number;
  lastWaterTime: number;
  totalCrowTime: number;
  totalWaterTime: number;
}

export interface DECInfos {
  ownerId: ErID;
  point: number;
  uniqueId: number;
}

export enum ErID {
  Empty = "",
  The0X1Bc998C6Bfcdb91F9021256678F3Ea47981F38Ea = "0x1bc998c6bfcdb91f9021256678f3ea47981f38ea",
}

export interface DecoEffects {
  autoChaseCrowRate?: number;
  autoWateringRate?: number;
  bonusLe?: number;
  buffFarmFactions?: BuffFarmFactions;
  buffPerformance?: number;
  buffSupportedWeather?: number;
  isGoodCrow?: boolean;
  reduceSabotageWeather: number;
}

export interface BuffFarmFactions {
  "2": number;
}

export interface PlantInfos {
  faction?: number;
  leStage: number[];
  plantId?: number;
  uniqueId?: number;
}

export interface Prices {
  biddingUser: BiddingUser[];
  ceilingPrice: number;
  floorPrice: number;
  highestPrice: number;
}

export interface BiddingUser {
  _id: string;
  price: number;
  time: number;
  userId: ErID;
}

export interface SkillInfos {
  bonusLeChasingCrow: number;
  bonusLeWatering: number;
  reduceCrowRate: number;
  reduceWateringRate: number;
  seedDropRate: number;
}
