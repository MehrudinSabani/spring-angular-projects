package com.example.demo.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//repository is a naming convection when we work with databases
@Repository
public interface StudentRepository
    //Long because the type of student is long
        extends JpaRepository<Student, Long> {

    //SELECT * FROM student WHERE email = ?
    //This is querying in jbql
    @Query("SELECT s FROM Student s WHERE s.email = ?1")
    Optional<Student> findStudentByEmail(String email);

}
