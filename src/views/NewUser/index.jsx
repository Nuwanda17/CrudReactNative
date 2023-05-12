import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'

import firebase from '../../config/firebaseconfig'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function NewUser({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorRegister, setErrorRegister] = useState(false)

  const register = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user
        navigation.navigate("Login")
      })
      .catch((error) => {
        setErrorRegister(true)
        console.log(error)
        const errorCode = error.code 
        const errorMessage = error.message
      })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Create a Task account</Text>
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
      {errorRegister && (
          <View style={styles.contentAlert}>
            <MaterialCommunityIcons name="alert-circle" size={24} color="#bdbdbd" />
            <Text style={styles.warningAlert}>invalid e-mail or password</Text>
          </View>
      )}
      <TouchableOpacity
        disabled={email === "" || password === ""}
        style={styles.buttonRegister}
        onPress={register}
      >
        <Text style={styles.textButtonRegister}>Register</Text>  
      </TouchableOpacity>
      <Text style={styles.login}>
        already register? 
        <Text 
          style={styles.linkLogin}
          onPress={() => navigation.navigate("Login")}
        >
          Login...
        </Text>
      </Text>
    </KeyboardAvoidingView>
  )
}