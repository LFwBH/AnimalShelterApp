import noop from "lodash/noop";
import { DateTime } from "luxon";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Col, Row } from "../../components/Box";
import Text from "../../components/Text";
import { Departure } from "../../models/Departure";
import { DepartureItem } from "./styles";

interface ListItemProps {
  item: Departure;
  onPress?: (departure: Departure) => void;
}

function ListItem({ item, onPress = noop }: ListItemProps) {
  const handlePress = useCallback(() => onPress(item), [item, onPress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <DepartureItem p={3}>
        <Col flex={1}>
          <Row>
            <Text flex={4} fontSize="lg">
              {DateTime.fromISO(item.date).toLocaleString(DateTime.DATE_SHORT)}
            </Text>
            <Text flex={1} fontSize="lg">
              -
            </Text>
          </Row>
        </Col>
        <Col flex={1.5}>
          <Row flex={1}>
            <Text fontSize="lg">{item.count.cats} Кошки, </Text>
            <Text fontSize="lg">{item.count.dogs} Собаки</Text>
          </Row>
        </Col>
      </DepartureItem>
    </TouchableOpacity>
  );
}

export default ListItem;
