import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Patientdetails = ({ route, navigation }) => {
  const { patient } = route.params;

  const navigateToGlucoseInsulinRecord = () => {
    console.log('Navigating to Patientexcelrecord');
    navigation.navigate('Patientexcelrecord');
  };

  const navigateToPatientTrackingGraph = () => {
    console.log('Navigating to Patientgraphrecord');
    navigation.navigate('Patientgraphrecord');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Patient Details</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.patientInfoContainer}>
          {patient.image_path && (
            <Image source={{ uri: patient.image_path }} style={styles.patientImage} />
          )}
          <Text style={styles.patientName}>Patient Name: {patient.username}</Text>
          <Text style={styles.patientDetail}>Blood Group: {patient.bloodgroup}</Text>
          <Text style={styles.patientDetail}>Age: {patient.age}</Text>
          <Text style={styles.patientDetail}>Gender: {patient.gender}</Text>
          <Text style={styles.patientDetail}>Contact Num: {patient.mob}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.glucoseButton} onPress={navigateToGlucoseInsulinRecord}>
            <View style={styles.iconContainer}>
              <FontAwesome name="file-text" size={windowWidth * 0.1} color="#fff" />
              <Text style={styles.iconLabel}>Patient Record</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trackingButton} onPress={navigateToPatientTrackingGraph}>
            <View style={styles.iconContainer}>
              <FontAwesome name="line-chart" size={windowWidth * 0.1} color="#fff" />
              <Text style={styles.iconLabel}>Tracking Graph</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    width: '100%',
    paddingVertical: windowHeight * 0.045,
    backgroundColor: '#603F83FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: windowWidth * 0.07,
    fontWeight: 'bold',
    color: '#FFFFFF',
    bottom: windowHeight * -0.02,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: windowWidth * 0.05,
    backgroundColor: '#603F83FF',
    borderRadius: 10,
    marginBottom: windowHeight * 0.10,
    width: '85%',
  },
  patientImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    borderRadius: windowWidth * 0.2,
    marginBottom: windowHeight * 0.02,
  },
  patientName: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: windowHeight * 0.01,
  },
  patientDetail: {
    fontSize: windowWidth * 0.05,
    color: '#FFFFFF',
    marginBottom: windowHeight * 0.01,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  glucoseButton: {
    backgroundColor: '#603F83FF',
    padding: windowWidth * 0.05,
    borderRadius: windowWidth * 0.03,
    marginVertical: 10,
  },
  trackingButton: {
    backgroundColor: '#603F83FF',
    padding: windowWidth * 0.05,
    borderRadius: windowWidth * 0.03,
    marginVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    color: '#fff',
    marginTop: windowHeight * 0.01,
    fontSize: windowWidth * 0.04,
  },
});

export default Patientdetails;
