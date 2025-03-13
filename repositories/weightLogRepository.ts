import { WeightLog } from '../types';
import axios from 'axios';

import { supabase } from '../utils/supabase';


export const weightLogRepository = {
  async getWeightLogs(): Promise<WeightLog[]> {

    const response = await supabase.from("weight_logs").select()
    return response.data||[];
  },

  async getWeightLogById(id: string): Promise<WeightLog | null> {
    const weightLogs:WeightLog[] = (await axios.get(url)).data
    const weightLog = weightLogs.find(p => p.id === id);
    return weightLog || null;
  },

  async createWeightLog(weightLog: Omit<WeightLog,'id'>): Promise<WeightLog> {

    const response = await supabase.from('weight_logs').insert(weightLog).select().single();
    return response.data||{}

  },

  async updateWeightLog(id: string, updates: Partial<WeightLog>): Promise<any> {

    const response:any = await supabase.from('weight_logs').update(updates).eq('id',id).select();
    if (response.data)
      return response.data[0] || null
    throw Error
  },

  async deleteWeightLog(id: string): Promise<any> {

    const response = await supabase.from('weight_logs').delete().eq('id',id)
    return response
  }
}; 