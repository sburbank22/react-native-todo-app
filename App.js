import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CheckBox } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', description: 'Get oil changed', completed: false },
    { id: '2', description: 'Go get groceries', completed: false },
    { id: '3', description: 'Make nail appt.', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: String(tasks.length + 1), description: newTask, completed: false }
      ]);
      setNewTask('');
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <CheckBox
          checked={item.completed}
          onPress={() => handleToggleComplete(item.id)}
          checkedColor="#fff"
          containerStyle={styles.checkboxContainer}
        />
        <Text
          style={[
            styles.taskText,
            item.completed && styles.completedTask
          ]}
        >
          {item.description}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTask(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My To-Do List</Text>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Task"
          placeholderTextColor="#ddd"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c6e49', // Forest green background
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginRight: 10,
  },
  taskText: {
    color: '#333',
    fontSize: 18,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#d3d3d3',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#1b5e20',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
