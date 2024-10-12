/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a List patient component for patient feature
*/ 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})

export class ListPatientComponent {
  // Database
  patientDB: any[] = [];

  /**
   * @constructor The constructor of this component has two dependencies: the DatabaseService and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   */
  constructor(private dbService: DatabaseService, private router: Router){}
  
  /**
   * @function ngOnInit run when component is initiates
   * @description called the function listen2patients to fetch patient data from the DatabaseService
   */
  ngOnInit() {
    this.listen2patients();
  }

  /**
   * @function listen2patients fetch patient data from the DatabaseService and store it in a variable so it can be accessed anytime
   * @description This function fetches patient data from the DatabaseService and store it in a variable so it can be accessed anytime
   */
  listen2patients(){
    this.dbService.getPatients().subscribe((data:any) => {
      this.patientDB = data;
    });
  }

  /**
   * @function viewPatient navigates to the view-patient component with the patientId parsed as route prarameter
   * @param patientId The ID of the patient to be viewed
   * @description This function navigates to the view-patient component with the patientId parsed as route prarameter
   */
  viewPatient(patientId: string){
    this.router.navigate(['/view-patient', patientId])
  }

  /**
   * @function viewPatient navigates to the update-patient component with the patientId parsed as route prarameter
   * @param patientId The ID of the patient to be updated
   * @description This function navigates to the update-patient component with the patientId parsed as route prarameter
   */
  updatePatient(patientId: string){
    console.log("Update button submit")
    this.router.navigate(['/update-patient', patientId])
  }

  /**
   * @function sendPatientId deletes a patient record from the database based on the patient ID
   * @param patientId The ID of the patient to be deleted/removed from database
   * @description After successful deletion, it re-fetches the updated list of patient from the database so the update/action is shown immediately
   */
  sendPatientId(patientId: string){
    this.dbService.deletePatient(patientId).subscribe({
      next: (result) => { 
        this.dbService.getPatients().subscribe((data:any) => {
          this.patientDB = data;
      });},
      error: (error) => { 
        console.log("error", error)
        this.router.navigate(["/invalid-data"])}     
     })
  }

  addPatient(){
    this.router.navigate(['/add-patient'])
  }

}
