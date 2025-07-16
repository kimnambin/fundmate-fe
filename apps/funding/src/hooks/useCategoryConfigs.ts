import { useState } from 'react';
import { filters } from '../constants/categories';

export const useCategoryConfigs = () => {
  const [category, setCategory] = useState<number | null>(null);
  const [gender, setGender] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);

  const configs = [
    { filter: filters[0], value: category, onSelect: setCategory },
    { filter: filters[1], value: gender, onSelect: setGender },
    { filter: filters[2], value: age, onSelect: setAge },
  ];

  return { configs, category, setCategory, gender, setGender, age, setAge };
};
