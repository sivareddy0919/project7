import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const DateScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedDate } = route.params;

  const handleProfileNavigation = () => {
    navigation.navigate('Patientprofile');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
      </View>
      <View style={styles.container}>
        <Text style={styles.dateText}>{selectedDate}</Text>
        {/* Additional logic to display data for the selected date */}
      </View>
      <View style={styles.container1}>
        <View style={styles.innerContainer1A}>
          <Text style={styles.boxText}>Breakfast :</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.innerContainer2A}>
          <Text style={styles.boxText}>Lunch :</Text>
        </View>
      </View>
      <View style={styles.container3}>
        <View style={styles.innerContainer3A}>
          <Text style={styles.boxText}>Dinner :</Text>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topContainer: {
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.05,
    backgroundColor: '#603F83FF',
    borderBottomWidth: 0,
    borderBottomColor: '#FFFFFF',
    height: windowHeight * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  container1: {
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.1,
    height: windowHeight * 0.24,
    marginTop: windowHeight * 0.04,
    borderRadius: windowHeight * 0.03,
    width: windowWidth * 0.9,
    marginBottom: windowHeight * 0.03,
    left:windowWidth*0.07,
    width:'85%'
  },
  container2: {
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.24,
    marginTop: windowHeight * 0.02,
    borderRadius: windowHeight * 0.03,
    width: windowWidth * 0.9,
    marginBottom: windowHeight * 0.03,
    left:windowWidth*0.07,
    width:'85%'
  },
  container3: {
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowHeight * 0.02,
    height: windowHeight * 0.24,
    borderRadius: windowHeight * 0.03,
    width: windowWidth * 0.9,
    left:windowWidth*0.07,
    width:'85%'
  },
  innerContainer1A: {
    backgroundColor: '#603F83FF',
    padding: windowWidth * 0.03,
    margin: windowWidth * 0.01,
    borderRadius: windowWidth * 0.02,
    width: '120%',
    alignItems: 'center',
    marginBottom:windowHeight*0.15,
  },
  innerContainer2A: {
    backgroundColor: '#603F83FF',
    padding: windowWidth * 0.03,
    margin: windowWidth * 0.01,
    borderRadius: windowWidth * 0.03,
    width: '93%',
    alignItems: 'center',
    marginBottom:windowHeight*0.15,
  },
  innerContainer3A: {
    backgroundColor: '#603F83FF',
    padding: windowWidth * 0.03,
    margin: windowWidth * 0.01,
    borderRadius: windowWidth * 0.03,
    width: '93%',
    alignItems: 'center',
    marginBottom:windowHeight*0.15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  dateText: {
    fontSize: 18,
    marginTop: 20,
  },
  profileIcon: {
    color: '#FFF',
    marginLeft: 'auto',
  },
  boxText: {
    fontSize: windowWidth * 0.04,
    color: '#FFFFFF',
  },
});

export default DateScreen;
