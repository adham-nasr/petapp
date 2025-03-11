import {Pet} from "./types"

export const globalMockPet: Pet = {
  id: '1',
  name: 'Max',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: 3,
  created_at: new Date().toISOString(),
  owner_id: '123',
  logs_weight: [
    { id: '1', pet_id: '1', weight: 25.5, date: '2024-02-25T10:00:00Z' },
    { id: '2', pet_id: '1', weight: 26.0, date: '2024-01-25T10:00:00Z' },
  ],
  logs_bodycondition: [
    { id: '1', pet_id: '1', body_condition: "3", date: '2024-02-25T10:00:00Z' },
    { id: '2', pet_id: '1', body_condition: "4", date: '2024-01-25T10:00:00Z' },
  ],
  logs_vet_visits: [
    { id: '1', pet_id: '1', notes: "Depression & Paranoia", date: '2024-02-25T10:00:00Z' },
    { id: '1', pet_id: '1', notes: "Diabetes", date: '2024-02-25T10:00:00Z' },
    { id: '1', pet_id: '1', notes: "hsad sagsdgd agsa rury pipi j;k; mnn bcbv cxcx zzzzzzzzzzzzz", date: '2024-02-25T10:00:00Z' },

  ],
};