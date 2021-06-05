/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useNavigation } from "@react-navigation/core";
import { DateTime } from "luxon";
import React, { useCallback } from "react";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

import Box, { Row } from "../../components/Box";
import PetsList from "../../components/PetsList";
import Text from "../../components/Text";
import { Arrival } from "../../models/Arrivals";
import { Pet } from "../../models/Pet";
import { BackButton, BackIcon } from "./styles";

const TRANSITION_TIMEOUT = 300;

interface ArrivalsModalProps {
  isVisible: boolean;
  arrival?: Arrival;
  onClose?: () => void;
}

function ArrivalsModal({ arrival, isVisible, onClose }: ArrivalsModalProps) {
  const navigation = useNavigation();

  const handlePressPet = useCallback(
    (pet: Pet) => {
      onClose?.();

      setTimeout(() => {
        navigation.navigate("Pet", {
          petId: pet.id,
          petName: pet.name,
        });
      }, TRANSITION_TIMEOUT);
    },
    [navigation, onClose],
  );

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <Box edges={["top", "bottom"]} as={SafeAreaView} flex={1} primary>
        <Row py={2} justifyContent="center">
          <BackButton onPress={onClose}>
            <BackIcon />
          </BackButton>
          <Text fontWeight="semi" alignSelf="center" fontSize="lg" background>
            {arrival &&
              DateTime.fromISO(arrival?.date).toLocaleString(
                DateTime.DATE_SHORT,
              )}
          </Text>
        </Row>
        <Box
          borderTopLeftRadius={18}
          borderTopRightRadius={18}
          background
          p={3}
          flex={1}
        >
          <Row flex={1} background>
            <PetsList onPressPet={handlePressPet} />
          </Row>
        </Box>
      </Box>
    </Modal>
  );
}

export default ArrivalsModal;
