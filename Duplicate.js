import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Page1 = () => (
  <View style={[styles.pageContainer, { backgroundColor: '#BBB7B7' }]}>
    <Image source={require('./assets/scroll1.png')} style={styles.image} />
    <Text>Page 1 Content</Text>
  </View>
);

const Page2 = () => (
  <View style={[styles.pageContainer, { backgroundColor: '#DDD' }]}>
    <Image source={require('./assets/scroll2.png')} style={styles.image} />
    <Text>Page 2 Content</Text>
  </View>
);

const Page3 = () => (
  <View style={[styles.pageContainer, { backgroundColor: '#AAA' }]}>
    <Image source={require('./assets/scroll3.png')} style={styles.image} />
    <Text>Page 3 Content</Text>
  </View>
);

const PatientDashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;
  const [glucoseEntries, setGlucoseEntries] = useState([]);
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [SelectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track current page index
  const scrollViewRef = React.useRef();
  const [currentScrollPos, setCurrentScrollPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollViewRef.current?.scrollTo({ x: currentScrollPos + 1, animated: true });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentScrollPos]);

  const handleViewGlucoseEntry = () => {
    navigation.navigate('GlucoseEntry', { username });
  };
  

  const handleViewTodayButton = () => {
    navigation.navigate('Todayrecord');
  };

  const handleViewYesterdayButton = () => {
    navigation.navigate('Yesterdayrecord');
  };

  const handleGlucoseTracker = () => {
    navigation.navigate('GlucoseTracker');
  };

  const handlesignOutIconClick = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
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

  const handleBellIconClick = () => {
    navigation.navigate('PatientNotification');
  };

  const handleDateButton = () => {
    setIsDatePickerVisible(true);
  };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setIsDatePickerVisible(false);
    navigation.navigate('DateScreen', { selectedDate: formattedDate });
  };

  const handleDateCancel = () => {
    setIsDatePickerVisible(false);
  };

  const handleMenuIconClick = () => {
    setIsModalVisible(true);
  };

  const closeMenu = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleMenuIconClick}>
          <FontAwesome name="bars" size={35} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.heading}>{username}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            onScroll={(event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(contentOffsetX / Dimensions.get('window').width);
              setCurrentImageIndex(index);
              setCurrentScrollPos(contentOffsetX);
            }}>
            <Page1 />
            <Page2 />
            <Page3 />
          </ScrollView>
        </View>
        {/* Scroll Indicator Container */}
        <View style={styles.scrollIndicatorContainer}>
          <View style={[styles.scrollIndicator, currentImageIndex === 0 && styles.scrollIndicatorActive]} />
          <View style={[styles.scrollIndicator, currentImageIndex === 1 && styles.scrollIndicatorActive]} />
          <View style={[styles.scrollIndicator, currentImageIndex === 2 && styles.scrollIndicatorActive]} />
        </View>
        <View style={styles.grayContainer}>
          <View style={styles.circleButtonContainer}>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: '#603F83FF', width: 80, height: 80, borderRadius: 10 }]} onPress={handleViewTodayButton}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }, { fontSize: 15 }]}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: '#603F83FF', width: 80, height: 80, borderRadius: 10 }]} onPress={handleViewYesterdayButton}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }, { fontSize: 15 }]}>Yesterday</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: '#603F83FF', width: 80, height: 80, borderRadius: 10 }]} onPress={handleDateButton}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }, { fontSize: 15 }]}>Date</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.additionalGrayContainer}>
          <FontAwesome name="home" size={35} style={styles.homeIcon} />
          <FontAwesome name="bell" size={30} style={styles.bellIcon} onPress={handleBellIconClick} />
          <FontAwesome name="sign-out" size={35} style={styles.signOutIcon} onPress={handlesignOutIconClick} />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleViewGlucoseEntry} style={styles.iconButton}>
            <View style={styles.iconButton}>
              <FontAwesome name="edit" size={65} style={styles.icon} />
            </View>
            <Text style={styles.iconText}> Glucose Entry</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGlucoseTracker} style={styles.iconButton}>
            <View style={styles.iconButton}>
              <FontAwesome name="line-chart" size={65} style={styles.icon} />
            </View>
            <Text style={styles.iconText}> Glucose Tracker</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {glucoseEntries.map(entry => (
            <Text key={entry.id} style={styles.entryText}>
              {entry.timestamp}: {entry.level} mg/dL
            </Text>
          ))}
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeMenu}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigation.navigate('Patientprofile', { username })} style={styles.menuItem}>
              <FontAwesome name="user" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleViewGlucoseEntry} style={styles.menuItem}>
              <FontAwesome name="edit" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Glucose Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBellIconClick} style={styles.menuItem}>
              <FontAwesome name="bell" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleViewTodayButton} style={styles.menuItem}>
              <FontAwesome name="calendar" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Today's Record</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleViewYesterdayButton} style={styles.menuItem}>
              <FontAwesome name="calendar" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Yesterday's Record</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGlucoseTracker} style={styles.menuItem}>
              <FontAwesome name="line-chart" size={24} style={styles.menuIcon} />
              <Text style={styles.menuText}>Glucose Tracker</Text>
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
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperContainer: {
    marginBottom: windowHeight * 0.10,
    borderRadius: 0,
    width: '90%',
    height: windowHeight * 0.2,
    top: windowHeight * 0.04,
  },
  scrollView: {
    flex: 1,
    marginBottom: windowHeight * 0.02,
  },
  entryText: {
    fontSize: windowHeight * 0.030,
    marginBottom: windowHeight * 0.01,
  },
  additionalGrayContainer: {
    backgroundColor: '#603F83FF',
    borderRadius: 10,
    width: '60%',
    paddingVertical: windowHeight * -0.01,
    paddingHorizontal: windowWidth * 0.40,
    marginBottom: windowHeight * 0.025,
    top: windowHeight * 0.27,
    height: windowHeight * 0.09,
  },
  grayContainer: {
    backgroundColor: '#DFDFDF',
    width: '88%',
    borderRadius: 10,
    paddingVertical: windowHeight * -0.1,
    height: windowHeight * 0.17,
    marginBottom: windowHeight * 0.02,
  },
  circleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: windowHeight * 0.033,
  },
  circleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  homeIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    color: '#DFDFDF',
    right: windowWidth * 0.3,
    top: windowHeight * 0.025,
  },
  bellIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    color: '#DFDFDF',
    top: windowHeight * -0.022,
    right: windowWidth * 0.015,
  },
  signOutIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    color: '#DFDFDF',
    left: windowWidth * 0.25,
    top: windowHeight * -0.077,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    left: windowWidth * -0.5,
    color: '#DFDFDF',
  },
  menuIcon: {
    color: '#DFDFDF',
    marginRight: windowWidth * 0.04,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: '80%',
    backgroundColor: '#FFF',
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
    color: '#333',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: windowHeight * -0.07,
    left: '5%',
  },
  iconButton: {
    alignItems: 'center',
  },
  icon: {
    color: '#603F83FF',
    marginBottom: windowHeight * -0.01,
    right:'25%',
  },
  iconText: {
    color: '#603F83FF',
    fontSize: windowHeight * 0.025,
    fontWeight: 'bold',
    top: '20%',
    left: '-25%',
  },
  // Scroll Indicator Styles
  scrollIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  scrollIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#AAA',
    marginHorizontal: 5,
    marginBottom: '10%',
  },
  scrollIndicatorActive: {
    backgroundColor: '#603F83FF',
  },
  pageContainer: {
    width: Dimensions.get('window').width,
    height: '120%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '120%',
    height: '90%', // Adjust height as per your design
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default PatientDashboard;
