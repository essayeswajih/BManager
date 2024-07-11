import { Injectable } from '@angular/core';
import { AxiosService } from './../axios/axios.service';
import { error } from 'console';
import { catchError, Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SteService {
  idSte: number = 53;
  ste: any;
  
  constructor(private axios: AxiosService) {}

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
      console.error("STE SERVER INTERNAL ERROR", error);
      throw new Error("STE SERVER INTERNAL ERROR");
    }
  }

  async getDepots(): Promise<any> {
    try {
      const response = await this.axios.get("depot/ste/"+this.idSte);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Depots SERVER INTERNAL ERROR", error);
      throw new Error("Depots SERVER INTERNAL ERROR");
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
      console.error("famille SERVER INTERNAL ERROR", error);
      throw new Error("famille SERVER INTERNAL ERROR");
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
      else{
        return response.data;
      }
    }catch(error){
      return error;
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
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Articles SERVER INTERNAL ERROR", error);
      throw new Error("Articles SERVER INTERNAL ERROR");
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
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("fournisseur SERVER INTERNAL ERROR", error);
      throw new Error("fournisseur SERVER INTERNAL ERROR");
    }
  }
  async saveFournisseur(fournisseur:any){
    fournisseur.ste={ idSte: this.idSte };
    console.log("fournisseur",fournisseur)
    try {
      const response = await this.axios.post("fournisseur/save", fournisseur);
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
      console.error("fournisseur SERVER INTERNAL ERROR", error);
      throw new Error("fournisseur SERVER INTERNAL ERROR");
    }
  }
  async saveClients(fournisseur:any){
    fournisseur.ste={ idSte: this.idSte };
    console.log("fournisseur",fournisseur)
    try {
      const response = await this.axios.post("clients/save", fournisseur);
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
      console.error("BonCommande SERVER INTERNAL ERROR", error);
      throw new Error("BonCommande SERVER INTERNAL ERROR");
    }
  }
  async saveBonCommande(data:any){
    console.log("ddddddddddddddddddddddddd")
    data.ste={ idSte: this.idSte };
    console.log("BonCommande",data)
    try {
      const response = await this.axios.post("achat/bonCmd/save", data);
      if (response.status === 200) {
        this.toPdf(response.data)
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
  async toPdf(data:any){
    try {
      const response = await this.axios.post("achat/bonCmd/toPdf", data);
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

  async toPdf1(data:any){
    try {
      const response = await this.axios.post("achat/bonLiv/toPdf", data);
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
  downloadFile(url: string): Promise<ArrayBuffer> {
    const downloadUrl = `http://localhost:9090/api/v1/files/${url}`

    return axios.get<ArrayBuffer>(downloadUrl, {
      responseType: 'arraybuffer',
    }).then(response => response.data);
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

}
