package ee.agnessa.kt2.controller;


import ee.agnessa.kt2.entity.Todo;
import ee.agnessa.kt2.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class TodoController {
    @Autowired
    TodoRepository todoRepository;

    @GetMapping("todos")
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    @PostMapping("todos")
    public List<Todo> addTodo(@RequestBody Todo todo){
        todoRepository.save(todo);
        return todoRepository.findAll();
    }

    @DeleteMapping("todo/{id}")
    public List<Todo> deleteTodo(@PathVariable Long id){
        todoRepository.deleteById(id);
        return todoRepository.findAll();
    }

    @PutMapping("todos")
    public List<Todo> editTodo(@RequestBody Todo todo){
        todoRepository.save(todo);
        return todoRepository.findAll();
    }

    @GetMapping("todo/{id}")
    public Todo getTodo(@PathVariable Long id){
        return todoRepository.findById(id).orElseThrow();
    }

    @GetMapping("todos/search")
    public List<Todo> searchTodos(@RequestParam String title) {
        return todoRepository.findByTitleContainingIgnoreCase(title);
    }

    @GetMapping("todos/user/{userId}")
    public List<Todo> getTodosByUser(@PathVariable Long userId) {
        return todoRepository.findByUserId(userId);
    }
}
