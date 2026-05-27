package com.example.taskmanagement.controller;

import com.example.taskmanagement.entity.Task;
import com.example.taskmanagement.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/all")
    public List<Task> getAllTasks() {

        return taskService.getAllTasks();
    }

    @PostMapping("/add")
    public Task addTask(
            @RequestBody Task task
    ) {

        return taskService.addTask(task);
    }

    @PutMapping("/update/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task
    ) {

        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTask(
            @PathVariable Long id
    ) {

        taskService.deleteTask(id);

        return "Deleted";
    }

}