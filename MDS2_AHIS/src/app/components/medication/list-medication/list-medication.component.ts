/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a list all medication component for medication feature
*/ 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToUpperCasePipe } from 'src/app/pipes/to-upper-case.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@Component({
  selector: 'app-list-medication',
  templateUrl: './list-medication.component.html',
  styleUrls: ['./list-medication.component.css'],
  providers: [ToUpperCasePipe, DateFormatPipe]
})

export class ListMedicationComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  medicationDB: any[] = [];

  /**
   * @constructor The constructor of this component has two dependencies: the DatabaseService and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   */
  constructor(private dbService: DatabaseService, private router: Router){}

  /**
   * @function onClick Logs the current medicationDB to the console
   * @summary Logs the current medicationDB to the console
   * @description This is mainly for debugging purposes to verify that the database has been populated
   */
  onClick() {
    console.log(this.medicationDB)
  }

  /**
   * @function onDelete deletes a medication record from the database based on the medication ID
   * @param id The ID of the medication to be deleted/removed from database
   * @description After successful deletion, it re-fetches the updated list of medication from the database so the update/action is shown immediately
   */
  onDelete(id: string) {
    this.dbService.deleteMedicationById(id).subscribe(() => {
      this.dbService.getAllMedication().subscribe((data: any) => {
        this.medicationDB = data
      })
    })
  }

  /**
   * @function ngOnInit fetches the list of all medication from the database and assigns it to medicationDB
   */
  ngOnInit() {
    this.dbService.getAllMedication().subscribe((data: any) => {
      this.medicationDB = data;
    });
    console.log(this.medicationDB)
  }

}
