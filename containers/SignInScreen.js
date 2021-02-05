import React, {useState} from "react";
import { useNavigation } from "@react-navigation/core";
import { StatusBar,Button, Text, TextInput, View, TouchableOpacity,StyleSheet,Image,SafeAreaView,TouchableHighlight } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from"../assets/colors";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function SignInScreen({ navigation, setToken, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (email && password) {
      // Requête Axios
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );
        //console.log("SIGN IN", response.data);
        if (response.data.token && response.data.id) {
          // Envoyer token à la fonction qui gère le cookie
          setToken(response.data.token);
          setUser(response.data.id);
        } else {
          alert("An error occurred");
        }
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("All fields must be completed");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={require("../assets/img/logorbnbw.png")}
            ></Image>
            <Text style={styles.title}>Sign In</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.paleRed}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
 
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.paleRed}
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
            
          />
          

          <View style={styles.buttonArea}>
            <View style={styles.warningView}>
              <Text style={styles.warningText}>{errorMessage}</Text>
            </View>
            <TouchableHighlight style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.link}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.linkText}>No account? Register</Text>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: colors.white,
    flex: 1,
  },
  scrollView: {
    // flex: 1,
    //backgroundColor: colors.red,
  },
  formContainer: {
    marginLeft: 30,
    marginRight: 30,
  },
  header: {
    alignItems: "center",
  },
  title: {
    color: colors.grey,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    height: 150,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 10,
    
  },
  input: {
    paddingLeft: 5,
    color: colors.grey,
    height: 40,
    marginBottom: 10,
    borderBottomWidth:2,
    shadowColor:colors.red,
    borderTopColor: colors.white,
    borderLeftColor: colors.white,
    borderRightColor: colors.white,
    borderBottomColor: colors.red,
    borderWidth: 1,
  },
  description: {
    color: colors.red,
    textAlignVertical: "top",
    marginBottom: 10,
    borderTopColor: colors.red,
    borderLeftColor: colors.red,
    borderRightColor: colors.red,
    borderBottomColor: colors.white,
    borderWidth: 1,
  },
  buttonArea: {
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: "55%",
    height: 55,
    borderRadius: 50,
    borderColor: colors.grey,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.grey,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 20,
  },
  link: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  linkText: {
    color: colors.paleRed,
  },
  warningView: {
    height: 25,
    justifyContent: "center",
  },
  warningText: {
    color: colors.red,
    fontWeight: "bold",
  },
});
