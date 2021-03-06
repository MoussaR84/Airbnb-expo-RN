import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import colors from "../assets/colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
console.log(width);
console.log(height);

export default function SignUpScreen({ navigation, setToken, setUser }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    // vérifier que tous les champs sont bien remplis
    // vérifier que les 2 MDP sont identiques
    // envoyer les données vers le back

    if (email && username && description && password && confirmPassword) {
      console.log("on passe à la suite");
      if (password === confirmPassword) {
        console.log("on passe à la suite 2");

        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          //console.log("SIGN UP", response.data);
          if (response.data.token && response.data._id) {
            alert("Bienvenue sur Airbnb");
            // Stocker Token
            setToken(response.data.token);
            // Stocker User Id
            setUser(response.data._id);
          } else {
            alert("An error occurred");
          }
        } catch (error) {
          //console.log(Object.keys(error)); // affiche les clés de l'objet error
          //console.log(error.response.data.error); // Message du type : This email already has an account.
          //console.log(error.response.status); // 400 par exemple

          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("MDP doivent êtres identiques");
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {/* logoView */}
        <View style={styles.logoView}>
          <Image
            source={require("../assets/img/logorbnbw.png")}
            style={styles.logo}
            resizeMode="contain"
          ></Image>
          <Text>Sign up</Text>
        </View>

        {/* Inputs */}
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="email"
            keyboardType={"email-address"}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          ></TextInput>

          <TextInput
            style={styles.textInput}
            placeholder="username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.largeTextInput}
            placeholder="description"
            multiline={true}
            numberOfLines={10}
            maxLength={200}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="password"
            // secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          ></TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="confirm password"
            // secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          ></TextInput>
        </View>

        {/* Buttons */}
        <View>
          <View style={styles.errorView}>
            <Text style={styles.error}>{errorMessage}</Text>
          </View>
        </View>
        <View style={styles.navigationContainer}>
          <TouchableHighlight
            style={styles.buttonSignUP}
            onPress={handleSubmit}>
            <Text style={styles.textsignup}>SignUp</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonSignIn}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.textSignIn} >Go to SignIn</Text>
          </TouchableHighlight>
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
    // backgroundColor: "green",
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 2,
    borderRadius:5,
    borderColor: colors.red,
    width: 300,
    margin: 20,
    height: 40,
    padding:5,
  },
  largeTextInput: {
    borderRadius:5,
    borderWidth: 2,
    borderColor: colors.red,
    width: 300,
    margin: 20,
    height: 80,
    padding:5,
  },
  error: {
    fontSize: 20,
    color: "red",
  },
  errorView: {
    height: 30,
    width: 300,
  },
  navigationContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-between",
    marginTop:10,
  },
  buttonSignIn: {
    marginTop:10,
    fontSize: 60,
    height: 70,
    justifyContent: "center",
    borderColor:"black",
  },
  buttonSignUP: {
    fontSize: 60,
    height: 40,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderBottomColor:"black",
  },
  textsignup: {
    fontWeight: "bold",
    fontSize: 24,
    color: "grey",
    borderColor:"black",
    
  }
});