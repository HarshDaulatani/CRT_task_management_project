package com.example.taskmanagement.service;
import com.example.taskmanagement.entity.User;
import com.example.taskmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.taskmanagement.config.JwtUtil;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getEmployees() {
        return userRepository.findByRole("EMPLOYEE");
    }

    public Map<String, String> loginUser(
            String email,
            String password
    ) {
        User user = userRepository.findByEmail(email).orElse(null);

        if(user == null) {
            return null;
        }

        if(user.getPassword().equals(password)) {
            String token =
                    jwtUtil.generateToken(
                            user.getEmail(),
                            user.getRole()
                    );
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole());
            return response;
        }
        return null;
    }
}