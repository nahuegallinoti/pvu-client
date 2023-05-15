export interface Plant {
  _id: string;
  uniqueId: number;
  __v: number;
  createdAt: string;
  endingPrice: number;
  faction: number;
  formattedDate: string;
  graphCreatedAt: string;
  graphUpdatedAt: string;
  orderNumber: string;
  ownerId: string;
  plantId: number;
  plantUnitId: number;
  skillId: string;
  skillZoneId: string;
  startingPrice: number;
  tokenId: number;
  type: number;
  updatedAt: string;
  plantConfig: PlantConfig;
  plantSkill: PlantSkill;
  plantSkillZone: PlantSkillZone;
  plantSupport: PlantSupport;
  plantSabotage: PlantSabotage;
}

export interface PlantConfig {
  _id: string;
  unitId: number;
  __v: number;
  createdAt: string;
  faction: number;
  imageUrl: string;
  leStage: number[];
  rarity: string;
  type: number;
  updatedAt: string;
}

export interface PlantSkill {
  _id: string;
  skillId: string;
  type: number;
  __v: number;
  createdAt: string;
  description: string;
  skillTier: string;
  updatedAt: string;
}

export interface PlantSkillZone {
  _id: string;
  skillZoneId: string;
  type: number;
  __v: number;
  createdAt: string;
  description: string;
  skillZoneTier: string;
  updatedAt: string;
}

export interface PlantSupport {
  season: string;
  value: number;
}

export interface PlantSabotage {
  season: string;
  value: number;
}
