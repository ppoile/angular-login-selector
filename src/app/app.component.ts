import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  model = {
    allLogins: [
      'Dover',
      'London',
      'London Kraftwerk',
    ],
    selectedLogins: { },
  };
  showNoLoginsAsString = '';
  showAllLoginsAsString: string;
  showLoginsDefaultAsString: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.model.allLogins.sort();
    this.showAllLoginsAsString = this.model.allLogins.join(',');
    this.showLoginsDefaultAsString = this.showAllLoginsAsString;

    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      console.log('activatedRoute.queryParamMap:');
      console.log(queryParams);
      this.parseQueryParams(queryParams);
    });
  }

  parseQueryParams(params: ParamMap) {
    console.log('parseQueryParams:');
    let showLogins = params.get('showLogins');
    if (showLogins === null) {
      showLogins = this.showLoginsDefaultAsString;
    }
    else if (showLogins === 'All') {
      showLogins = this.showAllLoginsAsString;
    }
    this.selectNone();
    for (let login of showLogins.split(',')) {
      if (login === '')
        continue;
      this.model.selectedLogins[login] = true;
    }
  }

  selectNone() {
    console.log('selecting none');
    for (let login of this.model.allLogins) {
      this.model.selectedLogins[login] = false;
    }
  }

  onAll() {
    console.log('onAll:');
    this.updateShowLoginsParameter(this.showAllLoginsAsString);
  }

  onNone() {
    console.log('onNone:')
    this.updateShowLoginsParameter(this.showNoLoginsAsString);
  }

  onGroupChange(event) {
    console.log('onGroupChange:');
    let showLoginsAsString = event.value.sort().join(',');
    console.log(`showLogins='${showLoginsAsString}'`);
    this.updateShowLoginsParameter(showLoginsAsString);
  }

  updateShowLoginsParameter(value) {
    console.log('updateShowLoginsParameter:')
    console.log(value)
    if (value === this.showLoginsDefaultAsString) {
      value = null;
    }
    let extras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { showLogins: value },
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['dashboard'], extras);
  }
}
