import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Alert } from "react-native-web";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={()=>{
        alert("click test121")
      }

      }>
      <Text style={styles.title}>Tab One</Text>
      </TouchableHighlight>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/src/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
