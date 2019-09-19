
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axiosModel from '../Util/axios';
class QRScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {loadQr:'flex', loading:true};
    this.onSuccess = this.onSuccess.bind(this);
    this.allowLogin = this.allowLogin.bind(this);
  }
  async onSuccess(e){
    const data = JSON.parse(e.data);
    const sessionId = data.sessionId;
    console.log('sessionId', sessionId);
    const axios = await axiosModel();
    await axios.get(`/authorization/read?sessionId=${sessionId}`)
    .then((res)=>{
      console.log(res);
      let appRequire = `${res.data.appName} muốn biết `;
      res.data.permissions.forEach((doc) => appRequire += ` ${doc.description} `);
      appRequire += 'của bạn';
      console.log(appRequire);
      this.setState({appRequire});
    }).catch((e) => console.log('err', e));
    this.setState({loadQr:'none', loading: false, sessionId: sessionId});
  }
  async allowLogin(){
    const axios = await axiosModel();
    console.log("cho no dang nhap");
    axios.post('/authorization/confirmation', {sessionId: this.state.sessionId})
    .then((response) => {
      console.log('da cho dang nhap')
    })
  }
  render() {
    return (
      <View style={styles.parentView}>
        {this.state.loading?
        <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
            Go to <Text style={styles.textBold}>SSO web</Text> on your computer and scan the QR code.
          </Text>
        }
      />
    :
    <Text style={styles.centerText}>{this.state.appRequire}</Text>
    }
        
        <TouchableOpacity style={[{padding:16},{display:this.state.readQr}]} 
            onPress = {this.allowLogin}>
            <Text style={styles.buttonText}>OK!Allow</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  parentView: {
    flex:1,
    flexDirection: "column",
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    textAlign: 'center',
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
export default QRScreen;