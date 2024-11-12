import { Pressable, Text, View } from 'react-native';
import styles from '../lib/styles';

export default function Button({onPress, children}) {
  return (
    <View>
      <Pressable
        style={styles.button}
        onPress = {onPress}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}