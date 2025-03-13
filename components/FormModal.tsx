import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

// Use Expo's DatePicker instead
import DateTimePicker  from '@react-native-community/datetimepicker';
import CustomButton from './CustomButton';
import {useForm,Controller} from "react-hook-form"

const FormModal = ({modalVisible,setModalVisible,inputProperties,actionHandler , item=null}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const {label,rules} = inputProperties || {label:null,rules:null}

    const defaultValues = !item  ?  {
      date: new Date(),
      textField: '',
    } : {
      date: new Date(item.date),
      textField: String(item.weight || item.notes || item.body_condition)
    }

    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: defaultValues,
    });
  
    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(false); // Hide the date picker after selection
      if (selectedDate) {
        setValue('date', selectedDate); // Update the form value
      }
    };
  
    const  onSubmit = async (data) => {
      console.log('Form Data:', data);
      if(!item)
        await actionHandler(data)
      else
        await actionHandler(data,item!.id)

      setValue('textField','')
      setModalVisible(false); // Close the modal after submission
    };

  return (
    <Modal
    visible={modalVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Enter Details</Text>

        {/* Date Field */}
        <Text style={styles.label}>Date</Text>
        <Controller
          control={control}
          name="date"
          rules={{ required: 'Date is required' }}
          render={({ field: { value } }) => (
            <>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={[styles.dateInput, errors.date && styles.errorBorder]}
              >
                <Text>{value.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {errors.date && <Text style={styles.errorText}>{errors.date.message}</Text>}
            </>
          )}
        />

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Name Field */}
        <Text style={styles.label}>{label}</Text>
        <Controller
          control={control}
          name="textField"
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={[styles.textInput, errors.textField && styles.errorBorder , label=="Notes" && styles.textArea]}
                placeholder=""
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={5}
              />
              {errors.textField && <Text style={styles.errorText}>{errors.textField.message}</Text>}
            </>
          )}
        />

            {/* Submit Button */}
            <CustomButton title="submit" pressHandler={handleSubmit(onSubmit)} />
            {/* Close Button */}
            <CustomButton title="Close" pressHandler={() => {setValue('textField',''); setModalVisible(false) } } />

          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  textArea:{
    height:100
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorBorder: {
    borderColor: 'red', // Highlight fields with errors
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FormModal;