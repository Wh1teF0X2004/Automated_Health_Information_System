/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents the web applications features that will appear for all pages
*/ 

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MDS2_AHIS';
  imageUrl: string = '../assets/images/banner-sample.png';
  showMenu: boolean = true;

  /**
   * @constructor The constructor of this component has one dependency: the Router
   * @param router Service used for navigation between components/pages
   * @description Listens for route changes and determines whether to show or hide the navigation menu
   * @summary Listens for route changes and determines whether to show or hide the navigation menu
   */
  constructor(private router: Router) {
    // Watch for changes in the route to hide or show the menu
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      // console.log("current url: ", currentUrl)
      // Check if the current page is either login or register
      if (currentUrl === '/login' || currentUrl === '/register' || currentUrl === '/' || currentUrl === '/admin-authentication') {
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
      // console.log("Boolean showMenu: ", this.showMenu)
    });
  }

  /**
   * @function openNav
   * @description Function to open the sidebar
   * @summary Function to open the sidebar
   */
  openNav() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.style.width = "250px";
    }
  }

  /**
   * @function closeNav
   * @description Function to close the sidebar
   * @summary Function to close the sidebar
   */
  closeNav() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.style.width = "0";
    }
  }
}
