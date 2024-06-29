import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, Image } from 'react-native';

const UserProfile = ({ route }) => {
  const { username } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://192.168.40.121/Database/Patientprofile.php?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add other headers if needed like Authorization
        },
        // You may need to include credentials: 'same-origin' or 'include' based on CORS settings
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setUserData(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No user data found for {username}.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Profile:</Text>
      <Text>Name: {userData.patientName}</Text>
      <Text>Contact Number: {userData.contactNumber}</Text>
      <Text>Email: {userData.email}</Text>
      <Text>Gender: {userData.gender}</Text>
      <Text>Age: {userData.age}</Text>
      <Text>Blood Group: {userData.bloodGroup}</Text>
      {/* Display user image if available */}
      {userData.imagePath && (
        <Image
          source={{ uri: userData.imagePath }}
          style={{ width: 100, height: 100, resizeMode: 'cover', marginTop: 10 }}
        />
      )}
    </View>
  );
};

export default UserProfile;
