import messaging from '@react-native-firebase/messaging';

class FirebaseService {
  getRemoteMessageToken = async () => {
    const granted = await messaging().requestPermission();

    if (!granted) {
      console.log('User declined messaging permissions :(');
      return null;
    } else {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      return fcmToken;
    }
  };
}

export default new FirebaseService();
