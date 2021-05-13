/* eslint-disable no-undef */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default Main = () => {
  let images = [
    {
      url: `https://lxmeets.lxndr.dev/res/horarioex.png?f=${Math.random()}`,

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
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 12,
  },
  title: {
    fontSize: 28,
  },
  subTitle: {
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    backgroundColor: '#000000',
    margin: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
