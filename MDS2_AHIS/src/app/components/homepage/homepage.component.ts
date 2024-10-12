/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents the main homepage component for homepage feature
*/ 

import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent {
  title = 'AHIS';
  imageUrl: string = '../assets/images/banner-sample.jpg';
}
