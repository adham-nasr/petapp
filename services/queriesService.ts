
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

}; 