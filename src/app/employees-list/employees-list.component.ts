import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Message} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {EmployeesModels} from "../Model-interface/employees-models";
import {interval, Subscription} from "rxjs";
import {colors} from "@angular/cli/utilities/color";



@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  private updateSubscription: Subscription = new Subscription;
  /*cars=[
    {name:"Toyota",price:133333,year:"1999",age:50,date: Date().toLocaleString()},
    {name:"Viso",price:55555,year:"2564",age:100,date:Date().toLocaleString()},
    {name:"Hitasi",price:19999,year:"2021",age:1.50,date:Date().toLocaleString()},
    {name:"Nisson",price:25555,year:"1998",age:40.05,date:Date().toLocaleString()},
    {name:"MaVo",price:5554,year:"2551",age:48.05,date:Date().toLocaleString()},
    {name:"Msi",price:254000,year:"1324",age:44.0511,date:Date().toLocaleString()},
  ];*/

  carHtml: any;
  employeeList: EmployeesModels[] = [];
  msgName: Message[] = [];
  employeeDetaill: any = [];
  editEmployee: any = [];
  // display popup
  displayCreate: boolean = false;
  displayEdit: boolean = false;
  displayDetail: boolean = false;
  displayDelete: boolean = false;

  constructor(private router: Router, private http: HttpClient) {

    //this.carHtml=this.cars;
    //console.log(this.displayEdit);
    // for (let i=0;i<this.cars.length;i++){
    //   if(this.cars[i].age<20){
    //     console.log(JSON.stringify(this.cars[i]));
    //   }else{
    //     console.log('Not<20');
    //   }
    // }
  }


  ngOnInit(): void {
    /*this.msgName= [{severity:'error', summary:'Error', detail:'Message Content'}];
    console.log(this.displayEdit);*/
    this.updateSubscription = interval(1000).subscribe(value => {
      this.getHttp()
    });
  }

  getHttp() {
    this.http.get<EmployeesModels[]>("https://localhost:44325/api/Emp/getAllEmployees").subscribe(response => {
      //console.log(response);
      this.employeeList = response;
    }, error => {
      console.log(error);
    });
  }

  getById(idEmp: number) {
    this.http.get("https://localhost:44325/api/Emp/getEmployeesBy_ID/" + idEmp).subscribe(response => {
      console.log(response)
      this.employeeDetaill = response;
    }, error => {
      console.log(error)
    });
  }
  EditIdx: number=0;
  // Use your own locale


  async editEmployees(EditIdxx:number) {
    let data = await this.http.get<EmployeesModels>("https://localhost:44325/api/Emp/getEmployeesBy_ID/" + EditIdxx).toPromise();
    //let jsondata =  JSON.stringify(data);
    console.log(data);
    this.editEmployee = data;
    //รอข้อมูลมา
    this.Employee_name.setValue(data.nameEmp);
    this.Employee_designation.setValue(data.designation);
    this.Employee_address.setValue(data.address);
    this.Employee_salary.setValue(data.salary);
    this.Employee_date.setValue(data.dateTime.slice(0, 16));
    //console.log(data.dateTime.slice(0, 16));
  }

  showDialogCreate() {
    this.displayCreate = true;
    this.displayDetail = false;
    this.displayEdit = false;
    this.displayDelete = false;
  }

  showEditDialog(editId: number) {
    this.EditIdx = editId;
    this.editEmployees(this.EditIdx);

    this.displayEdit = true;
    this.displayDetail = false;
    this.displayCreate = false;
    this.displayDelete = false;
  }

  bt_EditEmp() {
    if (this.Employee_name.invalid || this.Employee_salary.invalid || this.Employee_date.invalid) {
      console.log(this.Employee_salary.errors);
      return;
    } else {
    let editData = {
      "emp_ID": this.EditIdx,
      "nameEmp": this.Employee_name.value,
      "designation": this.Employee_designation.value,
      "address": this.Employee_address.value,
      "salary": this.Employee_salary.value,
      "dateTime": this.Employee_date.value,
    }
    // console.log(latest_date+"\t--json data");
    //console.log(JSON.stringify(new  Date(this.Employee_date.value+":00:000Z"))+"\t--new date");

    this.http.put("https://localhost:44325/api/Emp/updateEmployees", editData).subscribe(response => {
      console.log("responsedata = ");
      console.log(response);
    if(response == 1){
      this.Bt_backDialog();
    }
    }, error => {
      console.log(error)
    });
  }
  }


  showDetailDialog(idx: number) {

    this.getById(idx);

    this.displayDetail = true;
    this.displayCreate = false;
    this.displayEdit = false;
    this.displayDelete = false;
  }
  deleteIdEmp:number=0;
  showDeleteDialog(idx: number) {
    this.deleteIdEmp = idx;
    let data = this.getById(idx);
    this.displayDelete = true;
    this.displayDetail = false;
    this.displayCreate = false;
    this.displayEdit = false;
  }

  async Bt_delete(){
   let Uri = "https://localhost:44325/api/Emp/deleteEmployees/";
   let response =  await this.http.delete(Uri+this.deleteIdEmp).toPromise();
   console.log(response+"\tdelete reponse");
   if (response){
     this.Bt_backDialog();
   }
  }
  //update

  //FromControll
  Employee_name = new FormControl(null, Validators.required);
  Employee_salary = new FormControl(null, [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,99})?$'), Validators.min(0.0)]);
  Employee_designation = new FormControl();
  Employee_address = new FormControl();
  Employee_date = new FormControl(null, Validators.required);


  saveCreate() {
    if (this.Employee_name.invalid || this.Employee_salary.invalid || this.Employee_date.invalid) {
      console.log(this.Employee_salary.errors);
      return;
    } else {
      let empSentdata = {
        "nameEmp": this.Employee_name.value,
        "designation": this.Employee_designation.value,
        "address": this.Employee_address.value,
        "salary": this.Employee_salary.value,
        "dateTime": this.Employee_date.value
      }
      const Uri = "https://localhost:44325/api/Emp/insertEmployees";
      this.http.post(Uri, empSentdata).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });

      this.Bt_backDialog();
    }

  }

  Bt_backDialog() {
    this.displayDelete = false;
    this.displayDetail = false;
    this.displayCreate = false;
    this.displayEdit = false;
    this.resetFromControll();
  }

  resetFromControll() {
    this.Employee_name.reset();
    this.Employee_salary.reset();
    this.Employee_address.reset();
    this.Employee_date.reset();
    this.Employee_designation.reset();
  }


}
