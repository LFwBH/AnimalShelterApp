export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Pets: undefined;
  Pet: { petId: number; petName: string };
  LostPet: { petId: number };
  Chat: undefined;
  CatFormScreen: undefined;
  DogFormScreen: undefined;
  LoginScreen: undefined;
  AboutUs: undefined;
  LostPets: undefined;
};

export type BottomTabParamList = {
  Pets: undefined;
  Chat: undefined;
  AboutUs: undefined;
  Lost: undefined;
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
