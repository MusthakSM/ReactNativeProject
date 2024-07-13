import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
}
    from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import Icons2 from 'react-native-vector-icons/Ionicons'

import { auth } from '../Firebase/Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { setUserEmail } from '../Redux/Reducers/userSlice'

// import colors from constants..
import colors from '../constants/colors'

// import logo
import Logo from './screenComponents/Logo'


const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const dispatch = useDispatch();

    // Password Visibility using useState.
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    // signIn handle..
    const handleSignIn = async () => {
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, pswd);
            // Dispatch email to Redux store
            dispatch(setUserEmail(email));

            navigation.replace('Home');

        } catch (error) {
            
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Error: User not found.');
            } else if (error.code === 'auth/invalid-credential') {
                Alert.alert('Error: Invalid credential.');
            }
            else if (error.code === 'auth/invalid-email') {
                Alert.alert('Error: Invalid email format.');
            } else if (error.code === 'auth/wrong-password') {
                Alert.alert('Error: Incorrect password.');
            } else {
                Alert.alert('Error signing in:', error.message);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                navigation.navigate('Home'); // Redirect to Home if user is logged in
            }
        });

        return () => unsubscribe();
    }, [navigation]);


    // Element References..
    const PasswordRef = useRef(null);
    const SignInButtonRef = useRef(null);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={styles.container}
            >
                <Logo />

                <View style={styles.inputContainer}>

                    <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center' }]}>
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Email"
                            placeholderTextColor={colors.White}
                            autoCapitalize="none"
                            onSubmitEditing={() => PasswordRef.current.focus()}
                            onChangeText={(text) => { setEmail(text) }}
                        />
                    </View>

                    <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center' }]}>
                        <TextInput
                            ref={PasswordRef}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Password"
                            placeholderTextColor={colors.White}
                            autoCapitalize="none"
                            secureTextEntry={!passwordVisibility}
                            onSubmitEditing={() => SignInButtonRef.current.focus()}
                            onChangeText={(e) => { setPswd(e) }}
                        />

                        {/* Eye icons */}
                        <TouchableOpacity
                            onPress={() => setPasswordVisibility(!passwordVisibility)}    // set the inputted password field to be hided..
                            style={{ position: 'absolute', right: 15 }}
                        >
                            {
                                passwordVisibility === false ?
                                    (<Icons2 name='eye' size={18} color={colors.White} />) :
                                    <Icons2 name='eye-off' size={18} color={colors.White} />
                            }

                        </TouchableOpacity>

                    </View>



                </View>

                <TouchableOpacity
                    style={[styles.links, {
                        marginTop: 10,
                        alignSelf: 'flex-end',
                        marginRight: 20,
                    }]}
                >
                    <Text
                        style={styles.Hints}
                    >
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    ref={SignInButtonRef}
                    style={styles.signInButton}
                    onPress={handleSignIn}
                >
                    <Text style={{
                        fontSize: 30,
                        color: colors.Black,
                        fontFamily: 'Outfit-Bold',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}>
                        Sign In
                    </Text>
                </TouchableOpacity>


                <View
                    style={styles.SPHint} // SignUp Hint..
                >
                    <Text style={styles.Hints}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity
                        style={[styles.links, { borderBottomColor: colors.Yellow }]}
                        onPress={() => { navigation.navigate('SignUP') }}
                    >
                        <Text
                            style={[styles.Hints, { color: colors.Yellow }]}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.Slate,
        paddingTop: 30,
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
        color: colors.White,
        flex: 1,
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
    signInButton: {
        marginTop: 40,
        backgroundColor: colors.Yellow,
        height: 58,
        borderRadius: 15,
        marginHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    SPHint: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 15,
    }

})