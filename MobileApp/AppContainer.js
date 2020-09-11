import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ChatScreen from './screens/chatScreen';
import JoinScreen from './screens/joinScreen';
import FriendListScreen from './screens/friendListScreen';

const AppStack = createStackNavigator({
  Home: FriendListScreen,
  Chat: ChatScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Join: JoinScreen,
    },
    {initialRouteName: 'Join'},
  ),
);
