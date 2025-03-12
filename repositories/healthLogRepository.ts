import { BodyConditionLog } from '../types';
import axios from 'axios';
import { server_url } from '../utils/const';


const url = server_url+'/logs_bodycondition'

export const healthLogRepository = {
  async getBodyConditionLogs(): Promise<BodyConditionLog[]> {
    const response = await axios.get(url);
    return response.data||[];
  },

  async getBodyConditionLogById(id: string): Promise<BodyConditionLog | null> {
    const bodyConditionLogs: BodyConditionLog[] = (await axios.get(url)).data;
    const bodyConditionLog = bodyConditionLogs.find(p => p.id === id);
    return bodyConditionLog || null;
  },

  async createBodyConditionLog(bodyConditionLog: BodyConditionLog): Promise<BodyConditionLog> {
    const newBodyConditionLog: BodyConditionLog = (await axios.post(url, bodyConditionLog)).data;
    return newBodyConditionLog;
  },

  async updateBodyConditionLog(id: string, updates: Partial<BodyConditionLog>): Promise<BodyConditionLog> {
    const updatedBodyConditionLog: BodyConditionLog = (await axios.patch(url + "/" + id, updates)).data;
    return updatedBodyConditionLog;
  },

  async deleteBodyConditionLog(id: string): Promise<void> {
    await axios.delete(url + "/" + id);
  }
};