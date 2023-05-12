import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'

import firebase from '../../config/firebaseconfig'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Login({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorLogin, setErrorLogin] = useState(false)
  
  const loginFirebase = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Task", { idUser: user.uid })
      })
      .catch((error) => {
        setErrorLogin(true)
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        navigation.navigate("Task", { idUser: user.uid })
      } 
    })
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Task</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter your email"
        type="text"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput 
        style={styles.input}
        secureTextEntry
        placeholder="Enter your password"
        type="text"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {errorLogin && (
          <View style={styles.contentAlert}>
            <MaterialCommunityIcons name="alert-circle" size={24} color="#bdbdbd" />
            <Text style={styles.warningAlert}>invalid e-mail or password</Text>
          </View>
      )}
      <TouchableOpacity
        disabled={email === "" || password === ""}
        style={styles.buttonLogin}
        onPress={loginFirebase}
      >
        <Text style={styles.textButtonLogin}>Login</Text>  
      </TouchableOpacity>
      <Text style={styles.registration}>
        dont't have a registration?
        <Text 
          style={styles.linkSubscribe}
          onPress={() => navigation.navigate("NewUser")}
        >
          subscribe now
        </Text>
      </Text>
    </KeyboardAvoidingView>
  )
}