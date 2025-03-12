import { Pet,PurePet } from '../types';
import { petRepository } from '../repositories/petRepository';

// Mock data for development
const mockPets: PurePet[] = [
  {
    id: '1',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    created_at: new Date().toISOString(),
    owner_id: '123'
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Siamese',
    age: 2,
    created_at: new Date().toISOString(),
    owner_id: '123'
  }
];


export const queriesService = {
    isLoading(queries:any[]): boolean {

        for(const query of queries)
        {
            if(query.isLoading)
                return true;
        }
        return false;
  },
  hasErrors(queries:any[]): Error|null {

    for(const query of queries)
    {
        if(query.error)
            return query.error;
    }
    return null;
},
    // mergeData(queries:any[]): any {
    //     let pet = queries[0].data
    //     let pet = queries.pet.data = 

    //     return queries.map(item => {
    //         return {item.key : item.value.data} 
    //     }) 
    // },


}; 