// Import necessary modules from Angular core library
import { Pipe, PipeTransform } from '@angular/core';

// Define a new pipe with the name 'toUpperCase'
@Pipe({
  name: 'toUpperCase' // This is the pipe name used in templates
})

// The pipe class implements the PipeTransform interface
export class ToUpperCasePipe implements PipeTransform {

  /**
   * The transform method converts the input string to uppercase.
   * 
   * @param value The string to be transformed to uppercase
   * @param args Additional optional arguments (unused in this case)
   * @returns Transformed string in uppercase; if the input is undefined, it returns an empty string
   */
  transform(value: string, ...args: unknown[]): string {
    // Check if the value is undefined; return an empty string if so
    if (value === undefined){
      return "";
    }
    else {
      // Convert the string to uppercase
      let upperCase = value.toUpperCase();
      return upperCase;
    }
  }
}
