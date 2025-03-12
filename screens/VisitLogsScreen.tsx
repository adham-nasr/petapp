import React, { useEffect, useState } from 'react';
import { View,Text,StyleSheet, Button} from 'react-native';
import { Pet, VetVisitLog } from '../types';
import { globalMockPet } from '../utils/const'
import Logs from "../layouts/Logs"
import { visitLogService } from '../services/visitLogService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const VisitLogsScreen = () => { 

  const queryClient = useQueryClient()

  const visitLogQuery = useQuery({
    queryKey: ["visitLog"],
    queryFn : visitLogService.getVetVisitLogs,
    staleTime : Infinity
  })
  
  const addVisitLog = useMutation({
    mutationFn: visitLogService.createVetVisitLog,
    onSuccess: (visitLog)=>{ console.log(visitLog); queryClient.setQueryData(["visitLog"],(data:VetVisitLog[]) =>
      data
        ? [            
            ...data,
            visitLog,
          ]
        : visitLog)}

  })

  if (visitLogQuery.isLoading) {
    return <Text>NONE</Text>;
  }
  console.log(visitLogQuery.error)
  if (visitLogQuery.isError) {
    return <Text>{JSON.stringify(visitLogQuery.error)}</Text>;
  }
  
  return(
    <View>
      <Logs keyName="notes" data={visitLogQuery.data} logType="Vet Visit"/>
      <Button title="asd" onPress={()=>{  addVisitLog.mutate({date:"2024-01-25T10:00:00Z",notes:"Cancel",pet_id:"21"})}} />
    </View>
  )
};

const styles = StyleSheet.create({
    table: {
      marginTop: 16,
    },
    tableHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
  });
  export default VisitLogsScreen;