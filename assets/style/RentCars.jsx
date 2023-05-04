import { StyleSheet } from "react-native";
export {styles,styleRenta}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const styleRenta = StyleSheet.create({
    renta:{
      top:-10,
      color:'red',
      fontSize:30,
      fontWeight:"bold"
    }
  })