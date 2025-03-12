import { Pet } from '../types';
import axios from 'axios';
import {supabase} from '../utils/supabase';



export const petRepository = {
  async getPets(): Promise<Pet[]> {

    const response = await supabase.from("pets").select()
    return response.data;
  },

  async getPetById(id: string): Promise<Pet | null> {
    // Simulate API call delay
    const pets:Pet[] = (await axios.get(url)).data
    const pet = pets.find(p => p.id === id);
    return pet || null;
  },

  async createPet(pet: Pet): Promise<Pet> {
    // Simulate API call delay
    const response = await supabase.from('pets').insert(pet).select().single();
    return response.data||{}
  },

  async updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
    // Simulate API call delay
    return null
  },

  async deletePet(id: string): Promise<void> {
    // Simulate API call delay
    return null

  }
}; 