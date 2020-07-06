import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

function TextButton({ children, onPress, txtStyle = {} }) {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.btnText, txtStyle]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    marginBottom: 25
  },
  btnText: {
    fontSize: 25
  }
});

export default TextButton;

