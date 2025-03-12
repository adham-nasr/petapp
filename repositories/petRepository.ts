import { Pet } from '../types';
import axios from 'axios';
import {supabase} from '../utils/supabase';


// const url = server_url + '/pets'

export const petRepository = {
  async getPets(): Promise<Pet[]> {
    // Simulate API call delay

    const response = await supabase.from("pets").select()
    console.log("Supabase RESPONSE")
    console.log(response)
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newPet: Pet = {
      ...pet,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    mockPets.push(newPet);
    return newPet;
  },

  async updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockPets.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Pet not found');
    }
    mockPets[index] = { ...mockPets[index], ...updates };
    return mockPets[index];
  },

  async deletePet(id: string): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockPets.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Pet not found');
    }
    mockPets.splice(index, 1);
  }
}; 