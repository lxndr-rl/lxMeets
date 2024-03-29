import React from "react";
import { StyleSheet, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

// eslint-disable-next-line no-undef
const Horario = () => {
  let images = [
    {
      url: `https://lxmeets.lxndr.dev/res/horario.png?f=${Math.random()}`,

      props: {},
    },
  ];
  return (
    <View style={styles.safeArea}>
      <ImageViewer imageUrls={images} saveToLocalByLongPress={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
});

export default Horario;
