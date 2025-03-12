import { BodyConditionLog } from '../types';
import axios from 'axios';
import { supabase } from '../utils/supabase';


// const url = server_url+'/logs_bodycondition'

export const healthLogRepository = {
  async getBodyConditionLogs(): Promise<BodyConditionLog[]> {
    const response = await supabase.from("body_condition_logs").select()
    return response.data||[];
  },

  async getBodyConditionLogById(id: string): Promise<BodyConditionLog | null> {
    const bodyConditionLogs: BodyConditionLog[] = (await axios.get(url)).data;
    const bodyConditionLog = bodyConditionLogs.find(p => p.id === id);
    return bodyConditionLog || null;
  },

  async createBodyConditionLog(bodyConditionLog: Omit<BodyConditionLog,'id'>): Promise<BodyConditionLog> {
    
    const response = await supabase.from('body_condition_logs').insert(bodyConditionLog).select().single();
    return response.data||{}

  },

  async updateBodyConditionLog(id: string, updates: Partial<BodyConditionLog>): Promise<BodyConditionLog> {
    const updatedBodyConditionLog: BodyConditionLog = (await axios.patch(url + "/" + id, updates)).data;
    return updatedBodyConditionLog;
  },

  async deleteBodyConditionLog(id: string): Promise<void> {
    await axios.delete(url + "/" + id);
  }
};