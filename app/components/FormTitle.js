import { Text, View } from 'react-native';
import styles from '../lib/styles';

export default function FormTitle({children}) {
  return (
    <View>
      <Text style={{...styles.text, ...styles.formTitle}}>{children}</Text>
    </View>
  );
}