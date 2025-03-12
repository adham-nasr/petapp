import { BodyConditionLog } from '../types';
import { healthLogRepository } from '../repositories/healthLogRepository';

export const healthLogService = {
  async getBodyConditionLogs(): Promise<BodyConditionLog[]> {
    const bodyConditionLogs = await healthLogRepository.getBodyConditionLogs();
    return bodyConditionLogs;
  },

  async getBodyConditionLogById(id: string): Promise<BodyConditionLog | null> {
    const bodyConditionLog = await healthLogRepository.getBodyConditionLogById(id);
    return bodyConditionLog;
  },

  async createBodyConditionLog(bodyConditionLog: Omit<BodyConditionLog, 'id'>): Promise<BodyConditionLog> {
    const newBodyConditionLog: BodyConditionLog = {
      ...bodyConditionLog,
      id: Math.random().toString(36).substr(2, 9), // Generate random ID
    };
    const createdBodyConditionLog = await healthLogRepository.createBodyConditionLog(newBodyConditionLog);
    return createdBodyConditionLog;
  },

  async updateBodyConditionLog(id: string, updates: Partial<BodyConditionLog>): Promise<BodyConditionLog> {
    const updatedBodyConditionLog = await healthLogRepository.updateBodyConditionLog(id, updates);
    return updatedBodyConditionLog;
  },

  async deleteBodyConditionLog(id: string): Promise<void> {
    await healthLogRepository.deleteBodyConditionLog(id);
  }
};