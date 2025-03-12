import { VetVisitLog } from '../types';
import axios from 'axios';
import { supabase } from '../utils/supabase';


export const visitLogRepository = {
  async getVetVisitLogs(): Promise<VetVisitLog[]> {
    const response = await supabase.from("vet_visit_logs").select()
    return response.data||[];
  },

  async getVetVisitLogById(id: string): Promise<VetVisitLog | null> {
    const vetVisitLogs: VetVisitLog[] = (await axios.get(url)).data;
    const vetVisitLog = vetVisitLogs.find(p => p.id === id);
    return vetVisitLog || null;
  },

  async createVetVisitLog(vetVisitLog: Omit<VetVisitLog,'id'>): Promise<VetVisitLog> {
    
    const response = await supabase.from('vet_visit_logs').insert(vetVisitLog).select().single();
    return response.data||{}
  },

  async updateVetVisitLog(id: string, updates: Partial<VetVisitLog>): Promise<VetVisitLog> {
    const updatedVetVisitLog: VetVisitLog = (await axios.patch(url + "/" + id, updates)).data;
    return updatedVetVisitLog;
  },

  async deleteVetVisitLog(id: string): Promise<void> {
    await axios.delete(url + "/" + id);
  }
};