import { useMutation } from '@tanstack/react-query';
import { aiRequest } from '../api/aiRequest.api';

export const useAiRequest = () => {
  return useMutation({ mutationFn: aiRequest });
};
