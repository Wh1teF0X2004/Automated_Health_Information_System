/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a List diagnosis component for diagnosis feature
*/ 

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-diagnosis',
  templateUrl: './list-diagnosis.component.html',
  styleUrls: ['./list-diagnosis.component.css']
})

export class ListDiagnosisComponent {
  diagnosisDB: any[] = [];

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  /**
   * @function ngOnInit run when component is initiates
   * @description called the function listen2diagnosiss to fetch diagnosis data from the DatabaseService
   */
  ngOnInit() {
    this.listen2diagnosiss();
  }

  /**
   * @function listen2diagnosiss fetch diagnosis data from the DatabaseService and store it in a variable so it can be accessed anytime
   * @description This function fetches diagnosis data from the DatabaseService and store it in a variable so it can be accessed anytime
   */
  listen2diagnosiss(){
    this.dbService.getDiagnosis().subscribe((data:any) => {
      this.diagnosisDB = data;
    });
  }

  /**
   * @function viewSelectedDiagnosis navigates to the view-diagnosis component with the diagnosisId parsed as route prarameter
   * @param diagnosisId The ID of the diagnosis to be viewed
   * @description This function navigates to the view-diagnosis component with the diagnosisId parsed as route prarameter
   */
  viewSelectedDiagnosis(diagnosisId: string){
    this.router.navigate(['/view-diagnosis', diagnosisId])
  }

  /**
   * @function updateDiagnosis navigates to the update-diagnosis component with the diagnosisId parsed as route prarameter
   * @param diagnosisId The ID of the diagnosis to be updated
   * @description This function navigates to the update-diagnosis component with the diagnosisId parsed as route prarameter
   */
  updateDiagnosis(diagnosisId: string){
    console.log("Update button submit")
    this.router.navigate(['/update-diagnosis', diagnosisId])
  }

  /**
   * @function sendDiagnosisId deletes a diagnosis record from the database based on the diagnosis ID
   * @param diagnosisId The ID of the diagnosis to be deleted/removed from database
   * @description After successful deletion, it re-fetches the updated list of diagnosis from the database so the update/action is shown immediately
   */
  sendDiagnosisId(diagnosisId: string){
    this.dbService.deleteDiagnosis(diagnosisId).subscribe({
      next: (result) => { 
        this.dbService.getDiagnosis().subscribe((data:any) => {
          this.diagnosisDB = data;
      });},
      error: (error) => { this.router.navigate(["/invalid-data"])}     
     })
  }
}
