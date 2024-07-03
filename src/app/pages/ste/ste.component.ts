import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ste',
  templateUrl: './ste.component.html',
  styleUrl: './ste.component.scss'
})
export class SteComponent {
  id:any;
  pageName:any;
  pages:String[]=["depot","fournisseur","client","article","famille"];
  constructor(private route:ActivatedRoute,private router: Router) { }
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageName = this.route.snapshot.paramMap.get('pageName');
    if(this.id){
      this.checkId(this.id);
    }
    if(this.pageName){
      //alert('Page Name:'+ this.pageName);
    }
  }
  checkId(id: string) {
    for (let i of id) {
      if (!(i >= '0') && !(i <= '9')) {
        console.log("id problem")
        break;
      }
    }
  }
  checkName(pageName:string){
    for (let i of pageName) {
      if (i.toLowerCase() >= 'a' && i.toLowerCase() <= 'z') {
        this.router.navigateByUrl("/");
        break;
      }
      if(!(pageName in this.pages)){
        this.router.navigateByUrl("/");
        console.log(pageName + "Not Exist")
        break;
      }
    }
  }
  navigateToPage(pageName:string) {
    this.router.navigate(['ste',this.id,'page',pageName]);
    this.pageName=pageName;
  }

}


