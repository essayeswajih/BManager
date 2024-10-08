import { Injectable } from '@angular/core';
import { AxiosService } from './../axios/axios.service';
import { Console, error } from 'console';
import { catchError, Observable } from 'rxjs';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SteService {

  idSte: number = 53;
  ste: any;
  
  constructor(private axios: AxiosService,private tstr : ToastrService) {}

  async getSte(id: number): Promise<any> {
    try {
      const response = await this.axios.get('ste/' + id);
      if (response.status === 200) {
        this.idSte = response.data.id;
        this.ste = response.data;
        return response.data;
      } else {
        throw new Error("E1 " + response.data);
      }
    } catch (error) {
      console.log("STE SERVER INTERNAL ERROR", error);
    }
  }

  async getDepots(): Promise<any> {
    try {
      const response = await this.axios.get("depot/ste/"+this.idSte);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("Depots SERVER INTERNAL ERROR", error);
    }
  }
  async saveDepots(depot:any){
    depot.ste={ idSte: this.idSte };
    console.log("depot",depot)
    try {
      const response = await this.axios.post("depot/save", depot);
      if (response.status === 200) {
        return response.data;
      }
      else{
        return response.data;
      }
    }catch(error){
      return error;
    }
  }
  async saveAllDepots(depotsUpdated: any[]) {

    console.log("depots",depotsUpdated)
    try {
      const response = await this.axios.post("depot/saveAll", depotsUpdated);
      if (response.status === 200) {
        return response.data;
      }
      else{
        return response.data;
      }
    }catch(error){
      return error;
    }
  }
  async deleteDepots(id:number){
    try {
      const response = await this.axios.delete("depot/delete/"+id);
      return true;
    }catch{
      return false;
    }
  }
  async getFamilles(): Promise<any> {
    try {
      const response = await this.axios.get("famille/ste/"+this.idSte);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("famille SERVER INTERNAL ERROR", error);
    }
  }
  async saveFamille(famille:any){
    famille.ste={ idSte: this.idSte };
    console.log("famille",famille)
    try {
      const response = await this.axios.post("famille/save", famille);
      if (response.status === 200) {
        return response.data;
      }
    }catch(error){
      console.log(error);
    }
  }
  async saveAllFamille(depotsUpdated: any[]) {
    console.log("famille",depotsUpdated)
    try {
      const response = await this.axios.post("famille/saveAll", depotsUpdated);
      if (response.status === 200) {
        return response.data;
      }
      else{
        return response.data;
      }
    }catch(error){
      return error;
    }
  }
  async deleteFamille(id:number){
    try {
      const response = await this.axios.delete("famille/delete/"+id);
      return true;
    }catch{
      return false;
    }
  }
  async getArticles(): Promise<any> {
    try {
      const response = await this.axios.get("articles/ste/"+this.idSte);
      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("Articles SERVER INTERNAL ERROR", error);
    }
  }
  async saveArticles(article:any){
    article.ste={ idSte: this.idSte };
    console.log("article",article)
    try {
      const response = await this.axios.post("articles/save", article);
      if (response.status === 200) {
        return response.data;
      }
      else{
        return response.data;
      }
    }catch(error){
      return error;
    }
  }
  async saveAllArticle(depotsUpdated: any[]) {
    console.log("article",depotsUpdated)
    try {
      const response = await this.axios.post("articles/saveAll", depotsUpdated);
      if (response.status === 200) {
        return response.data;
      }
      else{
        return response.data;
      }
    }catch(error){
      return error;
    }
  }
  async deleteArticle(id:number){
    try {
      const response = await this.axios.delete("articles/delete/"+id);
      return true;
    }catch{
      return false;
    }
  }
  async getFournisseurs(): Promise<any> {
    try {
      const response = await this.axios.get("fournisseur/ste/"+this.idSte);
      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("fournisseur SERVER INTERNAL ERROR", error);
    }
  }
  async saveFournisseur(fournisseur:any){
    fournisseur.ste={ idSte: this.idSte };
    console.log("fournisseur",fournisseur)
    try {
      const response = await this.axios.post("fournisseur/save", fournisseur);
      if (response?.status === 200) {
        this.tstr.success('Fournisseur added successfully !!.',"Success");
        return response.data;
      }
      else{
        this.tstr.error('Cant Add this Fournisseur !!.',"ERROR");
        return response.data;
      }
    }catch(error){
      this.tstr.error('Cant Add this Fournisseur !!.',"ERROR");
      return error;
    }
  }
  async saveAllFournisseurs(fournisseursUpdated: any[]) {

    console.log("fournisseurs",fournisseursUpdated)
    try {
      const response = await this.axios.post("fournisseur/saveAll", fournisseursUpdated);
      if (response.status === 200) {
        return response.data;
      }
      else{
        return response.data;
      }
    }catch(error){
      return error;
    }
  }
  async deleteFournisseur(id:number){
    try {
      const response = await this.axios.delete("fournisseur/delete/"+id);
      return true;
    }catch{
      return false;
    }
  }
  async getClients(): Promise<any> {
    try {
      const response = await this.axios.get("clients/ste/"+this.idSte);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("fournisseur SERVER INTERNAL ERROR", error);
    }
  }
  async saveClients(client:any){
    client.ste={ idSte: this.idSte };
    console.log("fournisseur",client)
    try {
      const response = await this.axios.post("clients/save", client);
      if (response.status === 200) {
        this.tstr.success('Client added successfully !!.',"Success");
        return response.data;
      }
    }catch(error){
      this.tstr.error('Cant Add this Client !!.',"ERROR");
      return error;
    }
  }
  async saveAllClients(fournisseursUpdated: any[]) {

    console.log("fournisseurs",fournisseursUpdated)
    try {
      const response = await this.axios.post("clients/saveAll", fournisseursUpdated);
      if (response.status === 200) {
        return response.data;
      }
      else{
        return response.data;
      }
    }catch(error){
      return error;
    }
  }
  async deleteClients(id:number){
    try {
      const response = await this.axios.delete("clients/delete/"+id);
      return true;
    }catch{
      return false;
    }
  }
  async getAllBonCmdA(): Promise<any> {
    try {
      const response = await this.axios.get("achat/bonCmd/ste/"+this.idSte);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("BonCommande SERVER INTERNAL ERROR", error);
    }
  }
  async saveBonCommande(data:any){
    data.ste={ idSte: this.idSte };
    console.log("BonCommande",data)
    try {
      const response = await this.axios.post("achat/bonCmd/save", data);
      if (response.status === 200) {
        this.toPdf("achat/bonCmd/toPdf",response.data)
        return response.data;
      }
      else{
        return response.data;
      }
    }catch(error){
      return error;
    }
  }
  async deleteBonCommande(id:number){
    try {
      const response = await this.axios.delete("achat/bonCmd/delete/"+id);
      return true;
    }catch{
      return false;
    }
  }
  async toPdf(url:string,data:any){
    try {
      const response = await this.axios.post(url, data);
      if (response.status === 200) {
        return response.data;
      }
      else{
        return null;
      }
    }catch(error){
      return error;
    }
  
  }
  async downloadFile(url: string): Promise<ArrayBuffer> {
    const downloadUrl = `/files/${url}`
   const response = await this.axios.getFile(downloadUrl);
    return response.data;
  }
  async genererBonLiv(bon: any){
    try {
      const response = await this.axios.post("achat/bonLiv/save", bon);
      if (response.status === 200) {
        return response.data;
      }
    }catch(error){
      return error;
    }
  }
  async getBonLivA(){
    let id =this.idSte;
    try{
      return await this.axios.get("achat/bonLiv/ste/"+id);
    }catch(error){
      return error;
    } 
  }
  genererFactureA(bonLivSelected: any[],date:any){
    let data :any = {};
    data.ste = {idSte :this.idSte};
    data.bonLivAS = bonLivSelected;
    data.dateCreation = date;
    this.axios.post("achat/facture/save",data).then(
      (response) => {
        if(response.status == 200){
          this.tstr.success('Facture générée avec succès');
          this.tstr.info('wiat for your PDF',"INFO");
          let fillename = `factureAchat${response.data?.id}.pdf`
          this.download(fillename);
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }
  async deleteBonLivA(idBonLiv: any) {
    try{
      return await this.axios.delete("achat/bonLiv/delete/"+idBonLiv);
    }catch(error){
      return error;
    }
  }
  async saveDevis(data:any){
    data.ste={ idSte: this.idSte };
    console.log(data);
    try{
      return await this.axios.post("vente/devis/save",data);
    }catch(error){
      return error;
    }
  }
  async getDevis(){
    try{
      const response = await this.axios.get("vente/devis/ste/"+this.idSte);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("getDevis SERVER INTERNAL ERROR", error);
    }
  }
  async getDevisByClient(id:any){
    try{
      return await axios.get("vente/devis/client/"+id)
    }catch(error){
      return error;
    }
  }
  async deleteDevis(id:any){
    try{
      return await this.axios.delete("vente/devis/delete/"+id);
    }catch(error){
      return error;
    }
  }
  async genererBonLivV(devis: any){
    
    try {
      const response = await this.axios.post("vente/bonLiv/save", devis);
      if (response.status === 200) {
        return response.data;
      }
    }catch(error){
      return error;
    }
  }
  async toPdfx(data:any,url:string){
    try {
      const response = await this.axios.post(url, data);
      if (response.status === 200) {
        return response.data;
      }
      else{
        return null;
      }
    }catch(error){
      return error;
    }
  }
  async getBonLivV(){
    try{
      return await this.axios.get("vente/bonLiv/ste/"+this.idSte);
    }catch(error){
      return error;
    } 
  }
  genererFactureV(bonLivSelected: any[],date:any){
    let data :any = {};
    data.ste = {idSte :this.idSte};
    data.bonLivVS = bonLivSelected;
    data.dateCreation = date;
    this.axios.post("vente/facture/save",data).then(
      (response) => {
        if(response.status == 200){
          this.tstr.success('Facture générée avec succès');
          this.tstr.info('wiat for your PDF',"INFO");
          let fillename = `factureVente${response.data?.id}.pdf`
          this.download(fillename);
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }
  async login(data:any):Promise<any>{
    try{
      let respone = await this.axios.post1("login",data);
      if(respone.status === 200){
        return respone.data;
      }
    }catch(error){
      console.log(error)
    }
    
  }
  async register(data:any):Promise<any>{
    try{
      let respone = await this.axios.post1("register",data);
      if(respone.status === 200){
        return respone.data;
      }
    }catch(error){
      console.log(error)
    }
    
  }
  async getStock() {
    try {
      const response = await this.axios.get(`stock/ste/${this.idSte}`);
      return response.data; 
    } catch (error) {
      console.error("get Stock ERROR:", error);
      throw error;
    }
  }
  async getHistoriqueArticle(idArticle:number) {
    try {
      const response = await this.axios.get(`historiqueArticle/${idArticle}`);
      return response.data; 
    } catch (error) {
      console.error("get HistoriqueArticle ERROR:", error);
      throw error;
    }
  }
  async setInitialStockArticle(idArticle:number,sotckInitiale:number) {
    let data={
      idArticle:idArticle,
      stockInitiale:sotckInitiale
    }
    try {
      const response = await this.axios.post(`stock/setStockInitial`,data);
      return response.data; 
    } catch (error) {
      console.error("SET setStockInitial ERROR: ", error);
      throw error;
    }
  }
  async saveNewBonLiv(items: any[],fournisseur:any,dateCreation:any) {
    let data :any = {};
    data.items = items;
    data.ste = {idSte:this.idSte};
    data.fournisseur = fournisseur;
    data.dateCreation = dateCreation;
    console.log("dataTosend",data);
    try {
      const response = await this.axios.post(`achat/bonLiv/saveNew`,data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("SteService: saveNewBonLiv ERROR: ", error);
      throw error;
    }
  }
  async saveNewBonLivV(items: any[],client:any,dateCreation:any) {
    let data :any = {};
    data.items = items;
    data.ste = {idSte:this.idSte};
    data.client = client;
    data.dateCreation = dateCreation;
    console.log("dataTosend",data);
    try {
      const response = await this.axios.post(`vente/bonLiv/saveNew`,data);
      return response.data; 
    } catch (error) {
      console.error("SteService: saveNewBonLivV ERROR: ", error);
      throw error;
    }
  }
  async saveNewFactureA(items: any[],fournisseur:any,dateCreation:any) {
    let data :any = {};
    data.items = items;
    data.ste = {idSte:this.idSte};
    data.fournisseur = fournisseur;
    data.dateCreation = dateCreation;
    console.log("dataTosend",data);
    try {
      const response = await this.axios.post(`achat/facture/saveNew`,data);
      return response.data; 
    } catch (error) {
      console.error("SteService: saveNewFactureA ERROR: ", error);
      throw error;
    }
  }
  async saveNewFactureV(items: any[],client:any,dateCreation:any) {
    let data :any = {};
    data.items = items;
    data.ste = {idSte:this.idSte};
    data.client = client;
    data.dateCreation = dateCreation;
    console.log("dataTosend",data);
    try {
      const response = await this.axios.post(`vente/facture/saveNew`,data);
      return response.data; 
    } catch (error) {
      console.error("SteService: saveNewFactureV ERROR: ", error);
      throw error;
    }
  }
  async getAllVFactures(){
    try{
      return await this.axios.get(`vente/facture/ste/${this.idSte}`);
    }catch(error){
      return error;
    } 
  }
  async getAllAFactures(){
    try{
      return await this.axios.get(`achat/facture/ste/${this.idSte}`);
    }catch(error){
      return error;
    } 
  }

  download(filename:string): void {
    this.downloadFile(filename)
    .then((data: ArrayBuffer) => {
      this.saveFile(data, filename); 
    })
    .catch((error: any) => {
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
  async getBonLivVById(idBon:number){
    let data:any = {};
    data.idBon = Number(idBon);
    data.idSte = this.idSte;
    try{
      const response = await this.axios.post("vente/bonLiv/getById",data);
      console.log(response);
      if(response.status == 200){
        return response.data;
      }
    }catch(error){
      console.log(error)
    }
  }
  async saveBonRetour(data:any) {
    try {
      const response = await this.axios.post(`vente/bonLiv/saveBonRetour`,data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("SteService: saveBonRetour ERROR: ", error);
      throw error;
    }
  }
  async toInventaire(articleList: any[]) {
    try {
      const response = await this.axios.post(`articles/toInventaire`,articleList);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("SteService: toInventaire ERROR: ", error);
      throw error;
    }
  }
  async saveFactureA(data:any) {
    try {
      const response = await this.axios.post(`achat/facture/update`,data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("SteService: saveBonRetour ERROR: ", error);
      throw error;
    }
  }
  async saveFactureV(data:any) {
    try {
      const response = await this.axios.post(`vente/facture/update`,data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("SteService: saveBonRetour ERROR: ", error);
      throw error;
    }
  }
}