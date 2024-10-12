/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a List consultation component for consultation feature
*/ 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-consultation',
  templateUrl: './list-consultation.component.html',
  styleUrls: ['./list-consultation.component.css']
})

export class ListConsultationComponent {
  consultationDB: any[] = [];

  /**
   * @constructor The constructor of this component has two dependencies: the DatabaseService and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   */
  constructor(private dbService: DatabaseService, private router: Router){}
  
  /**
   * @function ngOnInit run when component is initiates
   * @description called the function listen2consultations to fetch consultation data from the DatabaseService
   */
  ngOnInit() {
    this.listen2consultations();
  }

  /**
   * @function listen2consultations fetch consultation data from the DatabaseService and store it in a variable so it can be accessed anytime
   * @description This function fetches consultation data from the DatabaseService and store it in a variable so it can be accessed anytime
   */
  listen2consultations(){
    this.dbService.getConsultations().subscribe((data:any) => {
      this.consultationDB = data;
    });
  }

  /**
   * @function viewConsultation navigates to the view-consultation component with the consultationId parsed as route prarameter
   * @param consultationId The ID of the consultation to be viewed
   * @description This function navigates to the view-consultation component with the consultationId parsed as route prarameter
   */
  viewConsultation(consultationId: string){
    this.router.navigate(['/view-consultation', consultationId])
  }

  /**
   * @function updateConsultation navigates to the update-consultation component with the consultationId parsed as route prarameter
   * @param consultationId The ID of the consultation to be updated
   * @description This function navigates to the update-consultation component with the consultationId parsed as route prarameter
   */
  updateConsultation(consultationId: string){
    console.log("Update button submit")
    this.router.navigate(['/update-consultation', consultationId])
  }

  /**
   * @function sendConsultationId deletes a consultation record from the database based on the consultation ID
   * @param consultationId The ID of the consultation to be deleted/removed from database
   * @description After successful deletion, it re-fetches the updated list of consultation from the database so the update/action is shown immediately
   */
  sendConsultationId(consultationId: string){
    this.dbService.deleteConsultation(consultationId).subscribe({
      next: (result) => { 
        this.dbService.getConsultations().subscribe((data:any) => {
          this.consultationDB = data;
      });},
      error: (error) => { this.router.navigate(["/invalid-data"])}     
     })
  }

}
