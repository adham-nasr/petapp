import { Pet,WeightLog } from '../types';
import { weightLogRepository } from '../repositories/weightLogRepository';

export const weightLogService = {
  async getWeightLogs(): Promise<WeightLog[]> {

    const weightLogs = await weightLogRepository.getWeightLogs();
    return weightLogs;
  },

  async getWeightLogById(id: string): Promise<WeightLog | null> {

    await new Promise(resolve => setTimeout(resolve, 1000));
    const weightLog = await weightLogRepository.getWeightLogById(id);
    return weightLog;
  },

  async createWeightLog(weightLog: Omit<WeightLog, 'id'>): Promise<WeightLog> {
    
    const created_weightLog = await weightLogRepository.createWeightLog(weightLog);
    return created_weightLog;
  },

  async updateWeightLog(id: string, updates: Partial<WeightLog>): Promise<WeightLog> {
    const updated_weightLog = await weightLogRepository.updateWeightLog(id,updates);
    return updated_weightLog;
  },

  async deletePet(id: string): Promise<void> {
    await weightLogRepository.deleteWeightLog(id);

  }
}; 