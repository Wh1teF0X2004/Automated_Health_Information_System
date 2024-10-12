/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a view patient component for patient feature
*/ 

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DateFormatPipe]
})

export class ViewPatientComponent {
  // Database
  patientDB: any[] = [];
  // Unique id for patient
  id: string | null = "";
  // Patient Object
  aPatient: any = {};
  
  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  /**
   * @function ngOnInit runs when the component is initiated
   * @description calls various methods to fetch patient records
   */
  ngOnInit() {
    this.getIdPatient();
    this.getPatientRecord();
  }

  /**
   * @function getIdPatient Retrieves the patientId from the URL route parameters and assigns it to a variable to be used later
   * @description Retrieves the patientId from the URL route parameters and assigns it to a variable to be used later
   */
  getIdPatient(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('patientId');
      console.log("Get Patient ID: ", this.id );
    })
  }

  /**
   * @function getPatientRecord Fetches all patients from the database using the DatabaseService
   * @description Fetches all patients from the database using the DatabaseService
   * @summary It looks for the patient that matches the ID retrieved from the route and save it to a variable to be used later
   */
  getPatientRecord(){
    this.dbService.getPatients().subscribe((patientDB: any) => {
      console.log("Get Patient Id record", this.id)
      for (let patient of patientDB){
        if (patient.patientId === this.id) {
          this.aPatient = patient;
          console.log("Patient Record",this.aPatient)
          console.log(" Patient appoinmtment list : ", this.aPatient.appointmentList )
        }
      }
    });
  }

  /**
   * @function viewSelectedAppointment Navigates to the detailed view of a specific appointment by using its appointment_id
   * @description Navigates to the detailed view of a specific appointment by using its appointment_id
   * @param appointment_id The unique ID of the selected appointment
   */
  viewSelectedAppointment(appointment_id: string) {
    this.router.navigate(['/display-appointment', appointment_id]);
  }

  /**
   * @function viewSelectedDiagnosis Navigates to the detailed view of a specific diagnosis by using its diagnosisId
   * @description Navigates to the detailed view of a specific diagnosis by using its diagnosisId
   * @param diagnosisId The unique ID of the selected diagnosis
   */
  viewSelectedDiagnosis(diagnosisId: string) {
    this.router.navigate(['/view-diagnosis', diagnosisId]);
  }

  /**
   * @function sendDiagnosisId Sends a request to delete a diagnosis from the database using the diagnosisId
   * @description Sends a request to delete a diagnosis from the database using the diagnosisId. After deletion, it fetches the updated patient records to reflect the changes
   * @param diagnosisId The unique ID of the diagnosis to be deleted
   */
  sendDiagnosisId(diagnosisId: string){
    this.dbService.deleteDiagnosis(diagnosisId).subscribe({
      next: (result) => {
        this.dbService.getPatients().subscribe((data:any) => {
          this.patientDB = data;
      });},
      error: (error) => { this.router.navigate(["/invalid-data"])}     
      })
  }

}
