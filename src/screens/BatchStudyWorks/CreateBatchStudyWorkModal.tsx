import React, { useState, useEffect } from "react";
import { TouchableOpacity, Modal, View, TextInput, Alert } from "react-native";
import { Text, Button, useTheme, Switch, RadioButton, IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createBatchStudyWork } from "../../redux/thunks/batchStudyWorkThunks";
import { resetCreateState } from "../../redux/slices/batchStudyWorkSlice";
import { fetchBatches } from "../../redux/thunks/batchThunks";
import { styles } from "./styles";

/* =========================
   Props
========================= */
interface CreateBatchStudyWorkModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function CreateBatchStudyWorkModal({
    visible,
    onClose,
}: CreateBatchStudyWorkModalProps) {
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const { createLoading, createSuccess } =
        useAppSelector((s) => s.batchStudyWorks);

    const batches = useAppSelector((s) => s.batches.batches);

    /* =========================
       Form State
    ========================= */
    const [form, setForm] = useState({
        workType: "",
        batchId: "",
        workTitle: "",
        workDescription: "",
        expectedCompletionDate: "",
        isActive: true,
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    /* =========================
       Effects
    ========================= */
    useEffect(() => {
        if (visible) {
            dispatch(fetchBatches());
        }
    }, [visible]);

    useEffect(() => {
        if (!createSuccess) return;

        Alert.alert("Success", "Batch Study Work created");
        dispatch(resetCreateState());
        onClose();
    }, [createSuccess]);

    /* =========================
       Submit
    ========================= */
    const handleSubmit = () => {
        if (!form.workType || !form.workTitle) {
            Alert.alert("Validation", "Work Type and Title are required");
            return;
        }

        dispatch(
            createBatchStudyWork({
                workType: form.workType,
                batchId: form.batchId ? Number(form.batchId) : null,
                workTitle: form.workTitle,
                workDescription: form.workDescription || undefined,
                expectedCompletionDate: form.expectedCompletionDate
                    ? new Date(form.expectedCompletionDate).toISOString()
                    : undefined,
                isActive: form.isActive,
            })
        );
    };

    /* =========================
       UI
    ========================= */
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View
                    style={[
                        styles.modalContainer,
                        { backgroundColor: theme.colors.background },
                    ]}
                >
                    <Text variant="titleMedium" style={{ marginBottom: 12 }}>
                        Create Batch Study Work
                    </Text>

                    {/* Work Type */}
                    <Text variant="labelLarge" style={{ marginBottom: 6 }}>
                        Work Type *
                    </Text>

                    <RadioButton.Group
                        onValueChange={(value) =>
                            setForm({ ...form, workType: value })
                        }
                        value={form.workType}
                    >
                        <View style={{ flexDirection: "row", marginBottom: 12 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}>
                                <RadioButton value="classwork" />
                                <Text>Classwork</Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton value="homework" />
                                <Text>Homework</Text>
                            </View>
                        </View>
                    </RadioButton.Group>

                    {/* Batch */}
                    <Picker
                        selectedValue={form.batchId}
                        onValueChange={(v) => setForm({ ...form, batchId: v })}
                    >
                        <Picker.Item label="Select Batch" value="" />
                        {batches.map((b) => (
                            <Picker.Item
                                key={b.batchId}
                                label={b.batchCode}
                                value={String(b.batchId)}
                            />
                        ))}
                    </Picker>

                    {/* Title */}
                    <TextInput
                        placeholder="Work Title"
                        style={styles.input}
                        value={form.workTitle}
                        onChangeText={(v) => setForm({ ...form, workTitle: v })}
                    />

                    {/* Description */}
                    <TextInput
                        placeholder="Description"
                        multiline
                        style={[styles.input, { height: 90 }]}
                        value={form.workDescription}
                        onChangeText={(v) =>
                            setForm({ ...form, workDescription: v })
                        }
                    />

                    {/* Date */}
                    {/* Expected Completion Date */}
                    <Text variant="labelLarge" style={{ marginBottom: 6 }}>
                        Expected Completion Date
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <View
                            style={[
                                styles.input,
                                {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingVertical: 14,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    color: form.expectedCompletionDate
                                        ? theme.colors.onSurface
                                        : theme.colors.onSurfaceVariant,
                                }}
                            >
                                {form.expectedCompletionDate
                                    ? new Date(form.expectedCompletionDate).toDateString()
                                    : "Select date"}
                            </Text>

                            <IconButton icon="calendar" size={20} />
                        </View>
                    </TouchableOpacity>

                    {/* Active Switch */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <Text style={{ marginRight: 10 }}>Active</Text>
                        <Switch
                            value={form.isActive}
                            onValueChange={(v) => setForm({ ...form, isActive: v })}
                        />
                    </View>

                    {/* Actions */}
                    <View style={styles.modalActions}>
                        <Button onPress={onClose}>Cancel</Button>
                        <Button
                            mode="contained"
                            loading={createLoading}
                            onPress={handleSubmit}
                        >
                            Save
                        </Button>
                    </View>

                    {/* Date Picker */}
                    {showDatePicker && (
                        <DateTimePicker
                            value={
                                form.expectedCompletionDate
                                    ? new Date(form.expectedCompletionDate)
                                    : new Date()
                            }
                            mode="date"
                            minimumDate={new Date()}
                            onChange={(_, date) => {
                                setShowDatePicker(false);
                                if (date) {
                                    setForm({
                                        ...form,
                                        expectedCompletionDate: date.toISOString(),
                                    });
                                }
                            }}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
}
