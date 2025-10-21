import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, KeyboardAvoidingView, Platform, } from "react-native";
import StylesGlobal, { Colors } from "../stylesGlobal";
import Axios from "axios";
import URL from "../src/db.js";
import { ScrollView } from "react-native-web";

export default function ChatIn({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef();

  const chatId = localStorage.getItem("chatId");
  console.log("ChatId:" + chatId);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await Axios.get(`${URL}/messages/${chatId}`);
        console.log("response data ", response.data);

        setMessages(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        alert("Erro ao carregar mensagens");
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const userId = localStorage.getItem("token");
      const payload = {
        chatID: chatId,
        senderID: userId,
        content: newMessage,
      };
      const response = await Axios.post(`${URL}/messages/`, payload);
      console.log("response from send message", response);

      setNewMessage('');

    } catch (error) {
      console.error("Error sending message:", error);
      alert("Erro ao enviar mensagem");
    }
  };

  return (
    <ScrollView scrollEnabled={false} style={StylesGlobal.bodyContainer}>
      <View style={StylesGlobal.header}>
        <View style={StylesGlobal.leftheader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/icons/normal/leftArrow.svg")}
              style={StylesGlobal.backIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={StylesGlobal.rightheader}>
          <Text style={StylesGlobal.headerTitle}>Chat</Text>
        </View>
      </View>

      <ScrollView scrollEnabled={true} style={{ height: '75vh', padding: 16 }}>
        {loading ? (
          <View style={styles.centerContent}>
            <Text style={StylesGlobal.loadingText}>Carregando...</Text>
          </View>
        ) : (
          messages.map((msg, index) => {
            console.log(index);
            console.log("mensagens", msg);

            const isMyMessage = msg?.senderID == localStorage.getItem("token");
            console.log('ismymessage', isMyMessage);
            return (
              <View
                style={[
                  styles.messageContainer,
                  isMyMessage ? styles.myMessage : styles.otherMessage,
                ]}
                key={index}
              >
                <Text style={styles.messageText}>{msg?.content}</Text>
                <Text style={styles.timeStamp}>
                  {new Date(msg?.sentAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Digite sua mensagem..."
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendMessage()}
        >
          <Image source={require("../assets/icons/alt/sendIcon.svg")} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  myMessage: {
    backgroundColor: Colors.primaryColor,
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: "#8f8f8fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  timeStamp: {
    fontSize: 10,
    color: "#rgba(255,255,255,0.7)",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 6,
    margin: 2,
    maxHeight: 128,
    textAlignVertical: 'center'
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: Colors.primaryColor,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
