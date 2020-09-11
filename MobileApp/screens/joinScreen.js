import React, {useState} from 'react';

import {Text, View, TextInput, Image, Button} from 'react-native';

import {useDispatch} from 'react-redux';

export default function JoinScreen({navigation}) {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={{resizeMode: 'contain'}}
        source={require('../assets/ic_chat.png')}
      />
      <TextInput
        style={{paddingTop: 30, fontSize: 20}}
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="Enter Username"
      />
      {/* <Button title="Join Chat" onPress={() => joinChat(username)} /> */}
      <Button
        title="Join Chat"
        onPress={() => {
          dispatch({type: 'server/join', data: username});
          navigation.navigate('App');
        }}
      />
    </View>
  );
}
