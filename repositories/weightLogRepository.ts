import { WeightLog } from '../types';
import axios from 'axios';

// Mock data for development
// const mockPets: Pet[] = [
//   {
//     id: '1',
//     name: 'Max',
//     species: 'Dog',
//     breed: 'Golden Retriever',
//     age: 3,
//     created_at: new Date().toISOString(),
//     owner_id: '123'
//   },
//   {
//     id: '2',
//     name: 'Luna',
//     species: 'Cat',
//     breed: 'Siamese',
//     age: 2,
//     created_at: new Date().toISOString(),
//     owner_id: '123'
//   }
// ];

const url = 'http://192.168.1.8:8080/logs_weight'

export const weightLogRepository = {
  async getWeightLogs(): Promise<WeightLog[]> {
    // Simulate API call delay

    const response = await axios.get(url)
    console.log(response)
    return response.data;
  },

  async getWeightLogById(id: string): Promise<WeightLog | null> {
    // Simulate API call delay
    const weightLogs:WeightLog[] = (await axios.get(url)).data
    const weightLog = weightLogs.find(p => p.id === id);
    return weightLog || null;
  },

  async createWeightLog(weightLog: WeightLog): Promise<WeightLog> {
    // Simulate API call delay
    const newWeightLog:WeightLog = (await axios.post(url,weightLog)).data

    return newWeightLog;
  },

  async updateWeightLog(id: string, updates: Partial<WeightLog>): Promise<WeightLog> {
    // Simulate API call delay
    const updatedWeightLog:WeightLog = (await axios.patch(url+"/"+id,updates)).data
    return updatedWeightLog;
  },

  async deleteWeightLog(id: string): Promise<void> {
    // Simulate API call delay
    await axios.delete(url+"/"+id)
  }
}; 