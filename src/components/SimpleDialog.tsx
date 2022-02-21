import { Modal, Text, View, Platform, StyleSheet } from 'react-native';
import PressableOpacity from './PressableOpacity';
import Button from './Button';

import { colors } from '../theme/colors';

type Option = {
  text: string,
  onPress: () => void,
};

type SimpleDialogProps = {
  visible: boolean,
  setVisible: (isVisible: boolean) => void,
  title: string,
  options?: Option[],
};

export default function({ title, visible, setVisible, options = [] } : SimpleDialogProps) {
  const buttons = options.map((option, index) => (
    <PressableOpacity key={option.text + index}
      style={styles.option}
      onPress={option.onPress}
    >
      <Text style={styles.optionText}>{option.text}</Text>
    </PressableOpacity>
  ))

  return(
    <Modal
      visible={visible}
      animationType="fade"
      transparent
    >
      <View style={styles.centeredView}>
        <View style={styles.simpleDialog}>
          <Text style={styles.title}>{title}</Text>
          {buttons}
          <View style={styles.rightAlign}>
            <Button title="Cancel" onPress={ () => { setVisible(false) }} color="black" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  simpleDialog: {
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 40,
    borderBottomWidth: 2,
    borderColor: 'grey',
    paddingVertical: 10,
  },
  option: {
    paddingLeft: 15,
    paddingTop: 18,
  },
  optionText: {
    fontSize: 18,
    color: colors.mainBlue,
  },
  rightAlign: {
    alignSelf: 'flex-end',
    marginVertical: 15,
    marginRight: 20,
  }
})
