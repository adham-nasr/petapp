export const sortByDate = (data) => {
    data.sort(
        (a,b) => 
          {
            const x = new Date(a.date)
            const y = new Date(b.date)
            return x<y ? 1:-1
          });
    return data
}
export const calculateTrend = (data) => {

    let newData = []
    
    for (let i=0;i<data.length-1;i++)
    {
        let trend = 0
        if(data[i].weight>data[i+1].weight)
            trend=1
        else if(data[i].weight<data[i+1].weight)
            trend=-1
        newData.push({...data[i],trend:trend})
    }
    if(data.length)
        newData.push({...data[data.length-1],trend:0})
    return newData
}