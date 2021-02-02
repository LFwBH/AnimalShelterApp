export interface Breed {
  readonly id: number;
  readonly name: string;
}

export interface Color {
  readonly id: number;
  readonly name: string;
}

export interface Sex {
  readonly id: number;
  readonly name: string;
}

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
  readonly age: number;
  readonly description: string;
  readonly breed: Breed;
  readonly color: Color;
  readonly sex: Sex;
  readonly special: boolean;
  readonly image: Image;
}
