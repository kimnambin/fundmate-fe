import { useMutation } from '@tanstack/react-query';
import { aiSummarize } from '../api/aiSummarize.api';

export const useAiSummarize = () => {
  return useMutation({
    mutationFn: aiSummarize,
  });
};
