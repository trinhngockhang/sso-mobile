import React, { Component } from "react";

import styles from "../style/Login";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import axiosFunction from '../Util/axios.js';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '',checkPassDisplay: 'none'};
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Single Sign One</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" 
              style={styles.loginFormTextInput} onChangeText={(text) => this.setState({username: text})}/>
            <TextInput placeholder="Password" placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput} secureTextEntry={true} 
              onChangeText={(text) => this.setState({password: text})}/>
            <Text style={[{textAlign:'center'},{display:this.state.checkPassDisplay}]}>Username or password is wrong</Text>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  async onLoginPress() {
    console.log("Aaaaaa", this.state.username);
    const axios = await axiosFunction();
    const data = await axios.post('/auth/basic', 
    {
      username : this.state.username,
      password: this.state.password,
    }).then( (response) => {
      if(response.status === 200 || response.status === 201){
        console.log('dung roi', response);
        return response.data;
      }else{
          console.log(response);
        return null;
      }
    }).catch(function (error) {
        console.log(error);
        return null;
    });
    if(data){
      console.log(data);
      AsyncStorage.setItem('token',data.accessToken);
      Actions.jump('qrcode');
    }else{
       console.log('sai r')
      this.setState({checkPassDisplay: 'flex'})  
    }
  }
}