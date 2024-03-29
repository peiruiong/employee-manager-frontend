import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] = [];
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;
  title = 'employeemanagerapp';

  constructor(private employeeService:EmployeeService){
    
  }
  ngOnInit() {
    this.getEmployees();
    console.log("ngOnInit(): "+ this.employees);
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe({
      next:(response: Employee[])=>{
        this.employees=response
      },
      error:(error: HttpErrorResponse)=>{
        alert("line32:" + error.message);
      }
    }
    )
  }

  public onAddEmployee(addForm: NgForm):void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next:(response:Employee)=>{
        console.log(response);
        this.getEmployees();
        console.log("test: "+this.employees);
        addForm.reset();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    }
    )
    console.log("test2: "+this.employees);
  }

  public onUpdateEmployee(employee: Employee):void{
    this.employeeService.updateEmployee(employee).subscribe({
      next:(response:Employee)=>{
        console.log(response);
        this.getEmployees();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    }
    )
    console.log("test2: "+this.employees);
  }

  public onDeleteEmployee(employeeId: number):void{
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next:(response:void)=>{
        console.log(response);
        this.getEmployees();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    }
    )
    console.log("test2: "+this.employees);
  }

  public searchEmployees (key:String):void{
    const results: Employee[]=[];
    for(const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase())!==-1){
        results.push(employee);
      }
    }
    this.employees=results;
    if(results.length===0||!key){
      this.getEmployees();
    }
  }

  public onOpenModal(mode: string,employee?: Employee): void{
    const container = document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    else if(mode==='edit'){
      this.editEmployee=employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    else if(mode==='delete'){
      this.deleteEmployee=employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
