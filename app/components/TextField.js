import {Text, TextInput, View } from 'react-native';
import styles from '../lib/styles';

export default function TextField({label, value, onChangeText, secureTextEntry = false}) {
  return (
    <View style={styles.field}>
        <Text style={{...styles.text, ...styles.label}}>{label}</Text>

        <TextInput 
          style={{...styles.text, ...styles.textInput}}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}  
        />
    </View>
  );
}