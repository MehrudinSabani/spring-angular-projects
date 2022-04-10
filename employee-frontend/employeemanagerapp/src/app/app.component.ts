import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees!: Employee[];

  //we define this employee in order to pass it into the function tied to the html form, in the edit employee modul
  public editEmployee: Employee;

  public deleteEmployee: Employee;

  constructor(private employeeServoce: EmployeeService) { }

  //we have to overvrite ngOnInit once we implement it in AppComp

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void {
    //subscribe notifies us whenever data changes from the server
    this.employeeServoce.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //LOOK ON line 57 in html file
  public onAddEmployee(addForm: NgForm): void{
    //the line bellow closes the form after adding a new employee
    document.getElementById('add-employee-form').click();
    this.employeeServoce.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        //we clear the form, since it remembers last edited
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
         }
    );

  }

  public onUpdateEmployee(employee: Employee): void{

    this.employeeServoce.addEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
         }
    );

  }

  public onDeleteEmployee(employeeId: number): void{
    this.employeeServoce.deleteEmployee(employeeId).subscribe(
      //response is void, as defined in service class
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
         }
    );

  }
  public searchEmployees(key: string): void{
    //for debugging
    console.log(key);
    const results: Employee[] = [];
    for (const empolyee of this.employees) {
      //if it doesn't equal -1 that means that it's present (it exists), that's how arrays in js work
      if (empolyee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || empolyee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || empolyee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || empolyee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(empolyee)
      }
    }
    this.employees = results;
    //if no matching key found, or no key entered at all
    if(results.length === 0 || !key){
      //then reset all the employees (display all of them)
      this.getEmployees();
    }
  }

  //programatically adding a button
  public onOpenModal(employee: Employee, mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button')
    //changing the type from default (submit) to button
    button.type = 'button'; 
    //none means that its hidden in the UI
    button.style.display = 'none';
    //We are doing this because the template uses modals (bootstrap v4), skip to 1:45 min in tutorial for more info
    button.setAttribute('data-toggle', 'modal')
    if (mode === 'add'){
      // the add update deleteEmployee modals are all defined in html file as id's
      button.setAttribute('data-target', '#addEmployeeModal')
    }
    if (mode === 'edit'){

      //whenever a user clicks an employee in the UI, we pass that same emploee in this class
      //So now we can use that same employee to bind it into the form in the html file
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal')
    }
    if (mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal')
    }

    //we add the button inside the div, main-container
    container?.appendChild(button)
    button.click();
  }
}