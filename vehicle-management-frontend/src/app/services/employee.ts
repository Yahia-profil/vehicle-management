export interface Employee {
  id?: number;
  name: string;
  role: 'CHEF_EQUIPE' | 'CHEF_ESCALE' | 'POINTEUR';
  shift: 'SHIFT_1' | 'SHIFT_2' | 'SHIFT_3';
}