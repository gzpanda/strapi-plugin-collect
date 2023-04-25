import axiosInstance from '../utils/axiosInstance';
import { Source, CronJob, CronJobInputData } from '../../../types';

export const collect = {
  async getAllSources() {
    return axiosInstance.get<Source[]>('/collect/sources');
  },

  async createClass(id: number) {
    return axiosInstance.put(`/collect/sources/createclass/${id}`);
  },

  async createVideoAll(id: number) {
    return axiosInstance.post(`/collect/sources/createVideoAll/${id}`);
  },

  async createVideoWeekend(id: number) {
    return axiosInstance.post(`/collect/sources/createVideoWeekend/${id}`);
  },

  async createVideo24Hour(id: number) {
    return axiosInstance.post(`/collect/sources/createVideo24Hour/${id}`);
  },

  async getAllCronJobs() {
    return axiosInstance.get<CronJob[]>('/collect/cron-jobs');
  },

  async getCronJob(id: number) {
    return axiosInstance.get<CronJob>(`/collect/cron-jobs/${id}`);
  },

  async createNewCronJob(data: CronJobInputData) {
    return axiosInstance.post(`/collect/cron-jobs`, data);
  },

  async updateCronJob(id: number, data: Partial<CronJobInputData>) {
    return axiosInstance.put(`/collect/cron-jobs/${id}`, data);
  },

  async publishCronJob(id: number) {
    return axiosInstance.put(`/collect/cron-jobs/publish/${id}`);
  },

  async unpublishCronJob(id: number) {
    return axiosInstance.put(`/collect/cron-jobs/unpublish/${id}`);
  },

  async deleteCronJob(id: number) {
    return axiosInstance.delete(`/collect/cron-jobs/${id}`);
  },
};
