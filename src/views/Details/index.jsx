import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import firebase from '../../config/firebaseconfig'
import styles from './style'


export default function Details({ navigation, route }) {
  const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
  const idTask = route.params.id

  const database = firebase.firestore()

  function editTask() {
    database.collection(route.params.idUser).doc(idTask).update({ description: descriptionEdit })
    navigation.navigate("Task", { idUser: route.params.idUser })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={styles.input}
        placeholder="Ex: study javascript"
        onChangeText={setDescriptionEdit}
        value={descriptionEdit}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => editTask()}
      >
        <Text style={styles.iconButton}>Edit</Text>
      </TouchableOpacity>
    </View>
  )
}