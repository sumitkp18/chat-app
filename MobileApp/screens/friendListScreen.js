import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {useSelector} from 'react-redux';

export default function FriendListScreen({navigation}) {
  const {itemContainerStyle, avatarImageStyle, avatarNameViewStyle} = styles;
  const usersOnline = useSelector((state) => state.usersOnline);
  return (
    <View style={{flex: 1, marginStart: 20}}>
      <Text style={{fontSize: 50, marginVertical: 30, color: '#00A991'}}>
        Friend List
      </Text>
      <FlatList
        data={usersOnline}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {
                  name: item.username,
                  userId: item.id,
                })
              }>
              <View style={itemContainerStyle}>
                <Image style={avatarImageStyle} source={{uri: item.avatar}} />
                <View style={avatarNameViewStyle}>
                  <Text style={{fontSize: 20}}>{item.username}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainerStyle: {flex: 1, flexDirection: 'row', marginVertical: 20},
  avatarImageStyle: {width: 50, height: 50, borderRadius: 50},
  avatarNameViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
