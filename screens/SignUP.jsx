import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'

import React, { useRef, useState } from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import Icons2 from 'react-native-vector-icons/Ionicons'

import { auth } from '../Firebase/Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import firestore from '@react-native-firebase/firestore'

// import colors from constants..
import colors from '../constants/colors'
// import logo
import Logo from './screenComponents/Logo'

const SignUP = ({ navigation }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // track the state of the passowrd,..
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  // password validation..
  const [validation, setValidation] = useState({
    hasLowerCase: false,
    hasUpperCase: false,
    hasMinLength: false,
    hasNumber: false,
  });

  const [passwordMatch, setPasswordMatch] = useState(null);

  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasMinLength = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);

    setValidation({
      hasLowerCase,
      hasUpperCase,
      hasMinLength,
      hasNumber,
    });
  };

  // handling password changes..
  const handlePasswordChange = (text) => {
    setPassword(text);
    validatePassword(text);
    setPasswordMatch(confPass === text);
  };

  // Validate Confirm Password
  const validateConfPassword = (confirmation) => {
    setPasswordMatch(password === confirmation);

  }

  // handling confirm password changes..
  const handleConfirmPasswordChange = (text) => {
    setConfPass(text);
    validateConfPassword(text);
  }

  // Password Visibility..
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [CpasswordVisbility, setCPasswordVisibility] = useState(false);


  // signUp handle..
  const handleSignUp = async () => {
    if (!validation.hasLowerCase
      || !validation.hasUpperCase
      || !validation.hasMinLength
      || !validation.hasNumber
      || !passwordMatch
    ) {
      Alert.alert("Check Passwords..");
    } else {
      // creating user in the firebase..
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Save user details in Firestore
        await firestore()
          .collection('users') // Create a collection named 'users'
          .doc(userCredential.user.uid) // Use the user's UID as the document ID
          .set({
            name,
            email,
            createdAt: new Date(),
          });

        Alert.alert("SignUp success!..");
        navigation.navigate('Login');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error: Email already in use.');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error: Invalid email format.');
        } else if (error.code === 'auth/weak-password') {
          Alert.alert('Error: Password is too weak.');
        } else {
          Alert.alert('Error signing up:', error.message);
        }
      }
    }
  }

  // Element References..
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const SignUpButtonRef = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Logo />

          <View style={styles.inputContainer}>
            <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Name"
                placeholderTextColor={colors.White}
                autoCapitalize="none"
                onSubmitEditing={() => emailRef.current.focus()}
                onChangeText={(e) => { setName(e) }}
              />
            </View>
            <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                ref={emailRef}
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor={colors.White}
                autoCapitalize="none"
                onSubmitEditing={() => passwordRef.current.focus()}
                onChangeText={(e) => { setEmail(e) }}
              />
            </View>

            <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                ref={passwordRef}
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor={colors.White}
                autoCapitalize="none"
                secureTextEntry={!passwordVisibility}
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
                onChangeText={handlePasswordChange}
              />

              {/* Eye icons */}
              <TouchableOpacity
                onPress={() => setPasswordVisibility(!passwordVisibility)}    // set the inputted password field to be hided..
                style={{ position: 'absolute', right: 15 }}
              >
                {
                  passwordVisibility === false ?
                    (<Icons2 name='eye' size={18} color={colors.White} />) :
                    (<Icons2 name='eye-off' size={18} color={colors.White} />)
                }

              </TouchableOpacity>
            </View>

            <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center', borderColor: passwordMatch == false ? 'red' : 'transparent', borderWidth: passwordMatch === false ? 1 : 0 }]}>
              <TextInput
                ref={confirmPasswordRef}
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Confirm Password"
                placeholderTextColor={colors.White}
                autoCapitalize="none"
                secureTextEntry={!CpasswordVisbility}
                onSubmitEditing={() => SignUpButtonRef.current.focus()}
                onChangeText={handleConfirmPasswordChange}
              />

              {/* Eye icons */}
              <TouchableOpacity
                onPress={() => setCPasswordVisibility(!CpasswordVisbility)}    // set the inputted password field to be hided..
                style={{ position: 'absolute', right: 15 }}
              >
                {
                  CpasswordVisbility === false ?
                    (<Icons2 name='eye' size={18} color={colors.White} />) :
                    (<Icons2 name='eye-off' size={18} color={colors.White} />)
                }
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Validation */}
          <View style={styles.passwordValidation}>
            <View style={styles.validationRow}>

              <View style={styles.validPrompt}>
                {
                  validation.hasLowerCase === false ?
                    (<Icons name="refresh" size={14} color={colors.White} />) :
                    (<Icons2 name="checkmark-circle" size={14} color={colors.Green} />)
                }
                <Text style={styles.promptText}>One lowercase Character</Text>
              </View>

              <View style={styles.validPrompt}>
                {
                  validation.hasUpperCase === false ?
                    (<Icons name="refresh" size={14} color={colors.White} />) :
                    (<Icons2 name="checkmark-circle" size={14} color={colors.Green} />)
                }
                <Text style={styles.promptText}>One uppercase Character</Text>
              </View>

            </View>

            <View style={styles.validationRow}>

              <View style={styles.validPrompt}>
                {
                  validation.hasMinLength === false ?
                    (<Icons name="refresh" size={14} color={colors.White} />) :
                    (<Icons2 name="checkmark-circle" size={14} color={colors.Green} />)
                }
                <Text style={styles.promptText}>8 characters minimum</Text>
              </View>

              <View style={styles.validPrompt}>
                {
                  validation.hasNumber === false ?
                    (<Icons name="refresh" size={14} color={colors.White} />) :
                    (<Icons2 name="checkmark-circle" size={14} color={colors.Green} />)
                }
                <Text style={styles.promptText}>one numberr</Text>
              </View>

            </View>
            <View style={styles.validationRow}>

            </View>
          </View>


          <TouchableOpacity
            ref={SignUpButtonRef}
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={{
              fontSize: 30,
              color: colors.Black,
              fontFamily: 'Outfit-Bold',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <View
            style={styles.SIHint} // SignIn Hint..
          >
            <Text style={styles.Hints}>
              Already have an account?
            </Text>
            <TouchableOpacity
              style={[styles.links, { borderBottomColor: colors.Yellow }]}
              onPress={() => { navigation.navigate('Login') }}
            >
              <Text
                style={[styles.Hints, { color: colors.Yellow }]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default SignUP

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Slate,
    paddingBottom: 10,
  },
  inputContainer: {
    marginHorizontal: 8,
    marginTop: 20,
  },
  inputBox: {
    backgroundColor: colors.LightSlate,
    borderRadius: 10,
    height: 58,
    paddingLeft: 15,
    marginTop: 18,
    // Shadow properties for iOS
    shadowColor: colors.White,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow property for Android
    elevation: 2,
  },
  input: {
    flex: 1,
    color: colors.White,
  },
  links: {
    borderBottomWidth: 1,
    borderBottomColor: colors.White,
  },
  Hints: {
    color: colors.White,
    marginHorizontal: 5,
    fontSize: 14,
  },
  signUpButton: {
    marginTop: 40,
    backgroundColor: colors.Yellow,
    height: 58,
    borderRadius: 15,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  SIHint: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 15,
  },
  passwordValidation: {
    marginHorizontal: 10,
    marginTop: 12,
  },
  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  validPrompt: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  promptText: {
    color: colors.White,
    marginLeft: 5,
  }


})