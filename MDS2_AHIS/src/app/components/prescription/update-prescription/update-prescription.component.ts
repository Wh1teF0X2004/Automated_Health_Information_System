/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Update prescription component for prescription feature
*/ 

import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-prescription',
  templateUrl: './update-prescription.component.html',
  styleUrls: ['./update-prescription.component.css']
})

export class UpdatePrescriptionComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  prescription_id: string | null = ""; 

  // Database
  prescriptionDB: any[] = [];
  patientDB: any[] = [];
  medicationDB: any[] = [];
  physicianDB: any[] = [];

  // Details that can be updated
  newPrescription_specialinstructions: string | null = ""; 
  newPrescription_name: string | null = ""; 
  newPrescription_freqency = 0
  newPrescription_dosage = 0
  newPhysicianID: string | null = ""; 

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router){
    this.prescription_id = this.route.snapshot.paramMap.get('prescription_id');
    console.log("prescription id: ", this.prescription_id)
  }

  /**
   * @function ngOnInit runs when the component is initiated
   * @description Loads the prescription, patient, medication, and physician databases for use in the component
   */
  ngOnInit() {
    this.dbService.getAllPrescription().subscribe((data: any) => {
      this.prescriptionDB = data;
    });
    console.log(this.prescriptionDB)

    // Fetch physician from database and format their names for the dropdown
    this.dbService.getAllPhysician().subscribe((data: any) => {
      this.physicianDB = data.map((doctor: any) => ({
        physician_id: doctor.physician_id,
        name: `${doctor.physician_id} - ${doctor.physician_firstName} ${doctor.physician_lastName}`
      }));
    });
  }

  /**
   * @function selectPrescriptionButton Navigates the user to the Display prescription page, passing the prescription ID as a parameter
   * @description Navigates the user to the Display prescription page, passing the prescription ID as a parameter
   * @param prescription_id The ID of the selected prescription
   */
  selectPrescriptionButton(prescription_id: string){
    this.prescription_id = prescription_id
  }

  /**
   * @function updateButton Sends the updated prescription details to the DatabaseService for updating the database
   * @description Sends the updated prescription details to the DatabaseService for updating the database
   * @summary Creates an object with the prescription_id with the updated details and passes it to the update service
   */
  updateButton(){
    const obj = {
      prescription_id: this.prescription_id,
      prescription_specialinstructions: this.newPrescription_specialinstructions,
      prescription_freqency: this.newPrescription_freqency,
      prescription_dosage: this.newPrescription_dosage,
      physician_id: this.newPhysicianID
    }

    this.dbService.updatePrescription(obj).subscribe({
      next: (result) => {
        // Successful response
        console.log(obj)
        this.dbService.getAllPrescription().subscribe((data: any) => {
          this.prescriptionDB = data
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
