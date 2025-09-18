import React from 'react';
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../styles/color';

type Props = {
  title?: string;
  secondary?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  onPress: () => void;
  testID?: string;
  icon?: string;
  iconStyle?: TextStyle;
};

const Button = ({
  title,
  secondary,
  outlined,
  disabled,
  style,
  textStyle,
  onPress,
  testID,
  icon,
  iconStyle,
}: Props) => {
  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={disabled ? 1 : undefined}
      onPress={disabled ? () => {} : onPress}
      style={[
        styles.container,
        disabled
          ? styles.disabledButtonStyle
          : secondary
          ? styles.secondaryButtonStyle
          : outlined
          ? styles.outlinedButtonStyle
          : styles.primaryButtonStyle,
        style,
      ]}>
      {!!icon && (
        <Icon
          size={22}
          style={[{marginRight: 12, color: color.black}, iconStyle]}
          name={icon}
        />
      )}
      <Text
        style={[
          secondary
            ? styles.secondaryTextStyle
            : outlined
            ? styles.outlinedTextStyle
            : styles.primaryTextStyle,
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButtonStyle: {
    alignSelf: 'stretch',
    backgroundColor: color.primary.blue,
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 1,
  },
  primaryTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonStyle: {
    backgroundColor: color.secondary.medium,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 1,
  },
  secondaryTextStyle: {
    alignSelf: 'center',
    color: color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlinedButtonStyle: {
    backgroundColor: color.white,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 1,
    borderColor: color.primary.blue,
    borderWidth: 1,
  },
  outlinedTextStyle: {
    alignSelf: 'center',
    color: color.primary.blue,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonStyle: {
    backgroundColor: color.gray.mid,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 1,
  },
});

export {Button};
