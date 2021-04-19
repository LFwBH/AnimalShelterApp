export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Pets: { favorites: boolean };
  Pet: { petId: number; petName: string };
  LostPet: { petId: number };
  Chat: undefined;
  CatForm: undefined;
  DogForm: undefined;
  Login: undefined;
  AboutUs: undefined;
  LostPets: undefined;
  Profile: undefined;
};

export type BottomTabParamList = {
  Pets: undefined;
  Chat: undefined;
  AboutUs: undefined;
  Lost: undefined;
  Profile: undefined;
  Favorites: undefined;
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
