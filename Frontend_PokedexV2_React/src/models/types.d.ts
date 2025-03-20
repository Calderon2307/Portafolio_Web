export interface TypeData {
  name: string;
  logo: string;
  index: number;
}

export type TypeRelation = {
  effectiveness: string;
  damageMultiplier: string;
  types: string[];
};

export type TypeAPIModel = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
