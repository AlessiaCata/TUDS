import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 48,
  },

  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },

  text: {
    fontSize: 22
  },

  field: {
    borderColor: '888',
    borderWidth: 2,
    margin: 20,
    padding: 10,
    width: '100%',
    backgroundColor: '#ccd',
  },

  label: {
 
  },

  textInput: {
    fontSize: 28,
    borderColor: '888',
    backgroundColor: '#eee',
    borderWidth: 2,
  },

  button: {
    borderColor: '888',
    backgroundColor: '#eee',
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 20,
    margin: 5,
  },
  
  formTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },

  listItem: {
    borderColor: '888',
    backgroundColor: '#eee',
    borderWidth: 2,
    margin: 5,
    padding: 3,  
  }
      
});


export default styles;