import { Component, Input, OnInit } from '@angular/core';
import { GithubService } from 'src/app/service/github.service';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Github } from 'src/app/models/github.model';
import { Repositorio } from 'src/app/models/repositorio.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  valorInicial:string = "";
  usuario: string="";
  users: String[] = [];

  valorAtual: string;
  valorSalvo: string;
  menssagemInput:string = "";

  listaDadosDoUsuario: any = [];
  repositorios:any = [];
  starred:any = [];

  constructor(
    private githubService: GithubService,
    private HttpClient: HttpClient,
    ){ }

  ngOnInit(): void {

  }

  getUsers(){
    this.usuario = this.valorAtual;
    this.githubService.getData(this.usuario).subscribe(data =>{

      let retornoDados: Github[] = JSON.parse(JSON.stringify(data));
      let lista :any[]= [];

      this.users = lista;
    });
  }

  consultarUsuario(){
    if(this.valorInicial != ''){
      this.usuario = this.valorAtual;
      this.githubService.consultarPorUsuario(this.usuario).subscribe(
        data =>{
          this.menssagemInput = '';
          let retornoDados: Github[] = JSON.parse(JSON.stringify(data));
          let valores = Object.values(retornoDados)
          let coluna = Object.keys(retornoDados)

          var arr = Object.keys(retornoDados)
          .map(function (key) {
            return [ key,retornoDados[key]];
          });

          for (let index = 0; index < arr.length; index++) {
            let valor = arr[index][1];
            let coluna = arr[index][0];

            let lista:any = [];
            lista.push({
              valor: coluna
            })
          }

          this.listaDadosDoUsuario = arr
        },
        error => {
          if(error.status == 404) {
            alert('Usuário não localizado!');
            this.menssagemInput = 'Usuário não localizado!';
            this.cliqueLimpar();
          }
        }
      )
    }
  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor){
    this.valorSalvo = valor;
    this.consultarUsuario();
    //this.getUsers();
  }

  cliqueRepos(){
    this.usuario = this.valorAtual;
    this.githubService.getRepos(this.usuario).subscribe(
      data =>{
        let retornoDados: Repositorio[] = JSON.parse(JSON.stringify(data));
        let lista :any[]= [];

        for (let index = 0; index < data.length; index++) {
          lista.push({
            'id': data[index].id,
            'name': data[index].name,
          });
        }

        /**
          var arr = retornoDados.map(function(obj) {
          return Object.keys(obj).map(function(key) {
              return obj[key];
          });
        });
         */

        this.repositorios = lista;
      }
    ),
    erro => {
      if(erro.status == 404) {
        console.log('Repositorio não localizado!');
      }
    }
  }

  cliqueStarred(){
    this.githubService.getStarred(this.usuario).subscribe(
      data =>{
        let retornoDados: Repositorio[] = JSON.parse(JSON.stringify(data));
        let lista :any[]= [];

        for (let index = 0; index < data.length; index++) {
          lista.push({
            'id': data[index].id,
            'name': data[index].name,
            'login':data[index].owner.login,
            'avatar_url':data[index].owner.avatar_url,
          });
        }
        this.starred = lista;
      }
    ),
    erro => {
      if(erro.status == 404) {
        console.log('Starred não localizado!');
      }
    }
  }

  cliqueLimpar(){
    this.valorInicial = '';
    this.usuario = '';
    this.valorAtual = '';
    this.valorSalvo = '';
    this.listaDadosDoUsuario = [];
  }
}
