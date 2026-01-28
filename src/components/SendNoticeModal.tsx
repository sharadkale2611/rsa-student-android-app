import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

interface Props {
  visible: boolean;
  onClose: () => void;

  // target info (used for both create & edit)
  targetType: "BATCH" | "STUDENT";
  targetName: string;

  // callback
  onSend: (title: string, message: string) => void;

  // ===== EDIT MODE SUPPORT =====
  isEdit?: boolean;
  initialTitle?: string;
  initialMessage?: string;
}

const SendNoticeModal: React.FC<Props> = ({
  visible,
  onClose,
  targetType,
  targetName,
  onSend,
  isEdit = false,
  initialTitle = "",
  initialMessage = "",
}) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  /* ================= PREFILL ON OPEN ================= */
  useEffect(() => {
    if (visible) {
      setTitle(initialTitle);
      setMessage(initialMessage);
    }
  }, [visible, initialTitle, initialMessage]);

  /* ================= HANDLER ================= */
  const handleSend = () => {
    if (!title.trim() || !message.trim()) return;

    onSend(title.trim(), message.trim());
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}} // 🔥 required for Android
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <View style={styles.modal}>
          {/* HEADER */}
          <Text variant="titleMedium" style={styles.title}>
            {isEdit ? "Edit Notice" : `Send message to ${targetType}`}
          </Text>

          <Text style={styles.subTitle}>{targetName}</Text>

          {/* TITLE */}
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
          />

          {/* MESSAGE */}
          <TextInput
            label="Message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            mode="outlined"
            style={styles.input}
          />

          {/* ACTION BUTTON */}
          <Button mode="contained" onPress={handleSend}>
            {isEdit ? "Update" : "Send"}
          </Button>

          {/* CANCEL */}
          <Button
            mode="text"
            onPress={onClose}
            style={{ marginTop: 8 }}
          >
            Cancel
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SendNoticeModal;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
  },
  title: {
    marginBottom: 4,
  },
  subTitle: {
    marginBottom: 12,
    color: "#555",
  },
  input: {
    marginBottom: 12,
  },
});
