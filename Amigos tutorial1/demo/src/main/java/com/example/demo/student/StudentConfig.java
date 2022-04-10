package com.example.demo.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class StudentConfig {
//this class helps us make entries into the database
    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository){
        return args -> {
            //after pressing ctrl/alt/v
            Student mariam = new Student(
                    "Mariam",
                    "mariam.jamal@gmail.com",
                    LocalDate.of(2000, Month.APRIL, 5)
            );

            //we dont need the id, it gets generated automatically
            Student alex = new Student(
                    "Alex",
                    "alex.jamal@gmail.com",
                    LocalDate.of(2004, Month.APRIL, 5)

            );
            repository.saveAll(
                    List.of(mariam, alex)
            );

            //before pressing ctrl+alt+v
//            new Student(
//                    1L,
//                    "Mariam",
//                    "mariam.jamal@gmail.com",
//                    LocalDate.of(2000, Month.APRIL, 5),
//                    22
//            );
        };
    }
}
