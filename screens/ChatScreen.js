import { View, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

import { GiftedChat } from "react-native-gifted-chat";

import { useOrderTracker } from "../context/OrderTrackerContext";
import { useAuth } from "../context/AuthContext";

const ChatScreen = ({ route }) => {
  const { messagesWithDriver, setMessagesWithDriver, pusher } =
    useOrderTracker();
  const { user } = useAuth();

  let user_rider_channel;

  const onSend = (messages = []) => {
    user_rider_channel = pusher.subscribe(`private-user-rider-${user.uid}`);
    user_rider_channel.trigger("client-new-message", {
      messages,
    });
    setMessagesWithDriver(
      GiftedChat.append(
        [...messagesWithDriver],
        [{ ...messages[0], sent: true }]
      )
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <GiftedChat
        messages={messagesWithDriver}
        user={{ _id: 1, name: "me" }}
        onSend={onSend}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
