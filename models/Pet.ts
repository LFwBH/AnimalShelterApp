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

interface Image {
  url: string;
  thumb: string;
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
