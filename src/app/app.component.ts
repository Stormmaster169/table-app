import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Cow} from './models/cows.model';
import {ApiService} from './services/api.service';
import {FormControl, FormGroup} from "@angular/forms";
import {nextCowId} from './app.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'table-app';

  public tabData : Cow[] = [];

  private subscriptions: Subscription = new Subscription;

  public nextCowId: number = 0;

  form = new FormGroup({
    healthIndex: new FormControl(),
    endDate: new FormControl(),
    minValueDateTime: new FormControl(),
    type: new FormControl(),
    animalId: new FormControl(),
    eventId: new FormControl(),
    lactationNumber: new FormControl(),
    daysInLactation: new FormControl(),
    ageInDays: new FormControl(),
    startDateTime: new FormControl(),
    reportingDateTime: new FormControl(),
    alertType: new FormControl(),
    duration: new FormControl(),
    endDateTime: new FormControl(),
    daysInPregnancy: new FormControl(),
    heatIndexPeak: new FormControl(),
    newGroupId: new FormControl(),
    newGroupName: new FormControl(),
    currentGroupId: new FormControl(),
    currentGroupName: new FormControl(),
    destinationGroup: new FormControl(),
    destinationGroupName: new FormControl(),
    oldLactationNumber: new FormControl(),
    cowEntryStatus: new FormControl(),
    breedingNumber: new FormControl(),
    interval: new FormControl()
  });

  constructor(
    private apiService: ApiService,
  ) {}

  public ngOnInit () {
    this.subscriptions.add(this.apiService.getCows().subscribe(res => {
      this.tabData = res;
      this.nextCowId = nextCowId(res);
    }))
  }

  public ngOnDestroy () {
    this.subscriptions.unsubscribe;
  }

  public deleteCow(id: number) {
    this.subscriptions.add(this.apiService.deleteCow(id).subscribe(res => {
      this.tabData = res;
      this.nextCowId = nextCowId(res);
    }))
  }

  public createCow() {
    this.subscriptions.add(this.apiService.createCow(this.form.value).subscribe(res => {
      this.tabData = res;
      this.nextCowId = nextCowId(res);
      this.form.reset();
    }))
  }

  public updateCow(cow: Cow) {
    this.subscriptions.add(this.apiService.updateCow(cow).subscribe(res => {
      this.tabData = res;
    }))
  }
}
