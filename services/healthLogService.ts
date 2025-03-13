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
   
    const createdBodyConditionLog = await healthLogRepository.createBodyConditionLog(bodyConditionLog);
    return createdBodyConditionLog;
  },

  async updateBodyConditionLog({id, updates}:any): Promise<BodyConditionLog> {
    const updatedBodyConditionLog = await healthLogRepository.updateBodyConditionLog(id, updates);
    if(!updatedBodyConditionLog)
      throw Error
    return updatedBodyConditionLog;
  },

  async deleteBodyConditionLog(id: string): Promise<any> {
    const response = await healthLogRepository.deleteBodyConditionLog(id);
    if(!response.error)
      return id
    throw Error
  }
};