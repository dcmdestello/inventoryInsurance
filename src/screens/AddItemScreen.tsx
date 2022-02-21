import { useState } from 'react';
import { StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
 } from "react-native";

import Button from "../components/Button";
import InputSection from "../components/InputSection";
import PhotoPicker from "../components/PhotoPicker";
import { RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";
import { useAddInventoryItem } from '../inventory';

import type { ImageInfo } from '../sdk/ImagePicker';

export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [photo, setPhoto] = useState<ImageInfo | null>(null);
  const [description, setDescription] = useState("");

  const maybeAddItem = useAddInventoryItem(name, value, photo, description);

  const handleAddItem = () => {
    maybeAddItem(navigation.goBack);
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.buttonsContainer}>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
          <Button title="Add" onPress={handleAddItem} />
        </View>
        <PhotoPicker photo={photo} setPhoto={setPhoto} />
        <InputSection
          title="Name"
          value={name}
          onChangeText={setName}
          placeholder="Bracelet"
        />
        <InputSection
          title="Value"
          value={value}
          onChangeText={setValue}
          placeholder="700"
          keyboardType="numeric"
        />
        <InputSection
          title="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Optional"
          numberOfLines={4}
        />
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  buttonsContainer: {
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});
