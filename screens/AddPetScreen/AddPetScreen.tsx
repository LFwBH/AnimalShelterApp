/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StackScreenProps } from "@react-navigation/stack";
import findIndex from "lodash/findIndex";
import { DateTime } from "luxon";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createPet,
  fetchPetById,
  PET_KIND,
  PET_KIND_ALIAS,
  PET_SEX,
  PET_SEX_ALIAS,
  PETS_KEY,
  updatePet,
} from "../../api/pets";
import Box, { Row } from "../../components/Box";
import Button from "../../components/Button";
import CheckboxView from "../../components/CheckboxView";
import CustomInputField from "../../components/CustomInputField";
import DateInput from "../../components/DateInput";
import FullScreenLoading from "../../components/FullScreenLoading";
import InputField from "../../components/InputField";
import RoundButtonGroup from "../../components/RoundButtonGroup";
import Text from "../../components/Text";
import theme from "../../constants/theme";
import { Pet } from "../../models/Pet";
import { RootStackParamList } from "../../types/navigation";

interface AddPetScreenProps
  extends StackScreenProps<RootStackParamList, "AddPet"> {}

const AddPetScreen = ({ navigation, route }: AddPetScreenProps) => {
  const queryClient = useQueryClient();

  const petId = route.params?.petId;

  const petQuery = useQuery(
    ["pets", petId],
    () => fetchPetById({ petId: petId! }),
    { enabled: petId != null },
  );

  const loadedPet = petQuery.data?.data as NonNullable<Pet>;

  useEffect(() => {
    if (petId != null) {
      navigation.setOptions({ headerTitle: "Редактирование" });
    }
  }, [navigation, petId]);

  const [pet, setPet] = useState<Partial<Pet>>(() => ({
    age: undefined,
    color: undefined,
    description: undefined,
    kind: PET_KIND_ALIAS[PET_KIND.CAT],
    name: undefined,
    passport: undefined,
    sex: PET_SEX_ALIAS[PET_SEX.BOY],
    sterilizationDate: undefined,
    sterilized: undefined,
  }));

  console.log(
    "🚀 ~ file: AddPetScreen.tsx ~ line 56 ~ AddPetScreen ~ pet",
    pet,
  );

  useEffect(() => {
    if (loadedPet != null) {
      setPet((nextPet) => ({ ...nextPet, ...loadedPet }));
    }
  }, [loadedPet]);

  const handleChangeName = useCallback((text: string) => {
    setPet((nextPet) => ({ ...nextPet, name: text }));
  }, []);

  const handleChangeAge = useCallback((text: string) => {
    setPet((nextPet) => ({ ...nextPet, age: Number(text) }));
  }, []);

  const handleChangeKind = useCallback((selectedKindIndex: PET_KIND) => {
    const nextKind = PET_KIND_ALIAS[selectedKindIndex];
    setPet((nextPet) => ({ ...nextPet, kind: nextKind }));
  }, []);

  const handleChangeSex = useCallback((selectedSexIndex: PET_SEX) => {
    const nextSex = PET_SEX_ALIAS[selectedSexIndex];
    setPet((nextPet) => ({ ...nextPet, sex: nextSex }));
  }, []);

  const handleChangeColor = useCallback(
    (text: string) => setPet((nextPet) => ({ ...nextPet, color: text })),
    [],
  );

  const handleChangeSterilized = useCallback(() => {
    setPet((nextPet) => ({
      ...nextPet,
      sterilized: !nextPet.sterilized,
      sterilizationDate: DateTime.local().toISODate(),
    }));
  }, []);

  const handleChangeSterilizationDate = useCallback((date: string) => {
    setPet((nextPet) => ({ ...nextPet, sterilizationDate: date }));
  }, []);

  const handleChangePassport = useCallback(
    () => setPet((nextPet) => ({ ...nextPet, passport: !nextPet.passport })),
    [],
  );

  const handleChangeDescription = useCallback(
    (text: string) => setPet((nextPet) => ({ ...nextPet, description: text })),
    [],
  );

  const handleChangeSpecial = useCallback(
    () => setPet((nextPet) => ({ ...nextPet, special: !nextPet.special })),
    [],
  );

  const handleChangeCameFrom = useCallback(
    (text: string) => setPet((nextPet) => ({ ...nextPet, cameFrom: text })),
    [],
  );

  const createPetMutation = useMutation(() => createPet(pet), {
    onSuccess: () => queryClient.invalidateQueries(PETS_KEY),
  });

  const updatePetMutation = useMutation(
    () => updatePet({ id: petId, ...pet }),
    { onSuccess: () => queryClient.invalidateQueries(PETS_KEY) },
  );

  const handleSavePet = useCallback(async () => {
    const mutationHandler = petId ? updatePetMutation : createPetMutation;
    await mutationHandler.mutateAsync();
    navigation.goBack();
  }, [createPetMutation, navigation, petId, updatePetMutation]);

  const kindValue = findIndex(
    [
      { kind: PET_KIND_ALIAS[PET_KIND.DOG] },
      { kind: PET_KIND_ALIAS[PET_KIND.CAT] },
    ],
    { kind: pet.kind },
  );

  const sexValue = findIndex(
    [{ sex: PET_SEX_ALIAS[PET_SEX.BOY] }, { sex: PET_SEX_ALIAS[PET_SEX.GIRL] }],
    { sex: pet.sex },
  );

  const disabled = !pet.name || !pet.description || !pet.age || !pet.color;

  let content: JSX.Element | null = null;

  if (petId && petQuery.isLoading) {
    return <FullScreenLoading />;
  } else if (!petQuery.isError) {
    content = (
      <ScrollView
        style={{
          backgroundColor: theme.palette.background,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingHorizontal: theme.space[3],
          paddingVertical: theme.space[4],
        }}
      >
        <InputField
          value={pet.name ?? ""}
          label="Кличка питомца:"
          onChangeText={handleChangeName}
        />
        <InputField
          value={pet.age ?? null}
          keyboardType="numeric"
          label="Возраст питомца:"
          onChangeText={handleChangeAge}
        />
        <RoundButtonGroup
          selectedIndex={kindValue}
          label="Вид питомца"
          firstButton="Собака"
          secondButton="Кошка"
          onChange={handleChangeKind}
        />
        <RoundButtonGroup
          selectedIndex={sexValue}
          label="Пол питомца:"
          firstButton="Мужской"
          secondButton="Женский"
          onChange={handleChangeSex}
        />
        <InputField
          value={pet.color ?? ""}
          label="Окрас:"
          onChangeText={handleChangeColor}
        />
        <CheckboxView
          checked={pet.sterilized}
          title="Стерилизация:"
          onPress={handleChangeSterilized}
        />
        {pet.sterilized && (
          <Row px={2}>
            <DateInput
              value={pet.sterilizationDate!}
              onChange={handleChangeSterilizationDate}
            />
          </Row>
        )}
        <CheckboxView
          checked={pet.passport}
          title="Паспорт:"
          onPress={handleChangePassport}
        />
        <CustomInputField
          value={pet.description ?? ""}
          label="Характеристика:"
          onChange={handleChangeDescription}
        />
        <CheckboxView
          checked={pet.special}
          title="Особенность:"
          onPress={handleChangeSpecial}
        />
        <InputField
          value={pet.cameFrom ?? ""}
          label="Откуда прибыл питомец:"
          onChangeText={handleChangeCameFrom}
        />
        <Button
          round
          disabled={disabled || createPetMutation.isLoading}
          buttonStyle={{
            paddingVertical: theme.space[2],
            paddingHorizontal: theme.space[4],
          }}
          title={
            <Text fontSize="lg" background>
              Сохранить
            </Text>
          }
          onPress={handleSavePet}
        />
        <Box p={4} />
      </ScrollView>
    );
  }

  return (
    <Box
      as={SafeAreaView}
      edges={["right", "left", "bottom"]}
      flex={1}
      style={{
        backgroundColor: theme.palette.primary,
        elevation: 0,
        shadowColor: theme.palette.primary,
      }}
    >
      {content}
    </Box>
  );
};

export default AddPetScreen;
