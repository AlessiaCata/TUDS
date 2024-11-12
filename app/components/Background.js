import { View, ImageBackground } from 'react-native';
import styles from '../lib/styles';

export default function Background({children}) {
  return (
    <View style={styles.container}>
        <ImageBackground
            style={styles.background}
            source= {require ('../assets/fondo.jpg')}
        >
            {children}
        </ImageBackground>
    </View>
  );
}