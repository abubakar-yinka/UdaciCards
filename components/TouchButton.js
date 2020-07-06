import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { white, darkGray, gray } from '../utils/colors';

function TouchButton({ children, onPress, btnStyle = {}, txtStyle = {}, disabled = false }) {
  const disabledButton = disabled ? styles.btnDisabled : {};
  const disabledButtonText = disabled ? styles.btnTextDisabled : {};

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={[styles.btn, btnStyle, disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[
            styles.btnText,
            txtStyle,
            disabledButtonText
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: `center`,
    alignItems: `center`,
    borderColor: gray
  },
  btnDisabled: {
    backgroundColor: darkGray,
    borderColor: gray
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: white
  },
  btnTextDisabled: {
    color: darkGray
  }
});

export default TouchButton


