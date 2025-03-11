import React, { useEffect, useState } from 'react';
import { View,Text,StyleSheet} from 'react-native';
import { Pet, VetVisitLog } from '../types';
import { globalMockPet } from '../const'
import Logs from "../layouts/Logs"

const VisitLogsScreen = () => { 

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
    <Logs keyName="notes" data={pet?.logs_vet_visits} logType="Vet Visit"/>
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
  export default VisitLogsScreen;