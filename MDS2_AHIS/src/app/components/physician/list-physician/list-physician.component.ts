/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a list physician component for physician feature
*/ 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToUpperCasePipe } from 'src/app/pipes/to-upper-case.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@Component({
  selector: 'app-list-physician',
  templateUrl: './list-physician.component.html',
  styleUrls: ['./list-physician.component.css'],
  providers: [ToUpperCasePipe, DateFormatPipe]
})

export class ListPhysicianComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  physicianDB: any[] = [];

  /**
   * @constructor The constructor of this component has two dependencies: the DatabaseService and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   */
  constructor(private dbService: DatabaseService, private router: Router){}

  /**
   * @function onClick Logs the current physicianDB to the console
   * @summary Logs the current physicianDB to the console
   * @description This is mainly for debugging purposes to verify that the database has been populated
   */
  onClick() {
    console.log(this.physicianDB)
  }

  /**
   * @function onDelete deletes a physician record from the database based on the physician ID
   * @param id The ID of the physician to be deleted/removed from database
   * @description After successful deletion, it re-fetches the updated list of physicians from the database so the update/action is shown immediately
   */
  onDelete(id: string) {
    this.dbService.deletePhysicianById(id).subscribe(() => {
      this.dbService.getAllPhysician().subscribe((data: any) => {
        this.physicianDB = data
      })
    })
  }

  /**
   * @function ngOnInit fetches the list of all physicians from the database and assigns it to physicianDB
   */
  ngOnInit() {
    this.dbService.getAllPhysician().subscribe((data: any) => {
      this.physicianDB = data;
    });
    console.log(this.physicianDB)
  }

}
