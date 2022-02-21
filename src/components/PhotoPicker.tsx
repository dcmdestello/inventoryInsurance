import { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { ImagePicker } from '../sdk/ImagePicker';
import type { ImageInfo, ImagePickerResult } from '../sdk/ImagePicker';
import PressableOpacity from './PressableOpacity';
import SimpleDialog from './SimpleDialog';

type PhotoPickerProps = {
  photo: ImageInfo | null,
  setPhoto: (image: ImageInfo | null) => void,
}

import { Entypo } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function PhotoPicker({ photo, setPhoto }: PhotoPickerProps) {
  const [ isImagePickerDialogVisible, setImagePickerDialogIsVisible ] = useState(false);

  const handlePickImage = () => {
    setImagePickerDialogIsVisible(true);
  };

  const handleRemoveImage = () => {
    setPhoto(null);
  }

  const handleImagePickerResult = (result: ImagePickerResult) => {
    if (result && !result.cancelled) {
      const { cancelled, ...imageInfo } = result;
      setPhoto(imageInfo);
    }
  }

  const handlePickFromCamera = async () => {
    setImagePickerDialogIsVisible(false);
    handleImagePickerResult(await ImagePicker.takePhoto());
  }

  const handlePickFromGallery = async () => {
    setImagePickerDialogIsVisible(false);
    handleImagePickerResult(await ImagePicker.pickImage());
  }

  let content = null;

  if (photo && photo.uri) {
    content = (
      <>
        <View style={[styles.centerCircleWrapper, styles.imageWrapper]}>
          <Image style={styles.image} source={{uri: photo.uri}} />
        </View>
        <View style={[styles.centerCircleWrapper, styles.removeWrapper]}>
          <PressableOpacity style={styles.removeButton} onPress={handleRemoveImage}>
            <Entypo name="trash" size={22} color="white" />
          </PressableOpacity>
        </View>
      </>
    );
  } else {
    content = (
        <PressableOpacity onPress={handlePickImage}>
          <Entypo name="camera" size={90} color={colors.mainBlue} />
        </PressableOpacity>
    );
  }

  return (
    <View style={styles.photoPicker}>
      {content}
      <SimpleDialog
        visible={isImagePickerDialogVisible}
        setVisible={setImagePickerDialogIsVisible}
        title="Select an image"
        options={[
          {text: 'Take photo', onPress: handlePickFromCamera},
          {text: 'From gallery', onPress: handlePickFromGallery}
        ]} />
    </View>
  );
}

const HEIGHT = 200;

const styles = StyleSheet.create({
  photoPicker: {
    height: HEIGHT,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCircleWrapper: {
    width: HEIGHT,
    height: HEIGHT,
    borderRadius: 100,
    alignSelf: 'center',
  },
  imageWrapper: {
    overflow: 'hidden',
  },
  removeWrapper: {
    position: 'absolute',
  },
  image: {
    flex: 1,
  },
  buttonsWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 20,
    width: 40,
    height: 40,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
