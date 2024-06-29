import React, { useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PatientSignup = () => {
  const [patientName, setPatientName] = useState('');
  const [patientID, setPatientID] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [insulinIntake, setInsulinIntake] = useState('');

 

  const navigation = useNavigation(); // Access navigation object

  const handleSignup = () => {
    navigation.navigate('Duplicate');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* Content of the container at the top */}
        <Text style={styles.heading}> Notification </Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={patientName}
            onChangeText={setPatientName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Patient ID</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={patientID}
            onChangeText={setPatientID}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={date}
            onChangeText={setDate}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={time}
            onChangeText={setTime}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Present Glucose Level</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={glucoseLevel}
            onChangeText={setGlucoseLevel}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Insulin Intake</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={insulinIntake}
            onChangeText={setInsulinIntake}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}> Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: windowWidth * 0.05,
    paddingTop: windowHeight * 0.02,
  },
  topContainer: {
    paddingTop: 20,
    paddingRight: 30,
    backgroundColor: '#603F83FF',
    borderBottomColor: 'black',
    height: windowHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 1.2,
    top: windowHeight * -0.02,
    right: windowWidth * 0.1,
  },
  heading: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: '#000000', // Change text color to white
  },
  formContainer: {
    flexGrow: 1,
    marginTop: windowHeight * 0.03,
    left: windowWidth * 0.1
  },
  inputContainer: {
    marginBottom: windowHeight * 0.02,
    paddingHorizontal: windowHeight * 0.001,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: windowWidth * 0.046,
    marginBottom: 5,
  },
  input: {
    fontSize: windowWidth * 0.04,
    borderColor: '#FFFFFF',
    borderRadius: windowWidth * 0.04,
    padding: windowWidth * 0.028,
    width: '80%',
    backgroundColor: '#BBB7B7',
    left: windowHeight * -0.002
  },
  button: {
    alignSelf: 'center',
    width: '30%',
    marginTop: windowHeight * 0.02,
    marginRight: windowHeight * 0.09,
    backgroundColor: '#603F83FF',
    borderRadius: windowWidth * 0.03,
    paddingVertical: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.010,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
  },   
});

export default PatientSignup;
