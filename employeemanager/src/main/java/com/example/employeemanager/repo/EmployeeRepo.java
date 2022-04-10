package com.example.employeemanager.repo;

import com.example.employeemanager.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


//we pass in the "<>" the class and type of id which is Employee and Long
//we can inject this interface whenever we need it
public interface EmployeeRepo extends JpaRepository<Employee, Long> {

    //Spring automatically created delete function, just by the name convention (do more research on this)
    void deleteEmployeeById(Long id);

    //an optional of Employee type, if not specified that it's employee error occurs in EmployeeService
    Optional<Employee> findEmployeeById(Long id);
}
