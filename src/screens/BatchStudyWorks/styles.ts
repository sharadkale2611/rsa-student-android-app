import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContainer: { padding: 12 },

  card: {
    marginBottom: 12,
    borderRadius: 12,
  },

  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 16,
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});
