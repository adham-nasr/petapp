import { Pet,PurePet } from '../types';
import { petRepository } from '../repositories/petRepository';

// Mock data for development
const mockPets: PurePet[] = [
  {
    id: '1',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    created_at: new Date().toISOString(),
    owner_id: '123'
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Siamese',
    age: 2,
    created_at: new Date().toISOString(),
    owner_id: '123'
  }
];


export const petService = {
  async getPets(): Promise<Pet[]> {
    // Simulate API call delay
    const pets = await petRepository.getPets();
    return pets;
  },

  async getPetById(id: string): Promise<Pet | null> {
    // Simulate API call delay
    const pet = await petRepository.getPetById(id);
    // const pet = pets.find(p => p.id === id);
    // return pet || null;
    return pet
  },

  async createPet(pet: Omit<Pet, 'id' | 'created_at'>): Promise<Pet> {
    // Simulate API call delay
    const newPet: Pet = {
      ...pet,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    const created_pet = await petRepository.createPet(newPet);
    return created_pet;
  },

  async updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const updated_pet = await petRepository.updatePet(id,updates);
    // const index = mockPets.findIndex(p => p.id === id);
    // if (index === -1) {
    //   throw new Error('Pet not found');
    // }
    // mockPets[index] = { ...mockPets[index], ...updates };
    // return mockPets[index];
    return updated_pet
  },

  async deletePet(id: string): Promise<void> {
    // Simulate API call delay
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // const index = mockPets.findIndex(p => p.id === id);
    // if (index === -1) {
    //   throw new Error('Pet not found');
    // }
    // mockPets.splice(index, 1);
    await petRepository.deletePet(id);
  }
}; 