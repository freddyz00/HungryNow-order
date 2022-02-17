import { View, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

import { GiftedChat, Bubble, Time } from "react-native-gifted-chat";

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

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: { backgroundColor: "grey" },
          right: { backgroundColor: "#fcbf49" },
        }}
        textStyle={{ left: { color: "white" }, right: { color: "black" } }}
        renderTime={renderTime}
        tickStyle={{ color: "black" }}
      />
    );
  };

  const renderTime = (props) => {
    return (
      <Time
        timeTextStyle={{ left: { color: "white" }, right: { color: "black" } }}
        {...props}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <GiftedChat
        messages={messagesWithDriver}
        user={{ _id: 1, name: "me" }}
        onSend={onSend}
        renderBubble={renderBubble}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
