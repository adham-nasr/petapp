import { WeightLog } from '../types';
import axios from 'axios';
import { server_url } from '../utils/const';


const url = server_url+'/logs_weight'

export const weightLogRepository = {
  async getWeightLogs(): Promise<WeightLog[]> {
    // Simulate API call delay

    const response = await axios.get(url)
    console.log(response)
    return response.data||[];
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