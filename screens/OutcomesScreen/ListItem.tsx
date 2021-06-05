import noop from "lodash/noop";
import reduce from "lodash/reduce";
import { DateTime } from "luxon";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Col, Row } from "../../components/Box";
import Text from "../../components/Text";
import { OutcomeGroup } from "../../models/Outcome";
import { OutcomeItem } from "./styles";

interface ListItemProps {
  item: OutcomeGroup;
  onPress?: (income: OutcomeGroup) => void;
}

function ListItem({ item, onPress = noop }: ListItemProps) {
  const handlePress = useCallback(() => onPress(item), [item, onPress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <OutcomeItem p={3}>
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
        <Col flex={1.25}>
          <Row flex={1}>
            <Text fontSize="lg">
              {reduce(item.outcomes, (acc, obj) => acc + obj.amount, 0)}
            </Text>
          </Row>
        </Col>
      </OutcomeItem>
    </TouchableOpacity>
  );
}

export default ListItem;
