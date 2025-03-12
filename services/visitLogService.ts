import { VetVisitLog } from '../types';
import { visitLogRepository } from '../repositories/visitLogRepository';

export const visitLogService = {
  async getVetVisitLogs(): Promise<VetVisitLog[]> {
    const vetVisitLogs = await visitLogRepository.getVetVisitLogs();
    return vetVisitLogs;
  },

  async getVetVisitLogById(id: string): Promise<VetVisitLog | null> {
    const vetVisitLog = await visitLogRepository.getVetVisitLogById(id);
    return vetVisitLog;
  },

  async createVetVisitLog(vetVisitLog: Omit<VetVisitLog, 'id'>): Promise<VetVisitLog> {

    const createdVetVisitLog = await visitLogRepository.createVetVisitLog(vetVisitLog);
    return createdVetVisitLog;
  },

  async updateVetVisitLog(id: string, updates: Partial<VetVisitLog>): Promise<VetVisitLog> {
    const updatedVetVisitLog = await visitLogRepository.updateVetVisitLog(id, updates);
    return updatedVetVisitLog;
  },

  async deleteVetVisitLog(id: string): Promise<void> {
    await visitLogRepository.deleteVetVisitLog(id);
  }
};