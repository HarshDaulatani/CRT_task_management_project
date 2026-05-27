package com.example.taskmanagement.controller;
import com.example.taskmanagement.entity.User;
import com.example.taskmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody User user){
        return userService.loginUser(
                user.getEmail(),
                user.getPassword());
    }
    @GetMapping("/employees")
    public List<User> getEmployees() {
        return userService.getEmployees();
    }
}