import { useMutation } from '@tanstack/react-query';
import { createFunding } from '../api/createFunding.api';
import type { CreateFundingData } from '../types/createFunding.types';

export const useCreateFunding = () => {
  return useMutation({
    mutationFn: (data: CreateFundingData) => createFunding(data),
  });
};
