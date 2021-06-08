// import { Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
// import React, { useCallback, useState } from "react";
// import { Platform, SafeAreaView, ScrollView, View } from "react-native";
// import { useMutation, useQueryClient } from "react-query";

// import Box from "../../components/Box";
// import Button from "../../components/Button";
// import CustomInputField from "../../components/CustomInputField";
// import Text from "../../components/Text";
// import theme from "../../constants/theme";
// import { Overexposure } from "../../models/Pet";
// import { RootStackParamList } from "../../types/navigation";

// const DatePicker = (props: any) => {
//   const [date, setDate] = useState(new Date(1_598_051_730_000));
//   const [show, setShow] = useState(false);

//   const onChange = (event: any, selectedDate: any) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === "ios");
//     setDate(currentDate);
//   };

//   return (
//     <View style={{ paddingLeft: 10 }}>
//       <Text style={{ paddingBottom: 7 }}>{props.name}</Text>
//       <DateTimePicker
//         testID="dateTimePicker"
//         value={date}
//         mode="date"
//         is24Hour={true}
//         display="default"
//         onChange={onChange}
//       />
//     </View>
//   );
// };

// const CustomSelect = () => {
//   const [data, setData] = useState("");
//   const handleInput = useCallback((value) => {
//     setData(value);
//   }, []);

//   return (
//     <Box display="flex" width="100%" justifyContent="center" p={2}>
//       <Text>Передержка</Text>
//       <Box
//         style={{
//           position: "relative",
//           backgroundColor: "#fff",
//           height: 30,
//           paddingHorizontal: 10,
//           marginTop: 10,
//           borderColor: "#5381D6",
//           borderWidth: 1,
//         }}
//       >
//         <Ionicons
//           style={{ position: "absolute", right: 12 }}
//           name="chevron-down"
//           size={24}
//           color="#5381D6"
//         />
//       </Box>
//     </Box>
//   );
// };

// const Card = () => {
//   return (
//     <>
//       <DatePicker name="Дата:" />
//       <CustomSelect />
//       <CustomInputField label="Примечание:" />
//     </>
//   );
// };

// interface AddOverexposureScreenProps
//   extends BottomTabScreenProps<RootStackParamList, "AddRecommendation"> {}

// const AddOverexposureScreen = ({
//   navigation,
//   route,
// }: AddOverexposureScreenProps) => {
//   const queryClient = useQueryClient();

//   const [overexposure, setOverexposure] = useState<Partial<Overexposure>>({
//     date: "",
//     placement: "",
//     note: "",
//   });

//   const createOverexposureMutation = useMutation({
//     onSuccess: () => queryClient.invalidateQueries("recommendation"),
//   });

//   const handlePressNextAddScreen = useCallback(() => {
//     navigation.navigate("AddRecommendation");
//   }, [navigation]);

//   const handleSaveOverexposure = useCallback(
//     () => createOverexposureMutation.mutate(),
//     [createOverexposureMutation],
//   );

//   return (
//     <Box
//       as={SafeAreaView}
//       flex={1}
//       style={{
//         backgroundColor: theme.palette.primary,
//         elevation: 0,
//         shadowColor: theme.palette.primary,
//       }}
//     >
//       <ScrollView
//         style={{
//           backgroundColor: theme.palette.background,
//           borderTopLeftRadius: 30,
//           borderTopRightRadius: 30,
//           paddingHorizontal: 15,
//           paddingTop: 20,
//         }}
//       >
//         <Card />
//         <Button
//           round
//           buttonStyle={{
//             paddingVertical: theme.space[2],
//             paddingHorizontal: theme.space[2],
//             marginBottom: 10,
//           }}
//           title={
//             <>
//               <Text fontSize="lg" background>
//                 Добавить передержку
//               </Text>
//             </>
//           }
//         />

//         <Button
//           round
//           buttonStyle={{
//             paddingVertical: theme.space[2],
//             paddingHorizontal: theme.space[4],
//           }}
//           title={
//             <>
//               <Text fontSize="lg" background>
//                 Далее
//               </Text>
//             </>
//           }
//           onPress={handlePressNextAddScreen}
//         />
//         <Box style={{ padding: 20 }} />
//       </ScrollView>
//     </Box>
//   );
// };

// export default AddOverexposureScreen;
