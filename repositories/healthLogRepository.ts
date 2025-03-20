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
    
    const {data,error} = await supabase.from("body_condition_logs").select().eq("id",id).single()
    if(error)
    {
      console.log("Error Fetching Health Logs : " , error)
      return null
    }
    return data as BodyConditionLog | null

  },

  async createBodyConditionLog(bodyConditionLog: Omit<BodyConditionLog,'id'>): Promise<BodyConditionLog> {
    
    const response = await supabase.from('body_condition_logs').insert(bodyConditionLog).select().single();
    return response.data||{}

  },

  async updateBodyConditionLog(id: string, updates: Partial<BodyConditionLog>): Promise<BodyConditionLog> {
    const response:any = await supabase.from('body_condition_logs').update(updates).eq('id',id).select();
    if (response.data)
      return response.data[0] || null
    throw Error
  },

  async deleteBodyConditionLog(id: string): Promise<any> {
    const response = await supabase.from('body_condition_logs').delete().eq('id',id)
    return response
  }
};