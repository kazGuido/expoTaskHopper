import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TextInput, Button, Checkbox, Snackbar, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Layout from './Layout'; // Import your Layout component
import DateTimePicker from '@react-native-community/datetimepicker';



const placeholderTaskers = [
  { id: '1', name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Jane Smith', avatar: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Bob Johnson', avatar: 'https://via.placeholder.com/150' },
];

const placeholderUser = {
  id: 'user1',
  name: 'Current User',
};

export function ServiceBookingWizard({ route }) {
  const { service } = route.params || {};
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [taskers] = useState(placeholderTaskers);
  const [selectedTaskers, setSelectedTaskers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  if (!service) {
    return (
      <Layout> {/* Wrap in Layout */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error: Service information is missing.</Text>
        </View>
      </Layout>
    );
  }

  const handleTaskerSelection = (taskerId) => {
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
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <Layout> {/* Wrap the main content in Layout */}
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Book {service.name}</Text>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Step {step} of 3</Text>

        {step === 1 && (
          <View>
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              mode="outlined"
              style={{ marginBottom: 20 }}
            />
            <Button mode="contained" onPress={() => setStep(2)}>
              Next
              <Ionicons name="arrow-forward" size={20} color="white" />
            </Button>
          </View>
        )}

        {step === 2 && (
          <View>
            <Button onPress={() => setShowDatePicker(true)} style={{ marginBottom: 20 }}>
              <Ionicons name="calendar-outline" size={20} color="black" />
              <Text>{date.toLocaleString()}</Text>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button mode="outlined" onPress={() => setStep(1)}>
                Back
              </Button>
              <Button mode="contained" onPress={() => setStep(3)}>
                Next
              </Button>
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Select Taskers</Text>
            {taskers.map((tasker) => (
              <View key={tasker.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Checkbox
                  status={selectedTaskers.includes(tasker.id) ? 'checked' : 'unchecked'}
                  onPress={() => handleTaskerSelection(tasker.id)}
                />
                <Image source={{ uri: tasker.avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
                <Text>{tasker.name}</Text>
              </View>
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button mode="outlined" onPress={() => setStep(2)}>
                Back
              </Button>
              <Button mode="contained" onPress={handleSubmit} disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="white" /> : 'Book Service'}
              </Button>
            </View>
          </View>
        )}

        {step === 4 && (
          <View>
            <Text style={{ fontSize: 24, color: 'green', marginBottom: 10 }}>Booking Confirmed!</Text>
            <Text>Your service has been booked successfully.</Text>
            <Button mode="contained" onPress={() => setStep(1)}>
              Book Another Service
            </Button>
          </View>
        )}

        {error !== '' && (
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
          >
            {error}
          </Snackbar>
        )}
      </View>
    </Layout>
  );
}
