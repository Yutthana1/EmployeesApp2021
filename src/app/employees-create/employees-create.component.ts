import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employees-create',
  templateUrl: './employees-create.component.html',
  styleUrls: ['./employees-create.component.css']
})
export class EmployeesCreateComponent implements OnInit {

  @Input() showCreate=true;

  constructor(private routerAt: ActivatedRoute) {

    console.log(this.showCreate+"showCreate data sen page 2");
    // let isShow = routerAt.snapshot.params["Show"];
    // console.log(isShow);
    // this.display = isShow;
  }

  ngOnInit(): void {

  }



}
