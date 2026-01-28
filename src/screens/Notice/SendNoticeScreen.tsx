import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

const SendNoticeScreen = () => {
  const route = useRoute<any>();

  return (
    <View style={{ padding: 20 }}>
      <Text variant="titleLarge">Send Message Screen</Text>

      <Text style={{ marginTop: 10 }}>
        Params: {JSON.stringify(route.params)}
      </Text>
    </View>
  );
};

export default SendNoticeScreen;
