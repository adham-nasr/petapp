import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ActivityIndicator, Button} from 'react-native';
import { Pet, BodyConditionLog, WeightLog } from '../types';
import { globalMockPet } from '../utils/const'
import Logs from "../layouts/Logs"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { weightLogService } from '../services/weightLogService';

const WeightLogsScreen = () => { 

  const queryClient = useQueryClient()

  const weightLogQuery = useQuery({
    queryKey: ["weightLog"],
    queryFn : weightLogService.getWeightLogs,
    staleTime : Infinity
  })
  
  const addWeightLog = useMutation({
    mutationFn: weightLogService.createWeightLog,
    onSuccess: (weightLog)=>{ console.log(weightLog); queryClient.setQueryData(["weightLog"],(data:WeightLog[]) =>
      data
        ? [            
            ...data,
            weightLog,
          ]
        : weightLog)}

  })

  if (weightLogQuery.isLoading) {
    return <Text>NONE</Text>;
  }
  console.log(weightLogQuery.error)
  if (weightLogQuery.isError) {
    return <Text>{JSON.stringify(weightLogQuery.error)}</Text>;
  }
  
  return(
    <View>
      <Logs keyName="weight" data={weightLogQuery.data} logType="Weight"/>
      <Button title="asd" onPress={()=>{  addWeightLog.mutate({date:"2024-01-25T10:00:00Z",weight:"12.2",pet_id:"21"})}} />
    </View>

) };

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
  export default WeightLogsScreen;