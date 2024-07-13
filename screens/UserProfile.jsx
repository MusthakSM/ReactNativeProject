import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'

// import colors from constant..
import colors from '../constants/colors'

import Icons from 'react-native-vector-icons/FontAwesome6'

import firestore from '@react-native-firebase/firestore';
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase/Firebase';

import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserProfile = ({ navigation }) => {

  const email = useSelector((state) => state.user.email);
  const [name, setName] = useState('');
  const [mail, setMail] = useState(email);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const fetchEmailFromAsyncStorage = async () => {
      let userEmail = email;

      if (!email) {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          userEmail = storedEmail;
        }
      }

      if (userEmail) {
        // Fetch name from Firestore using email
        const userQuery = await firestore()
          .collection('users')
          .where('email', '==', userEmail)
          .get();

        if (!userQuery.empty) {
          setName(userQuery.docs[0].data().name);
          setMail(userQuery.docs[0].data().email);
        } else {
          console.log('No user found with this email!');
        }
      }
    };

    fetchEmailFromAsyncStorage();
  }, [email]);


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/user.png')} style={styles.characterImage} />
        
        <View style={styles.OneSet}>
          <Text style={[styles.profileDetails, {fontSize: 20}]}>Name: </Text>
          <Text style={[styles.profileDetails, {color:'#B0B0B0'}]}>{name}</Text>
        </View>
        <View style={styles.OneSet}>
          <Text style={[styles.profileDetails, {fontSize: 20}]}>Email:</Text>
          <Text style={[styles.profileDetails, {color:'#B0B0B0'}]}>{mail}</Text>
        </View>

      </View>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Slate,
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: colors.LightSlate,
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    // Shadow properties for iOS
    shadowColor: colors.White,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow property for Android
    elevation: 4,
    width: '100%'
  },
  characterImage: {
    width: 160,
    height: 160,
    borderRadius: 90,
    marginBottom: 20,
  },
  profileDetails: {
    fontSize: 18,
    color: colors.White,
    fontFamily: 'Outfit-Regular',
    marginBottom: 7,
  },
  OneSet:{
    width: '100%',
    marginBottom: 10,
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: colors.Red,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: colors.Red,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow property for Android
    elevation: 2,

    position: 'absolute',
    bottom: 30,
  },
  signOutText: {
    fontSize: 28,
    color: colors.White,
    fontFamily: 'Outfit-Bold',
    marginBottom: 7,
  }

})