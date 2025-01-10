// screens/TaskScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const TaskScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const renderTask = ({ item }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => navigation.navigate('EditTask', { task: item })}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id.toString()}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default TaskScreen;
