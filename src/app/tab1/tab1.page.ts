import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { ToastController, LoadingController } from '@ionic/angular';
import { Tab2Page } from '../tab2/tab2.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  visible : boolean = false;
  newsFeed: any = [];
  searchControl: FormControl;
  searching: any = false;
  searchTerm: string = "";

constructor(private dataService: DataService, private toast: ToastController, private loadingCtrl: LoadingController) {
    this.searchControl = new FormControl();
  }

onSearchInput(){
    this.searching = true;
}


async presentLoadingCustom() {
  let loading = await this.loadingCtrl.create({
    spinner: 'bubbles'
  });
  await loading.present();
  setTimeout(() => {
    this.newsFeed = this.dataService.newsFeed;
    console.log(this.newsFeed)
    loading.dismiss();
  }, 2000);

}


ngOnInit() {
  this.presentLoadingCustom();



  this.setFilteredItems("");

  this.searchControl.valueChanges
    .pipe(debounceTime(700))
    .subscribe(search => {
      this.setFilteredItems(search);
      this.searching = false;
    });
}

setFilteredItems(searchTerm) {
  this.newsFeed = this.dataService.filterItems(searchTerm);
}


  hideWelcome(){
    this.visible = true;
    console.log('inFunction');
  }

  doRefresh(event) {
    console.log('Begin async operation');

    this.dataService.newStatus({
      userName: 'Stephanie Wehner',
      imgUrl:   'assets/quantum.jpg',
      status:   'Casually figuring out quantum computing #womenInIT #womensday',
      readLater: false
    })
    this.dataService.getNewsFeed();
    

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.newsFeed = this.dataService.newsFeed
      this.newsFeed.reverse();
    }, 3000);
  }

  markAsReadLater(index){
    if(this.newsFeed[index].readLater == false){
      this.newsFeed[index].readLater = true;
      this.dataService.updateStatus(this.newsFeed[index],this.newsFeed[index].ID)
      //
    } else {
      this.newsFeed[index].readLater = false;
      this.dataService.updateStatus(this.newsFeed[index],this.newsFeed[index].ID)
    }
    this.newsFeed = this.dataService.newsFeed;   
    this.presentToast();
    console.log(this.newsFeed);
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Marked as Read Later',
      duration: 2000,
      color: "primary"
    });
    toast.present();
  }
}
