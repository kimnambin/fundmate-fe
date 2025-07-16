import { useMutation } from '@tanstack/react-query';
import type { CreateFundingData } from '../types/createFunding.types';
import {
  createFunding,
  createOption,
  deleteOption,
} from '../api/createFunding';

export const useCreateFunding = () => {
  return useMutation({
    mutationFn: (data: CreateFundingData) => createFunding(data),
  });
};

export const useCreateOption = () => {
  return useMutation({
    mutationFn: createOption,
  });
};

export const useDeleteOption = () => {
  return useMutation({
    mutationFn: deleteOption,
  });
};
