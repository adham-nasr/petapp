import { VetVisitLog } from '../types';
import axios from 'axios';
import { supabase } from '../utils/supabase';


export const visitLogRepository = {
  async getVetVisitLogs(): Promise<VetVisitLog[]> {
    const response = await supabase.from("vet_visit_logs").select()
    return response.data||[];
  },

  async getVetVisitLogById(id: string): Promise<VetVisitLog | null> {
    const {data,error} = await supabase.from("vet_visit_logs").select().eq("id",id).single()
    if(error)
    {
      console.log("Error Fetching vet Logs : " , error)
      return null
    }
    return data as VetVisitLog | null
  },

  async createVetVisitLog(vetVisitLog: Omit<VetVisitLog,'id'>): Promise<VetVisitLog> {
    
    const response = await supabase.from('vet_visit_logs').insert(vetVisitLog).select().single();
    return response.data||{}
  },

  async updateVetVisitLog(id: string, updates: Partial<VetVisitLog>): Promise<VetVisitLog> {
    const response:any = await supabase.from('vet_visit_logs').update(updates).eq('id',id).select();
    if (response.data)
      return response.data[0] || null
    throw Error
  },

  async deleteVetVisitLog(id: string): Promise<any> {
    const response = await supabase.from('vet_visit_logs').delete().eq('id',id)
    return response
  }
};