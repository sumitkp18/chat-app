import React from 'react';

import {useDispatch, useSelector} from 'react-redux';

import {GiftedChat} from 'react-native-gifted-chat';

ChatScreen.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam('name'),
});

export default function ChatScreen({navigation}) {
  const dispatch = useDispatch();
  const selfUser = useSelector((state) => state.selfUser);
  const userId = navigation.getParam('userId');
  const conversations = useSelector((state) => state.conversations);
  const messages = conversations[userId].messages;

  return (
    <>
      <GiftedChat
        renderUsernameOnMessage
        messages={messages}
        onSend={(messages) => {
          dispatch({
            type: 'private_message',
            data: {message: messages[0], conversationId: userId},
          });
          dispatch({
            type: 'server/private_message',
            data: {message: messages[0], conversationId: userId},
          });
        }}
        user={{
          _id: selfUser.id,
        }}
      />
    </>
  );
}
