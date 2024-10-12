/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Display medication detail component for medication feature
*/ 

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToUpperCasePipe } from 'src/app/pipes/to-upper-case.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@Component({
  selector: 'app-display-medication',
  templateUrl: './display-medication.component.html',
  styleUrls: ['./display-medication.component.css'],
  providers: [ToUpperCasePipe, DateFormatPipe]
})

export class DisplayMedicationComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  // Medication ID
  medication_id: string | null = ""; 
  objectId: string | null = ""; 
  // Medication Details
  medicine_name: string = ""
  medication_routeofadmission: string = ""
  medication_concentration = 0
  medication_volume = 0
  // Database
  medicationDB: any[] = [];
  patientDB: any[] = [];
  prescriptionDB: any[] = [];

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) {
    this.medication_id = this.route.snapshot.paramMap.get('medication_id');
    console.log("med id: ", this.medication_id)
  }

  /**
   * @function ngOnInit runs when the component is initiated
   * @description Fetches all medication records from the database and searches for a matching medication by ID
   */
  ngOnInit(){
    this.dbService.getAllMedication().subscribe((data: any) => {
      console.log("here !!!")
      if (data && data.length > 0) {
        console.log("here 0")
        const matchingMedication = data.find((med: any) => med.medication_id === this.medication_id);
        console.log("FOUND matching medication: ", matchingMedication)
        if (matchingMedication) {
          this.objectId = matchingMedication._id
          this.medication_id = matchingMedication.medication_id
          this.medicine_name = matchingMedication.medicine_name
          this.medication_routeofadmission = matchingMedication.medication_routeofadmission
          this.medication_concentration = matchingMedication.medication_concentration
          this.medication_volume = matchingMedication.medication_volume
        } else {
          console.log("here 1")
          this.router.navigate(['/invalid-data']);
        }
      }
      else {
        console.log("here 2")
        this.router.navigate(['/invalid-data']);
      }
    })
  }

}
