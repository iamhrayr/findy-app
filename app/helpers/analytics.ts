import firebaseAnalytics from '@react-native-firebase/analytics';
import appcenterAnalytics from 'appcenter-analytics';

export const analytics = (name: string, data?: any) => {
  firebaseAnalytics().logEvent(name, data);
  appcenterAnalytics.trackEvent(name, data);
};
