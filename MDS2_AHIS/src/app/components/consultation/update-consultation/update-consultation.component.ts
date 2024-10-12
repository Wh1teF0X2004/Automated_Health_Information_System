/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents an update consultation component for consultation feature
*/ 

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

/**
 * @interface Consultation
 * @description Define the Consultation interface, which describes the structure of a Consultation object
 */
interface Consultation {
  physicianId: string;
  consultationId: string | null;
  other: string;
  patientSymptom: string;
  patientId: string | null;
}

@Component({
  selector: 'app-update-consultation',
  templateUrl: './update-consultation.component.html',
  styleUrls: ['./update-consultation.component.css']
})

export class UpdateConsultationComponent {

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  // Generate new consultation object
  consultation: Consultation = {
    physicianId: "",
    patientId: "",
    consultationId: "",
    other: "",
    patientSymptom: ""
  };

  id: string | null = "";
  patientDB: any[] = [];
  aPatient: any = {};
  consultationDB: any[] = [];
  physicianDB: any[] = [];
  aPhysician: any = {};
  aConsultation: any = {};

  /**
   * @function ngOnInit fetches consultation, patient, and physician data, and retrieves records for the selected consultation
   * @summary Fetches consultation, patient, and physician data, and retrieves records for the selected consultation
   * @description Fetches consultation, patient, and physician data, and retrieves records for the selected consultation
   */
  ngOnInit() {
    this.getconsultationId();
    this.getConsultationRecord();
    this.getPatientRecord();
    this.getPhysicianRecord();

  }

  /**
   * @function getconsultationId function fetch the consultation ID from the route
   * @summary Fetch the consultation ID from the route for it to be access later
   * @description Fetch the consultation ID from the route for it to be access later
   */
  getconsultationId(){
    this.route.paramMap.subscribe(params => {
      this.consultation.consultationId = params.get('consultationId');
      console.log("Get consultation Id to update consultation: ", this.consultation.consultationId  );
    })
  }

  /**
   * @function getConsultationRecord function fetch the consultation records from the MongoDB database 
   * @summary Fetch the consultation records from the MongoDB database using the consultation ID and store it in a variable to be access later
   * @description Fetch the consultation records from the MongoDB database using the consultation ID and store it in a variable to be access later
   */
  getConsultationRecord(){
    this.dbService.getConsultations().subscribe((consultationDB: any) => {
      console.log("Get consultation Id record", this.consultation.consultationId )
      for (let consultation of consultationDB){
        if (consultation.consultationId === this.consultation.consultationId ) {
          this.aConsultation = consultation;
          console.log("consultation Record",this.aConsultation)
          // Updates the component’s patient fields with the corresponding values from this.aPatient to have it appear 
          //  automatically in the form.
          this.consultation.other = this.aConsultation.other;
          this.consultation.patientSymptom = this.aConsultation.patientSymptom;
        }
      }
    });
  }

  /**
   * @function getPatientRecord function fetch the Patient records from the MongoDB database 
   * @summary Fetch the Patient records from the MongoDB database using the consultation object and store it in a variable to be access later
   * @description Fetch the Patient records from the MongoDB database using the consultation object and store it in a variable to be access later
   */
  getPatientRecord(){
    this.dbService.getPatients().subscribe((patientDB: any) => {
      this.consultation.patientId = this.aConsultation.patientId;
      console.log("Get Patient Id record",this.consultation.patientId)
      for (let patient of patientDB){
        if (patient.patientId === this.consultation.patientId) {
          this.aPatient = patient;
          console.log("Patient Record",this.aPatient)
        }
      }
    });
  }

  /**
   * @function getPhysicianRecord function fetch the Physician records from the MongoDB database 
   * @summary Fetch the Physician records from the MongoDB database using the consultation object and store it in a variable to be access later
   * @description Fetch the Physician records from the MongoDB database using the consultation object and store it in a variable to be access later
   */
  getPhysicianRecord(){
    // Fetch physicians from database and format their names for the dropdown
    this.dbService.getAllPhysician().subscribe((physicianDB: any) => {
      this.consultation.physicianId = this.aConsultation.physicianId;
      for (let dr of physicianDB){
        if (dr.physician_id === this.consultation.physicianId) {
          this.aPhysician = dr;
          console.log("physician Record",this.aPhysician)
        }
      }
    });
  }

  /**
   * @function sendUpdateConsultation Sends the updated consultation object to the backend via the DatabaseService, and navigates to the view-consultation page
   * @description Sends the updated consultation object to the backend via the DatabaseService, and navigates to the view-consultation page
   */
  sendUpdateConsultation(){
    console.log("Send consultation object for update",this.consultation)
    this.dbService.updateConsultation(this.consultation).subscribe({
      next: (result) => {this.router.navigate(["/view-consultation", this.consultation.consultationId])},
      error: (error) => { this.router.navigate(["/invalid-data"])}     
     })
  }

}
