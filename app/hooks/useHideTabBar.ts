import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const useHideTabBar = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();

    parent?.setOptions({ tabBarVisible: false });

    return () => {
      parent?.setOptions({ tabBarVisible: true });
    };
  }, [navigation]);
};

export default useHideTabBar;
