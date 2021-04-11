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

export interface LostPet {
  readonly id: number;
  readonly description: string;
  readonly archived: boolean;
  readonly archiveDate: string;
  readonly sterilized: boolean;
  readonly sterilizationDate: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly image: Image;
}
