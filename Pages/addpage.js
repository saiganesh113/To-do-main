import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTaskScreen({ navigation, route }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedTag, setSelectedTag] = useState('Personal');
  const [selectedPriority, setSelectedPriority] = useState('Low');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (route.params?.isEditing && route.params?.task) {
      const task = route.params.task;
      setTaskTitle(task.title);
      setTaskDescription(task.description);
      const [hours, minutes] = task.time.split(' ').map((val) => parseInt(val, 10));
      setSelectedHours(hours);
      setSelectedMinutes(minutes);
      setSelectedTag(task.tag || 'Personal');
      setSelectedPriority(task.priority || 'Low');
      setIsEditing(true);
    }
  }, [route.params]);

  const saveTask = async () => {
    const description = taskDescription.startsWith('http')
      ? taskDescription
      : `https://${taskDescription}`;

    const newTask = {
      title: taskTitle,
      description,
      tag: selectedTag,
      time: `${selectedHours}h ${selectedMinutes}m`,
      priority: selectedPriority,
    };

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];

      if (isEditing) {
        const index = tasks.findIndex((t) => t.title === route.params.task.title);
        tasks[index] = newTask;
      } else {
        tasks.push(newTask);
      }

      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="menu" size={28} color="white" />
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Task' : 'Add Task'}</Text>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.profileIcon} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.innerContainer}>
        <Text style={styles.headerText}>{isEditing ? 'Edit Task' : 'Add Task'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Task Title"
          placeholderTextColor="#aaa"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="URL or Description"
          placeholderTextColor="#aaa"
          value={taskDescription}
          onChangeText={setTaskDescription}
        />

        <View style={styles.rowContainer}>
          <View style={styles.leftContainer}>
            {/* Timer Button */}
            <TouchableOpacity style={styles.iconWrapper} onPress={() => setTimeModalVisible(true)}>
              <Ionicons name="timer-outline" size={40} color="white" />
              <Text
                style={[
                  styles.iconLabel,
                  { color: selectedHours > 0 || selectedMinutes > 0 ? '#7f7fff' : 'white' },
                ]}
              >
                Timer: {`${selectedHours}h ${selectedMinutes}m`}
              </Text>
            </TouchableOpacity>

            {/* Tag Selector */}
            <TouchableOpacity style={styles.iconWrapper} onPress={() => setTagModalVisible(true)}>
              <MaterialIcons name="category" size={40} color="white" />
              <Text
                style={[
                  styles.iconLabel,
                  { color: selectedTag ? '#7f7fff' : 'white' },
                ]}
              >
                Tag: {selectedTag}
              </Text>
            </TouchableOpacity>

            {/* Priority Selector */}
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={() => setSelectedPriority((prev) => (prev === 'Low' ? 'High' : 'Low'))}
            >
              <MaterialIcons name="flag" size={40} color="white" />
              <Text
                style={[
                  styles.iconLabel,
                  { color: selectedPriority === 'High' ? '#7f7fff' : 'white' },
                ]}
              >
                Priority: {selectedPriority}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
              <Ionicons name="checkmark" size={40} color="white" />
              <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Timer Modal */}
      <Modal visible={timeModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Choose Time</Text>

            <View style={styles.pickerContainer}>
              <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Hours</Text>
                <Picker
                  selectedValue={selectedHours}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedHours(itemValue)}
                >
                  {Array.from({ length: 25 }, (_, i) => (
                    <Picker.Item key={i} label={`${i}`} value={i} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Minutes</Text>
                <Picker
                  selectedValue={selectedMinutes}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <Picker.Item key={i} label={`${i}`} value={i} />
                  ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity onPress={() => setTimeModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Tag Modal */}
      <Modal visible={tagModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Tag</Text>
            {['Personal', 'Office', 'Urgent'].map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[styles.optionButton, { paddingBottom: 5 }]}
                onPress={() => {
                  setSelectedTag(tag);
                  setTagModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{tag}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setTagModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Floating Action Button (FAB) */}
      <Pressable style={styles.fab} onPress={() => navigation.navigate('Add')}>
        <MaterialIcons name="add" size={32} color="white" />
      </Pressable>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <MaterialCommunityIcons name="view-grid" size={24} color="white" />
          <Text style={styles.navText}>Index</Text>
        </Pressable>

        <Pressable style={[styles.navItem, styles.leftNavItem]} onPress={() => navigation.navigate('Organizer')}>
          <MaterialCommunityIcons name="folder" size={24} color="white" />
          <Text style={styles.navText}>Organizer</Text>
        </Pressable>

        <Pressable style={[styles.navItem, styles.rightNavItem]} onPress={() => navigation.navigate('Focus')}>
          <FontAwesome name="globe" size={24} color="white" />
          <Text style={styles.navText}>Focus</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <MaterialCommunityIcons name="account" size={24} color="white" />
          <Text style={styles.navText}>Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  iconLabel: { color: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 22, color: 'white' },
  headerText: { fontSize: 15, color: 'white' },
  profileIcon: { width: 40, height: 40, borderRadius: 20 },
  innerContainer: { flex: 1, padding: 20 },
  input: { backgroundColor: '#1c1c1c', color: 'white', padding: 12, borderRadius: 8, marginVertical: 10 },
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  leftContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' },
  rightContainer: { flex: 1, alignItems: 'flex-end' },
  iconWrapper: { alignItems: 'center', flex: 1 },
  saveButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center' },
  buttonText: { color: 'white', marginLeft: 5, fontSize: 16 },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#333', padding: 20, borderRadius: 10, alignItems: 'center', width: '80%' },
  modalHeader: { color: 'white', paddingBottom: 10, fontSize: 20 },
  pickerContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  pickerWrapper: { alignItems: 'center' },
  pickerLabel: { color: 'white', marginBottom: 10 },
  picker: { width: 120, color: 'white', backgroundColor: '#444' },
  closeText: { color: '#F44336', fontSize: 16, marginTop: 20 },
  optionButton: {
    backgroundColor: '#7f7fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    width: '100%',
  },
  optionText: { color: 'white', fontSize: 16 },
  fab: {
    backgroundColor: '#7f7fff',
    borderRadius: 35,
    padding: 20,
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -35 }],
    elevation: 5,
    zIndex: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#1c1c1c',
    height: 80,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  leftNavItem: {
    marginRight: 40,
  },
  rightNavItem: {
    marginLeft: 40,
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});
