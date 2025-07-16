import { useMutation } from '@tanstack/react-query';
import { aiSummarize, createFunding } from '../api/createFunding';
import type { CreateFundingData } from '../types/createFunding.types';

export const useCreateFunding = () => {
  return useMutation({
    mutationFn: (data: CreateFundingData) => createFunding(data),
  });
};

export const useAiSummarize = () => {
  return useMutation({
    mutationFn: aiSummarize,
  });
};
