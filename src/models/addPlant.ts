export interface AddPlant {
  data: Data;
  status: number;
}

export interface Data {
  __v: number;
  _id: string;
  createdAt: Date;
  faction: number;
  fusedAbility: FusedAbility;
  orderNumber: string;
  origin: string;
  ownerId: string;
  plantConfig: PlantConfig;
  plantId: number;
  plantSabotage: PlantS;
  plantSkill: PlantSkill;
  plantSkillZone: PlantSkill;
  plantSupport: PlantS;
  plantUnitId: number;
  skillId: string;
  skillZoneId: string;
  status: number;
  tokenId: number;
  type: number;
  uniqueId: number;
  updatedAt: Date;
}

export interface FusedAbility {
  abilityId: string;
  description: string;
  rarity: string;
}

export interface PlantConfig {
  __v: number;
  _id: string;
  createdAt: Date;
  faction: number;
  imageUrl: string;
  imageUrl1: string;
  leStage: number[];
  rarity: string;
  type: number;
  unitId: number;
  updatedAt: Date;
}

export interface PlantS {
  season: string;
  value: number;
}

export interface PlantSkill {
  __v: number;
  _id: string;
  createdAt: Date;
  description: string;
  skillId?: string;
  skillTier?: string;
  skillZoneId?: string;
  skillZoneTier?: string;
  type: number;
  updatedAt: Date;
}
