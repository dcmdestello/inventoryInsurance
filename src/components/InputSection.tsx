import { StyleSheet, View, TextInput, Text, TextInputProps, TouchableWithoutFeedback } from "react-native";

type InputSectionProps = {
  title:string,
} & TextInputProps;

export default function InputSection({ title,
  numberOfLines = 1,
  ...props
} : InputSectionProps) {
  const isMultiline = numberOfLines > 1;
  return(
    <TouchableWithoutFeedback>
      <View style={styles.inputSection}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={[styles.textInput, { textAlignVertical: (isMultiline ? 'top' : 'center') }]}
          numberOfLines={numberOfLines}
          multiline={isMultiline}
          {...props}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3,
    padding: 3,
    backgroundColor: 'white',
  }
});
