interface PetStackProps {
  petId: number;
  petName: string;
  favorite: boolean;
}

interface PetsStackProps {
  favorites: boolean;
}

interface LostPetStackProps {
  petId: number;
}

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Pets: PetsStackProps;
  Pet: PetStackProps;
  LostPet: LostPetStackProps;
  Chat: undefined;
  CatForm: undefined;
  DogForm: undefined;
  Login: undefined;
  AboutUs: undefined;
  LostPets: undefined;
  Profile: undefined;
  Reports: undefined;
  Incomes: undefined;
  Outcomes: undefined;
  Arrivals: undefined;
  Departures: undefined;
};

export type BottomTabParamList = {
  Pets: undefined;
  Chat: undefined;
  AboutUs: undefined;
  Lost: undefined;
  Profile: undefined;
  Favorites: undefined;
  Reports: undefined;
};

export type PetsParamList = {
  Pets: undefined;
};

export type ChatParamList = {
  Chat: undefined;
};

export type AboutUsParamList = {
  AboutUs: undefined;
};

export type LostPetsParamList = {
  LostPets: undefined;
};

export type ProfileParamList = {
  Profile: undefined;
};

export type FavoritesParamList = {
  Favorites: { favorites: boolean };
};

export type ReportParamList = {
  Reports: undefined;
};
