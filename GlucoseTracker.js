import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width, height } = Dimensions.get('window');

const SugarTrackingScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleFromDateChange = (event, selectedDate) => {
    setShowFromDatePicker(false);
    setFromDate(selectedDate || fromDate);
  };

  const handleToDateChange = (event, selectedDate) => {
    setShowToDatePicker(false);
    setToDate(selectedDate || toDate);
  };

  const showFromDatepicker = () => {
    setShowFromDatePicker(true);
  };

  const showToDatepicker = () => {
    setShowToDatePicker(true);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
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
        <Text style={styles.heading}>Patient Record</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>From</Text>
        <TouchableOpacity onPress={showFromDatepicker}>
          <Text style={styles.dateInput}>{fromDate.toDateString()}</Text>
        </TouchableOpacity>
        {showFromDatePicker && (
          <DateTimePicker
            testID="fromDateTimePicker"
            value={fromDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleFromDateChange}
          />
        )}

        <Text style={styles.label}>To</Text>
        <TouchableOpacity onPress={showToDatepicker}>
          <Text style={styles.dateInput}>{toDate.toDateString()}</Text>
        </TouchableOpacity>
        {showToDatePicker && (
          <DateTimePicker
            testID="toDateTimePicker"
            value={toDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleToDateChange}
          />
        )}

        {/* Icons Container */}
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.circlePdf} onPress={() => console.log("Export to PDF")}>
            <FontAwesome name="file-pdf-o" size={30} style={styles.icon} />
            <Text style={styles.iconText}>Export to PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleGraph} onPress={() => console.log("View In Graph")}>
            <FontAwesome name="line-chart" size={30} style={styles.icon} />
            <Text style={styles.iconText}>View In Graph</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Gray Container */}
        <View style={styles.additionalGrayContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome name="home" size={35} style={styles.homeIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome name="bell" size={30} style={styles.bellIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={35} style={styles.signOutIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: windowHeight * 0.05, // 5% of the screen height
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
    fontSize: 22, // Adjust the font size as needed
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  formContainer: {
    flexGrow: 1, // Occupy remaining space
    marginTop: 20, // Adjust spacing between top container and form
  },
  dateInput: {
    fontSize: 18,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginBottom: windowHeight * 0.02,
    width: '80%',
    backgroundColor: '#F9F9F9',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    left: 35
  },
  label: {
    fontSize: 22,
    marginLeft: 45,
    marginBottom: 10,
    color: '#000000'
  },
  iconsContainer: {
    flexDirection: 'row', // Align icons side by side
    alignItems: 'center',
    marginTop: 50,
    marginLeft:'15%'
  },
  icon: {
    color: '#603F83FF',
    textAlign: 'center', // Center align the icons horizontally
  },
  iconText: {
    color: '#603F83FF',
    fontSize: 14, // Adjust font size as needed
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center'
  },
  additionalGrayContainer: {
    backgroundColor: '#603F83FF',
    borderRadius: 20,
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: windowHeight * 0.025,
    top: windowHeight * 0.12,
    height: windowHeight * 0.09,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center'
  },
  iconContainer: {
    alignItems: 'center',
  },
  homeIcon: {
    color: '#DFDFDF',
  },
  bellIcon: {
    color: '#DFDFDF',
  },
  signOutIcon: {
    color: '#DFDFDF',
  },
  iconLabel: {
    color: '#DFDFDF',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center'
  },
  // Styles for circles around icons
  circlePdf: {
    width: 110,
    height: 110,
    borderRadius: 15,
    top:'-20%',
    backgroundColor: '#DFDFDF',
    justifyContent: 'center',
    alignItems: 'center',
    right:'0%',
    height:'50%'
  },
  circleGraph: {
    width: 110,
    height: 110,
    borderRadius: 15,
    top:'-20%',
    backgroundColor: '#DFDFDF',
    justifyContent: 'center',
    alignItems: 'center',
    left:'20%',
    height:'50%'
  },
});

export default SugarTrackingScreen;
