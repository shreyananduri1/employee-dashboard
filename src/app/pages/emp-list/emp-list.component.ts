import { Component, ViewChild } from '@angular/core';
import { IEmployee } from '../../models/employees.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeesService } from '../../services/employees.service';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrl: './emp-list.component.scss',
})
export class EmpListComponent {
  employees: IEmployee[] = [];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'gender',
    'jobTitle',
    'city',
    'contact',
    'email',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private empService: EmployeesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getEmp().subscribe((response) => {
      this.employees = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delEmployee(id: any) {
    this.empService.delEmp(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EmpAddEditComponent, {data});
    dialogRef.afterClosed().subscribe(() => {
      this.loadEmployees(); //load users after closing dialog box
    }
    )
  }

  openAddForm(){
    const dialogRef = this.dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.loadEmployees()
    })
  }

}
