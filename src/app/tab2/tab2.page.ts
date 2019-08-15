import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { Platform} from '@ionic/angular';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  marked: any = [];

  constructor(private dataService: DataService, private platform:Platform, private toast: ToastController, private loadingCtrl: LoadingController) {
    this.dataService.getReadLater();

  }

  async presentLoadingCustom() {
    let loading = await this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    await loading.present();
    setTimeout(() => {      
      this.marked = this.dataService.marked;
      console.log(this.marked)
      loading.dismiss();
    }, 2000);
  }

  ngOnInit() {
    this.presentLoadingCustom();

  }

  createMarkedList(){
    for(var i=0; i < this.dataService.newsFeed.length; i++){
      if(this.dataService.newsFeed[i].readLater == true){
        this.marked.unshift(this.dataService.newsFeed[i]);
      }
    }
    console.log('marking')
    console.log(this.marked);
  }

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      setTimeout(() => {      
        this.marked = this.dataService.marked;
        console.log(this.marked)
      }, 2000);
    }, 2000);
  }

  markAsReadLater(index){   
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'This post is now read',
      duration: 2000,
      color: "primary"
    });
    toast.present();
  }
  
}
