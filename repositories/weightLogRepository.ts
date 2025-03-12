import { WeightLog } from '../types';
import axios from 'axios';
// import { server_url } from '../utils/const';

import { supabase } from '../utils/supabase';
// const url = server_url+'/logs_weight'

const table_name = 'weight_logs'

export const weightLogRepository = {
  async getWeightLogs(): Promise<WeightLog[]> {
    // Simulate API call delay

    const response = await supabase.from("weight_logs").select()
    console.log(response)
    return response.data||[];
  },

  async getWeightLogById(id: string): Promise<WeightLog | null> {
    // Simulate API call delay
    const weightLogs:WeightLog[] = (await axios.get(url)).data
    const weightLog = weightLogs.find(p => p.id === id);
    return weightLog || null;
  },

  async createWeightLog(weightLog: Omit<WeightLog,'id'>): Promise<WeightLog> {

    const response = await supabase.from('weight_logs').insert(weightLog).select().single();
    return response.data||{}

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