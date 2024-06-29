import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SugarTrackingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;  // Retrieve username from route params

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [sugarConcentration, setSugarConcentration] = useState('');
  const [note, setNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [unit, setUnit] = useState('mmol/L');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleSugarConcentrationChange = (text) => {
    setSugarConcentration(text);
  };

  const handleNoteChange = (text) => {
    setNote(text);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      date: date.toISOString().split('T')[0],
      time: time.toTimeString().split(' ')[0],
      sugarConcentration: parseFloat(sugarConcentration),
      note: note,
      unit: unit,
      username: username  // Include username in the data to be submitted
    };

    try {
      const response = await fetch('http://192.168.40.121/Database/GlucoseEntry.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', result.message);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to submit data');
    }

    setDate(new Date());
    setTime(new Date());
    setSugarConcentration('');
    setNote('');
    setUnit('mmol/L');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => navigation.navigate('Patientlogin')
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Sugar Level Entry</Text>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.iconWithLabel}>
          <Text style={styles.iconLabel}>Before Breakfast</Text>
          <FontAwesome name="coffee" size={45} style={styles.icon} />
          <Text style={styles.iconLabel}>7AM - 10AM</Text>
        </View>
        <View style={styles.iconWithLabel}>
          <Text style={styles.iconLabel}>Before Lunch</Text>
          <FontAwesome name="cutlery" size={44.5} style={styles.icon} />
          <Text style={styles.iconLabel}>12PM - 3PM </Text>
        </View>
        <View style={styles.iconWithLabel}>
          <Text style={styles.iconLabel}>Before Dinner</Text>
          <FontAwesome name="moon-o" size={45} style={styles.icon} />
          <Text style={styles.iconLabel}>7PM - 10PM</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.dateInput}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableOpacity onPress={showTimepicker}>
          <Text style={styles.dateInput}>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Sugar Concentration"
            value={sugarConcentration}
            onChangeText={handleSugarConcentrationChange}
            placeholderTextColor="#000000"
            keyboardType="numeric"
          />
          <View style={styles.radioContainer}>
            <RadioButton.Group onValueChange={newValue => setUnit(newValue)} value={unit}>
              <View style={styles.radioOption}>
                <Text style={styles.radioLabel}>mmol/L</Text>
                <RadioButton value="mmol/L" />
              </View>
              <View style={styles.radioOption}>
                <Text style={styles.radioLabel}>mg/dL</Text>
                <RadioButton value="mg/dL" />
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Note"
          multiline={true}
          numberOfLines={4}
          value={note}
          onChangeText={handleNoteChange}
          placeholderTextColor="#000000"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.additionalGrayContainer} onPress={handleLogout}>
          <FontAwesome name="home" size={35} style={styles.homeIcon} />
          <FontAwesome name="bell" size={30} style={styles.bellIcon} />
          <FontAwesome name="sign-out" size={35} style={styles.signOutIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.01,
    paddingTop: windowHeight * 0.05,
  },
  topContainer: {
    paddingTop: windowHeight * 0.03,
    backgroundColor: '#603F83FF',
    borderBottomWidth: 0,
    borderBottomColor: 'black',
    height: windowHeight * 0.13,
    width: '150%',
    left: windowHeight * -0.1,
    justifyContent: 'center',
    alignItems: 'center',
    top: windowHeight * -0.051,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#FFFFFF"
  },
  formContainer: {
    flexGrow: 1,
    marginTop: 0,
  },
  dateInput: {
    fontSize: 18,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: windowHeight * 0.09,
    marginBottom: windowHeight * -0.06,
    width: '80%',
    backgroundColor: '#F9F9F9',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    left: 37,
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: '#DFDFDF',
    justifyContent: 'space-around',
    width: '104%',
    borderRadius: 0,
    marginVertical: windowHeight * -0.051,
    paddingVertical: 10,
    left: windowHeight * -0.01,
  },
  iconWithLabel: {
    alignItems: 'center',
    color: '#603F83FF',
  },
  icon: {
    marginBottom: 5,
    color:'#603F83FF',
  },
  iconLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: windowHeight * 0.09,
    width:'70%'
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: windowHeight * 0.02,
    width: '80%',
    backgroundColor: '#F9F9F9',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    left: 37,
  },
  radioContainer: {
    marginLeft: 50,
    marginTop: windowHeight*-0.02,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    color: '#000000',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: windowHeight * 0.05,
    width: '80%',
    height: windowHeight * 0.15,
    backgroundColor: '#F9F9F9',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    textAlignVertical: 'top',
    left: 37,
  },
  button: {
    backgroundColor: '#603F83FF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: windowHeight * -0.02,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    left: 37,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  additionalGrayContainer: {
    flexDirection: 'row',
    backgroundColor: '#603F83FF',
    justifyContent: 'space-around',
    width: '90%',
    borderRadius: 25,
    paddingVertical: 20,
    left: windowHeight * 0.025,
    height: windowHeight * 0.10,
   marginTop:windowHeight*0.03
  },
  homeIcon: {
    color:'#DFDFDF'
  },
  bellIcon: {
    color: '#DFDFDF'
  },
  signOutIcon: {
    color: '#DFDFDF'
  }
});

export default SugarTrackingScreen;
