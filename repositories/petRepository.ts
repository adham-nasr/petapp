import { Pet } from '../types';
import axios from 'axios';
import {supabase} from '../utils/supabase';



export const petRepository = {
  async getPets(): Promise<Pet[]|null> {

    const response = await supabase.from("pets").select()
    return response.data;
  },

  async getPetById(id: string): Promise<Pet[] | null> {
    // Simulate API call delay
    const response = await supabase.from("pets").select().eq('id',id)
    return response.data;
  },

  async createPet(pet: Omit<Pet,'id'|'created_at'>): Promise<Pet> {
    // Simulate API call delay
    const response = await supabase.from('pets').insert(pet).select().single();
    return response.data||{}
  },

  // async updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
  //   // Simulate API call delay
  //   return null
  // },

  // async deletePet(id: string): Promise<void> {
  //   // Simulate API call delay
  //   return null

  // }
}; 