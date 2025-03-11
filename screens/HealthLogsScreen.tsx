import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ScrollView,ActivityIndicator} from 'react-native';
import { Pet, BodyConditionLog, WeightLog,VetVisitLog } from '../types';
import { globalMockPet } from '../const'
import Logs from "../layouts/Logs"

const HealthLogsScreen = () => { 

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
      const fetchPet = async () => {
        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          setPet(globalMockPet);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPet();
    }, [globalMockPet]);


  if (loading) {
    return <Text>NONE</Text>;
  }
  
  return(
    <Logs keyName="body_condition" data={pet?.logs_bodycondition} logType="Health"/>
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
  export default HealthLogsScreen;