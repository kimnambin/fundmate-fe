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

  const findLabel = (filterIndex: number, id: number | null) => {
    const option = filters[filterIndex].options.find((opt) => opt.id === id);
    return option?.label ?? '';
  };

  return {
    configs,
    category,
    setCategory,
    gender,
    setGender,
    age,
    setAge,
    categoryLabel: findLabel(0, category),
    genderLabel: findLabel(1, gender),
    ageLabel: findLabel(2, age),
  };
};
