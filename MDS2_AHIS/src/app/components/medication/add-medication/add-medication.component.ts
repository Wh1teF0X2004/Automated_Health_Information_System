/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Add medication component for medication feature
*/ 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.css']
})

export class AddMedicationComponent {
  imageUrl: string = '../assets/images/banner-sample.png';

  /**
   * @constructor The constructor of this component has two dependencies: the DatabaseService and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   */
  constructor(private dbService: DatabaseService, private router: Router){}

  /** 
   * @summary A medication object is created based on the form inputs and is submitted to be stored in the MongoDB database.
   * @description onSubmit is triggered when the html form is submitted and the medication object is created and sent to the DatabaseService to add it to the MongoDB database.
  */
  onSubmit = async(form: any) => {
    let obj = {
      "medicine_name": form.value.medicine_name,
      "medication_routeofadmission": form.value.medication_routeofadmission,
      "medication_concentration": form.value.medication_concentration,
      "medication_volume": form.value.medication_volume
    }

    console.log("medicine obj:", obj)

    this.dbService.addMedication(obj).subscribe({
      next: (result) => {
        // Successful response
        this.router.navigate(['/list-medication']);
      },
      error: (error) => {
        // Error handling
        console.error('Error:', error);
        this.router.navigate(['/invalid-data']);
      }
    })
  }
}
