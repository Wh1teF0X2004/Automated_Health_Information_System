/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Add physician component for physician feature
*/ 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-physician',
  templateUrl: './add-physician.component.html',
  styleUrls: ['./add-physician.component.css']
})

export class AddPhysicianComponent {
  imageUrl: string = '../assets/images/banner-sample.png';

  /**
   * @constructor The constructor of this component has two dependencies: the DatabaseService and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   */
  constructor(private dbService: DatabaseService, private router: Router){}

  /** 
   * @summary A physician object is created based on the form inputs and is submitted to be stored in the MongoDB database.
   * @description onSubmit is triggered when the html form is submitted and the physician object is created and sent to the DatabaseService to add it to the MongoDB database.
  */
  onSubmit = async(form: any) => {
    let obj = {
      "physician_firstName": form.value.physician_firstName,
      "physician_lastName": form.value.physician_lastName,
      "birth_date": form.value.birth_date,
      "department": form.value.department
    }

    console.log("physician obj:", obj)

    this.dbService.addPhysician(obj).subscribe({
      next: (result) => {
        // Successful response
        this.router.navigate(['/list-physician']);
      },
      error: (error) => {
        // Error handling
        console.error('Error:', error);
        this.router.navigate(['/invalid-data']);
      }
    })
  }
}
