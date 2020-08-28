import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isArray } from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public Urls: string
  UrlListing: any = []
  public titles: any = []
  public loader: boolean = false
  public disableBton:boolean=false
  urls = [
    'https://jsonplaceholder.typicode.com/todos/1'
  ]//for dummy apis
  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  submitURLs() {
    if (this.Urls) {
      this.loader = true
      this.disableBton = true
      this.UrlListing = []
      this.titles = []
      this.UrlListing = this.Urls.split(',')
      this.checkUrls()
    }
  }

  getTitles = (url) => {
    return fetch(`https://cors-anywhere.herokuapp.com/${url}`)//to resolve CORS issue
      .then((response) => response.text())
      .then((html) => {
        console.log('working', html)
        console.log('working', html['title'])
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc.querySelectorAll('title')[0];
        if (title && title.innerText) {
          this.titles.push(title.innerText)
          this.titles.length == this.UrlListing.length ? this.loader = false : this.loader = true
          this.titles.length == this.UrlListing.length ? this.disableBton = false : this.disableBton = true
          return title.innerText;
        }
        else
        {
          this.disableBton = false
          this.loader=false
          alert('somethig Went Wrong')
        }
      });
  };

  // This one keeps the order the same as the URL list.
  checkUrls() {
    Promise.all(
      this.UrlListing.map((url) => {
        this.getTitles(url)
        this.loader = false
      }))
      .then((title) => {
        this.titles.length == this.UrlListing.length ? this.loader = false : this.loader = true
      })
  }
  //for local url hits
  // _getTitles = (url) => {
  //   return fetch(`${url}`)
  //     .then((response) => response.text())
  //     .then((html) => {
  //       let jsonObject = JSON.parse(html)
  //       console.log(jsonObject['title'])
  //       this.titles.push(jsonObject['title'])
  //       return jsonObject['title'];
  //     });
  // };
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
