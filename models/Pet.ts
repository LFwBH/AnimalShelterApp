export interface Image {
  original: {
    url: string;
    width: number;
    height: number;
  };
  thumb: {
    url: string;
    height: number;
    width: number;
  };
}

export interface Pet {
  readonly id: number;
  readonly name: string;
  readonly cameFrom: string;
  readonly age: number;
  readonly description: string;
  readonly kind: "Dog" | "Cat";
  readonly color: string;
  readonly sex: "Boy" | "Girl";
  readonly special: boolean;
  readonly passport: boolean;
  readonly dead: boolean;
  readonly archived: boolean;
  readonly archiveDate: string;
  readonly reviewed: boolean;
  readonly sterilized: boolean;
  readonly sterilizationDate: string;
  readonly image: Image;
}

export interface Overexposure {
  readonly date: string;
  readonly placement: string;
  readonly note: string;
}

export interface Recommendation {
  readonly name: string;
  readonly date: string;
  readonly pet: string;
  readonly diagnosis: string;
  readonly recommendation: string;
  readonly forever: boolean;
}
