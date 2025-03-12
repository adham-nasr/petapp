import { Pet,PurePet } from '../types';
import { petRepository } from '../repositories/petRepository';

export const petService = {
  async getPets(): Promise<Pet[]> {

    const pets = await petRepository.getPets();
    return pets;
  },

  async getPetById(id: string): Promise<Pet | null> {

    const pet = await petRepository.getPetById(id);
    return pet
  },

  async createPet(pet: Omit<Pet, 'id' | 'created_at'>): Promise<Pet> {
  
    const created_pet = await petRepository.createPet(pet);
    return created_pet;
  },

  async updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {

    await new Promise(resolve => setTimeout(resolve, 1000));
    const updated_pet = await petRepository.updatePet(id,updates);
    return updated_pet
  },

  async deletePet(id: string): Promise<void> {

    await petRepository.deletePet(id);
  }
}; 