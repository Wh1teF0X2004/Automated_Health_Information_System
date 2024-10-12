/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Update medication component for medication feature
*/ 

import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-medication',
  templateUrl: './update-medication.component.html',
  styleUrls: ['./update-medication.component.css']
})

export class UpdateMedicationComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  medication_id: string | null = ""; 
  // Database
  medicationDB: any[] = [];
  // Details that can be updated
  newMedicationRouteOfAdmission: string | null = ""; 

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router){
    this.medication_id = this.route.snapshot.paramMap.get('medication_id');
    console.log("med id: ", this.medication_id)
  }

  /**
   * @function ngOnInit runs when the component is initiated
   * @description Fetches all medication records from the database 
   */
  ngOnInit() {
    this.dbService.getAllMedication().subscribe((data: any) => {
      this.medicationDB = data;
    });
    console.log(this.medicationDB)
  }

  /**
   * @function selectMedicationButton obtain the selected medication ID when a user selects a medication to update
   * @description Sets the selected medication ID when a user selects a medication to update
   * @param medication_id ID of the medication to be updated
   */
  selectMedicationButton(medication_id: string){
    this.medication_id = medication_id
  }

  /**
   * @function updateButton Sends and save the updated medication information to the database service
   * @description Sends and save the updated medication information to the database service
   */
  updateButton(){
    const obj = {
      medication_id: this.medication_id,
      medication_routeofadmission: this.newMedicationRouteOfAdmission,
    }

    this.dbService.updateMedication(obj).subscribe({
      next: (result) => {
        // Successful response
        console.log(obj)
        this.dbService.getAllMedication().subscribe((data: any) => {
          this.medicationDB = data
        })
      },
      error: (error) => {
        // Error handling
        console.log(obj)
        console.error('Error:', error);
        this.router.navigate(['/invalid-data']);
      }
    })
  }
}
