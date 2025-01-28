import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Checkbox, Snackbar, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Service } from '../lib/models/Service';

interface ServiceBookingWizardProps {
  route: {
    params: {
      service: Service;
    };
  };
  navigation: any;
}

const placeholderTaskers = [
  { id: '1', name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Jane Smith', avatar: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Bob Johnson', avatar: 'https://via.placeholder.com/150' },
];

const placeholderUser = {
  id: 'user1',
  name: 'Current User',
};

export const ServiceBookingWizard: React.FC<ServiceBookingWizardProps> = ({ route, navigation }) => {
  const { service } = route.params;
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [taskers] = useState(placeholderTaskers);
  const [selectedTaskers, setSelectedTaskers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleTaskerSelection = (taskerId: string) => {
    setSelectedTaskers(prev =>
      prev.includes(taskerId) ? prev.filter(id => id !== taskerId) : [...prev, taskerId]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Booking submitted:', {
        service: service.id,
        location,
        date,
        taskers: selectedTaskers,
        status: 'pending',
        userId: placeholderUser.id,
      });
      setStep(4);
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      setSnackbarVisible(true);
    }
    setIsLoading(false);
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((s) => (
        <View key={s} style={[styles.step, s <= step ? styles.activeStep : {}]}>
          <Text style={[styles.stepText, s <= step ? styles.activeStepText : {}]}>{s}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Book {service.name}</Text>
        {renderStepIndicator()}

        {step === 1 && (
          <View>
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              mode="outlined"
              style={styles.input}
            />
            <Button mode="contained" onPress={() => setStep(2)} style={styles.button}>
              Next
            </Button>
          </View>
        )}

        {step === 2 && (
          <View>
            <Button onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
              <Ionicons name="calendar-outline" size={20} color="#1f2937" />
              <Text style={styles.dateButtonText}>{date.toLocaleString()}</Text>
            </Button>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
            <View style={styles.navigationButtons}>
              <Button mode="outlined" onPress={() => setStep(1)} style={styles.backNextButton}>
                Back
              </Button>
              <Button mode="contained" onPress={() => setStep(3)} style={styles.backNextButton}>
                Next
              </Button>
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.sectionTitle}>Select Taskers</Text>
            {taskers.map((tasker) => (
              <View key={tasker.id} style={styles.taskerItem}>
                <Checkbox
                  status={selectedTaskers.includes(tasker.id) ? 'checked' : 'unchecked'}
                  onPress={() => handleTaskerSelection(tasker.id)}
                />
                <Image source={{ uri: tasker.avatar }} style={styles.taskerAvatar} />
                <Text style={styles.taskerName}>{tasker.name}</Text>
              </View>
            ))}
            <View style={styles.navigationButtons}>
              <Button mode="outlined" onPress={() => setStep(2)} style={styles.backNextButton}>
                Back
              </Button>
              <Button 
                mode="contained" 
                onPress={handleSubmit} 
                disabled={isLoading} 
                style={styles.backNextButton}
              >
                {isLoading ? <ActivityIndicator color="#ffffff" /> : 'Book Service'}
              </Button>
            </View>
          </View>
        )}

        {step === 4 && (
          <View style={styles.confirmationContainer}>
            <Ionicons name="checkmark-circle" size={64} color="#10b981" />
            <Text style={styles.confirmationTitle}>Booking Confirmed!</Text>
            <Text style={styles.confirmationText}>Your service has been booked successfully.</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Home')} style={styles.button}>
              Back to Home
            </Button>
          </View>
        )}

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
        >
          {error}
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1f2937',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  activeStep: {
    backgroundColor: '#3b82f6',
  },
  stepText: {
    color: '#4b5563',
    fontWeight: 'bold',
  },
  activeStepText: {
    color: '#ffffff',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#1f2937',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backNextButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  taskerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
  },
  taskerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  taskerName: {
    fontSize: 16,
    color: '#1f2937',
  },
  confirmationContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginTop: 16,
    marginBottom: 8,
  },
  confirmationText: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default ServiceBookingWizard;