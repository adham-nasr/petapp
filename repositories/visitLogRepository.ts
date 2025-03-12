import { VetVisitLog } from '../types';
import axios from 'axios';
import { server_url } from '../utils/const';


const url = server_url+'/logs_vet_visits'

export const visitLogRepository = {
  async getVetVisitLogs(): Promise<VetVisitLog[]> {
    const response = await axios.get(url);
    return response.data||[];
  },

  async getVetVisitLogById(id: string): Promise<VetVisitLog | null> {
    const vetVisitLogs: VetVisitLog[] = (await axios.get(url)).data;
    const vetVisitLog = vetVisitLogs.find(p => p.id === id);
    return vetVisitLog || null;
  },

  async createVetVisitLog(vetVisitLog: VetVisitLog): Promise<VetVisitLog> {
    const newVetVisitLog: VetVisitLog = (await axios.post(url, vetVisitLog)).data;
    return newVetVisitLog;
  },

  async updateVetVisitLog(id: string, updates: Partial<VetVisitLog>): Promise<VetVisitLog> {
    const updatedVetVisitLog: VetVisitLog = (await axios.patch(url + "/" + id, updates)).data;
    return updatedVetVisitLog;
  },

  async deleteVetVisitLog(id: string): Promise<void> {
    await axios.delete(url + "/" + id);
  }
};