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
  pages:String[]=["depot","fournisseur","client","article","famille",'achat_bon_cmd'];
  constructor(private route:ActivatedRoute,private router: Router) { }
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageName = this.route.snapshot.paramMap.get('pageName');
    if(this.id){
      this.checkId(this.id);
    }
    if(this.pageName){
      this.checkName(this.pageName)
    }
  }
  checkId(id: string) {
    for (let i of id) {
      if (!(i >= '0' && i <= '99999')) {
        console.log("id problem")
        break;
      }
    }
  }
  checkName(pageName:string){
    for (let i of pageName) {
      if (!((i.toLowerCase() >= 'a' && i.toLowerCase() <= 'z')||i=='_')) {
        this.router.navigateByUrl("/");
        break;
      }
    }
  }
  navigateToPage(pageName:string) {
    this.router.navigate(['ste',this.id,'page',pageName]);
    this.pageName=pageName;
  }

}


