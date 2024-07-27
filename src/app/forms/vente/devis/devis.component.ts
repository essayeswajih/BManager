import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SteService } from '../../../apiServices/ste/ste.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrl: './devis.component.scss'
})
export class DevisComponent {
  event: any;


  supprimer(idArticle:Number) {
    this.bc.removeArticle(idArticle);
  }
  
  
    articleList: any[] = [];
    clientList: any[] = [];
    bonCommandeItems: any = [];
    bonCommandeForm = this.fb.group({
      client: ['0', Validators.required],
      article: ['0', Validators.required],
      date: [new Date(), Validators.required]
    });
    bc!: createDevis;
  
    constructor(private fb: FormBuilder, private steService: SteService,private toastr: ToastrService) { }
  
    ngOnInit() {
      this.getArticles();
      this.getClients();
      this.bc = new createDevis(this.bonCommandeForm.value, this.clientList, this.articleList, this.steService,this.toastr);
    }
    download() {
      this.bc.download();
    }
  
    async getArticles() {
      try {
        this.articleList = await this.steService.getArticles();
        console.log('Fetched articles:', this.articleList);
        this.bc.setArticleList(this.articleList);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
  
    async getClients() {
      try {
        this.clientList = await this.steService.getClients();
        this.bc.setClient(this.clientList[0]);
        console.log('Fetched clients:', this.clientList);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }
  
    formatDate(date: Date): string {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }
    ajouter() {
      console.log("x:",this.bonCommandeForm.value.article)
      this.bc.addArticle(this.bonCommandeForm.value.article,1,0)
    }
    change(key: string, event?: Event) {
      if (key === 'client') {
        const selectedIndex = Number((event?.target as HTMLSelectElement).value);
        this.bc.setClient(this.clientList[selectedIndex]);
      }
      else if(key=='dateCreation'){
        const selectedDate = (event?.target as HTMLSelectElement).value;
        const dateValue = selectedDate ? new Date(selectedDate) : null;
        this.bonCommandeForm.patchValue({
          date: dateValue
        });
        console.log("date:",this.bonCommandeForm.value)
        this.bc.setDateCreation(dateValue)
      }
      console.log(this.bc)
    }
  
    saveBonCommande() {
      this.bc.save();
    }
    change3(item: any,key: string,e:Event) {
      console.log("item",item)
      let value = Number((event?.target as HTMLSelectElement).value);
      if(value>0) {
        item[key]=value;
        if(key=='rem'){
          let r =(item.rem*0.01)*(item.venteHT*item['qte']);
          item['totalNet']=(item.venteHT*item['qte'])-r;
          item.totalTTC = item.totalNet + item.totalNet * item.tva / 100;
        }
        if(key=='qte'){
          let r =(item.rem*0.01)*(item.article.venteHT*value);
          item['totalNet']=(item.venteHT*value)-r;
          item.totalTTC = item.totalNet + item.totalNet * item.tva / 100;
        }
        if(key=='venteHT'){
          let r =(item["rem"]*0.01)*(value*item['qte']);
          item['totalNet']=(value*item['qte'])-r;
          item.totalTTC = item.totalNet + item.totalNet * item.tva / 100;
        }
      }
      this.bc.update(item);
    }
    save() {
      this.bc.save();
    }
  }
  
  
  class createDevis {
  
    private toastr2!: ToastrService;;
    private articlesList: any[] = [];
    private items: any[] = [];
    private client: any;
    private dateCreation: any;
    private steService: SteService;
    private id!:number;
    
  
    constructor(formValue: any, clientList: any[], articleList: any[], steService: SteService,toastr:ToastrService) {
      this.client = clientList[Number(formValue.client) || 0];
      this.articlesList = articleList;
      this.steService = steService;
      this.dateCreation = formValue.date;
      this.toastr2 = toastr;
    }
  
    addArticle(articleIndex: any, qte: number, rem: number) {
      console.log(this.articlesList)
      let itemCreated = this.createItem(this.articlesList[articleIndex], qte, rem);
      let exist = false;
      for (let item of this.items) {
        if (item.article.idArticle === this.articlesList[articleIndex].idArticle) {
          item = itemCreated;
          exist = true;
          this.toastr2.error('Erreur', 'Déjà Existe')
        }
      }
      if (!exist) {
        this.items.push(itemCreated);
      }
      console.log("exist",exist)
    }
  
    removeArticle(idArticle: any) {
      let items:any=[];
      for (let item of this.items) {
        if (item.article.idArticle !== idArticle) {
          items.push(item);
        }
      }
      this.items=items;
      console.log(this.items);
    }
  
    createItem(article: any, qte: number, rem: number) {
      console.log(article)
      let item: any = {};
      item.article = article;
      item.designation = article?.designation;
      item.unite = article?.unite;
      item.puht = article?.achatHT;
      item.venteHT = article.venteHT;  
      item.qte = qte || 1;
      item.rem = rem || 0;
      item.tva = article?.tva;
      item.totalNet = (article.venteHT - (article.venteHT * rem / 100)) * qte;
      item.totalTTC = item.totalNet + item.totalNet * item.tva / 100;
      return item;
    }
  
    getItems() {
      return this.items;
    }
  
    save() {
      let itemsList: any[] = this.getItems();
      let data: any = {
        client: { idClient: this.client.idClient },
        items: []
      };
      console.log("dgsdfdsf",itemsList)
      for (let i = 0; i < itemsList.length; i++) {
        data.items.push({
          article: { idArticle: itemsList[i].article.idArticle },
          qte: itemsList[i].qte,
          remise: itemsList[i].rem,
          newVenteHT:itemsList[i].venteHT,
          totalNet: itemsList[i].totalNet
        });
      }
      
      data.dateCreation = this.dateCreation;
      this.steService.saveDevis(data).then(
        (data:any)=>{
          if(data.status==200){
            console.log("xyz",data)
            this.id = data.data.id
          }
          console.log("xyzw",data)
        }
      );
      console.log("dataccc",data)
      
    }
    setArticleList(articles:any) {
      this.articlesList = articles;
    }
    setClient(client: any) {
      this.client=client;
    }
    setDateCreation(date:any){
      this.dateCreation=date;
    }
    update(item: any) {
      let itemsList: any[] = this.getItems();
      for(let i = 0; i<itemsList.length;i++){
        if(itemsList[i].article.idArticle==item.article.idArticle){
          itemsList[i]=item;
        }
      }
      console.log(item)
      console.log(this.items);
      this.items = itemsList;
      console.log(this.items);
    }
    getId(){
      return this.id;
    }
    download(): void {
      const filename = `devisVente${this.getId()}.pdf`; // Assuming this.getId() returns a valid identifier
  
      this.steService.downloadFile(filename)
        .then((data: ArrayBuffer) => {
          this.saveFile(data, filename); 
        })
        .catch(error => {
          console.error('Error downloading file:', error);
          // Handle error as needed
        });
    }
  
    private saveFile(data: ArrayBuffer, filename: string): void {
      const blob = new Blob([data], { type: 'application/pdf' });
  
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = filename;
  
      // Append the link to the body and simulate a click
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Clean up
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(downloadLink.href);
    }
  
  }
  
