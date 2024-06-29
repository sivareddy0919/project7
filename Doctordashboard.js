import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Doctordashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;

  const [glucoseEntries, setGlucoseEntries] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch('http://192.168.40.121/Database/Viewall.php');
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, []);

  const handleProfileNavigation = () => {
    navigation.navigate('Doctorprofile');
  };

  const handlesearchIconClick = () => {
    navigation.navigate('DoctorSearch');
  };

  const handlesignOutIconClick = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to Logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => navigation.navigate('Doctorlogin') },
      ],
      { cancelable: false }
    );
  };

  const handleMenuIconClick = () => {
    setIsModalVisible(true);
  };

  const closeMenu = () => {
    setIsModalVisible(false);
  };

  const handleHomeNavigation = () => {
    navigation.navigate('DoctorHome');
    closeMenu();
  };

  const handlePatientListNavigation = () => {
    navigation.navigate('PatientList');
    closeMenu();
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    setCurrentImageIndex(index);
  };

  const handleViewAll = () => {
    navigation.navigate('PatientList');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.menuIconContainer} onPress={handleMenuIconClick}>
          <FontAwesome name="bars" size={30} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.heading}>{username}</Text>
        <TouchableOpacity onPress={handleProfileNavigation}>
          <FontAwesome name="user" size={30} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContainer} 
            onScroll={handleScroll} 
            scrollEventThrottle={16}
          >
            <Image source={require('./assets/scroll1.png')} style={styles.image} />
            <Image source={require('./assets/scroll2.png')} style={styles.image} />
            <Image source={require('./assets/scroll3.png')} style={styles.image} />
          </ScrollView>
        </View>
        {/* Scroll Indicator Container */}
        <View style={styles.scrollIndicatorContainer}>
          <View style={[styles.scrollIndicator, currentImageIndex === 0 && styles.scrollIndicatorActive]} />
          <View style={[styles.scrollIndicator, currentImageIndex === 1 && styles.scrollIndicatorActive]} />
          <View style={[styles.scrollIndicator, currentImageIndex === 2 && styles.scrollIndicatorActive]} />
        </View>
        <View style={styles.grayContainer}>
          {/* Content of the gray container */}
        </View>
        <View style={styles.scrollWrapper}>
          <View style={styles.newContainerHeader}>
            <Text style={styles.newContainerHeaderText}>Patients List</Text>
            <TouchableOpacity onPress={handleViewAll}>
              <View style={styles.viewAllContainer}>
                <Text style={styles.viewAllText}>View All</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.newContainer}>
            {patientData.map(patient => (
              <View key={patient.id} style={styles.patientInnerContainer}>
                <Image source={{ uri: `http://192.168.40.121/Database/${patient.image_path}` }} style={styles.patientImage} />
                <View style={styles.patientInfo}>
                  <Text style={styles.patientText}>Username: {patient.username}</Text>
                  <Text style={styles.patientText}>Gender: {patient.gender}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.additionalGrayContainer}>
          <FontAwesome name="home" size={35} style={styles.homeIcon} onPress={handleHomeNavigation} />
          <FontAwesome name="search" size={32} style={styles.searchIcon} onPress={handlesearchIconClick} />
          <FontAwesome name="sign-out" size={35} style={styles.signOutIcon} onPress={handlesignOutIconClick} />
        </View>
        <ScrollView style={styles.scrollView}>
          {glucoseEntries.map(entry => (
            <Text key={entry.id} style={styles.entryText}>
              {entry.timestamp}: {entry.level}
            </Text>
          ))}
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeMenu}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={handleHomeNavigation} style={styles.menuItem}>
              <FontAwesome name="home" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfileNavigation} style={styles.menuItem}>
              <FontAwesome name="user" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePatientListNavigation} style={styles.menuItem}>
              <FontAwesome name="users" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Patient List</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlesearchIconClick} style={styles.menuItem}>
              <FontAwesome name="search" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlesignOutIconClick} style={styles.menuItem}>
              <FontAwesome name="sign-out" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.05,
    backgroundColor: '#603F83FF',
    height: windowHeight * 0.14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuIconContainer: {
    marginLeft: 10,
  },
  menuIcon: {
    color: '#DFDFDF',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#DFDFDF',
  },
  profileIcon: {
    color: '#DFDFDF',
  },
  container: {
    flex: 1,
  },
  upperContainer: {
    marginTop: windowHeight * -0.09,
    borderRadius: 5,
    width: '100%',
    paddingVertical: windowHeight * 0.080,
    paddingHorizontal: windowWidth * -0.010,
    top: windowHeight * 0.04,
    left: windowWidth * 0.03,
  },
  scrollIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  scrollIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DFDFDF',
    marginHorizontal: 7,
    top: windowHeight * -0.03,
  },
  scrollIndicatorActive: {
    backgroundColor: '#603F83FF',
  },
  grayContainer: {
    backgroundColor: '#603F83FF',
    borderRadius: 10,
    width: '85%',
    paddingVertical: windowHeight * 0.07,
    marginBottom: windowHeight * 0.02,
    left: windowWidth * 0.08,
  },
  scrollWrapper: {
    backgroundColor: '#DFDFDF',
    borderRadius:15,
    width: '90%',
    height: windowHeight * 0.3,
    marginBottom: windowHeight * 0.02,
    marginTop: windowHeight * 0.01,
    alignSelf: 'center',
  },
  newContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: windowHeight * 0.01,
    height:windowHeight * 0.05,
    backgroundColor: '#603F83FF',
    borderRadius:10,
    width: '100%',
    left:windowWidth*-0.001,
  },
  newContainerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    left:windowWidth * 0.3,
    color:'#FFFFFF'
  },
  viewAllContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    right:windowWidth * 0.02,
  },
  viewAllText: {
    fontSize: 14,
    color: '#603F83FF',
    
  },
  patientInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#603F83FF',
    padding: 10,
    borderRadius: 10,
    marginBottom: windowHeight * 0.02,
    width: '90%',
    left:windowWidth *0.05,
  },
  patientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientText: {
    fontSize: 16,
    color: '#FFFFFF',
    left: windowWidth * 0.04,
  },
  additionalGrayContainer: {
    backgroundColor: '#603F83FF',
    borderRadius: 15,
    width: '85%',
    paddingVertical: windowHeight * 0.022,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.1,
    marginTop: windowHeight * 0.005,
    left: windowWidth * 0.08,
  },
  homeIcon: {
    color: '#DFDFDF',
  },
  searchIcon: {
    color: '#DFDFDF',
  },
  signOutIcon: {
    color: '#DFDFDF',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  image: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  scrollView: {
    width: '50%',
    flex: 1,
  },
  entryText: {
    fontSize: 30,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#000000',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 18,
  },
});

export default Doctordashboard;
