import { useEffect, useState } from 'react';
import { InteractionManager } from 'react-native';

const useInteractionsComplete = () => {
  const [interactionCompleted, setInteractionCompleted] = useState(false);

  useEffect(() => {
    const subscription = InteractionManager.runAfterInteractions(() => {
      setInteractionCompleted(true);
    });

    return () => subscription.cancel();
  }, []);

  return interactionCompleted;
};

export default useInteractionsComplete;
