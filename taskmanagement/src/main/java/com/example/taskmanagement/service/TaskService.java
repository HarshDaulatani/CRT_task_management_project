package com.example.taskmanagement.service;

import com.example.taskmanagement.entity.Task;
import com.example.taskmanagement.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    public String deleteTask(Long id) {
        taskRepository.deleteById(id);
        return "Task Deleted";
    }

    public Task updateTaskStatus(Long id, String status) {

        Task task = taskRepository.findById(id).orElse(null);

        if(task != null) {

            task.setStatus(status);

            return taskRepository.save(task);
        }

        return null;
    }
    public Task updateTask(
            Long id,
            Task updatedTask
    ) {

        Task task =
                taskRepository
                        .findById(id)
                        .orElse(null);

        if(task != null) {

            task.setTitle(updatedTask.getTitle());

            task.setDescription(
                    updatedTask.getDescription()
            );

            task.setPriority(
                    updatedTask.getPriority()
            );

            task.setAssignedTo(
                    updatedTask.getAssignedTo()
            );

            task.setStatus(
                    updatedTask.getStatus()
            );

            return taskRepository.save(task);
        }

        return null;
    }
}