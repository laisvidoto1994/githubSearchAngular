import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Github } from '../models/github.model';
import { Repositorio } from '../models/repositorio.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private urlUsuario = 'https://api.github.com/users/'
  retorno: Github;

  retorno2: Repositorio;

  private username: string;
  private clientId: '7a31dc9e5717d441c939';
  private clientSecret: 'a8f36e32086d5ded83d88601bd62b562b6b94951';

  constructor(
    private http: HttpClient,
    ) { }

  private converterObjParaJSON(data) {
    return JSON.parse(JSON.stringify(data));
  }

  getData(usuario: string){
    const url = 'https://api.github.com/users/';
    return this.http.get(url+usuario);
  }

  getRepos(usuario: string):Observable<any[]>{
    const url = 'https://api.github.com/users/';

    return this.http.get<any[]>(url+usuario+'/repos'+"?client_id=" +this.clientId+ '&client_secret='+ this.clientSecret);
  }

  getStarred(usuario: string):Observable<any[]>{
    const url = 'https://api.github.com/users/';

    return this.http.get<any[]>(url+usuario+'/starred' +"?client_id=" +this.clientId+ '&client_secret='+ this.clientSecret);
  }

  consultarPorUsuario(usuario: string):Observable<any> {
    return this.http.get<any>(this.urlUsuario +usuario+"?client_id=" +this.clientId+ '&client_secret='+ this.clientSecret).pipe(
      map((data => this.retorno = this.converterRespostaParaGithub(data) )
    ))
  }

  private converterRespostaParaGithub(githubNaResposta): Github {
    let usuarioGitHub = new Github();

    usuarioGitHub.login = githubNaResposta.login;
    usuarioGitHub.id = githubNaResposta.id;
    usuarioGitHub.node_id = githubNaResposta.node_id;
    usuarioGitHub.avatar_url = githubNaResposta.avatar_url;
    usuarioGitHub.gravatar_id = githubNaResposta.gravatar_id;
    usuarioGitHub.url = githubNaResposta.url;
    usuarioGitHub.html_url = githubNaResposta.html_url;
    usuarioGitHub.followers_url = githubNaResposta.followers_url;
    usuarioGitHub.following_url = githubNaResposta.following_url;
    usuarioGitHub.gists_url = githubNaResposta.gists_url;
    usuarioGitHub.starred_url = githubNaResposta.starred_url;
    usuarioGitHub.subscriptions_url = githubNaResposta.subscriptions_url;
    usuarioGitHub.organizations_url = githubNaResposta.organizations_url;
    usuarioGitHub.repos_url = githubNaResposta.repos_url;
    usuarioGitHub.events_url = githubNaResposta.events_url;
    usuarioGitHub.received_events_url = githubNaResposta.received_events_url;
    usuarioGitHub.type = githubNaResposta.type;
    usuarioGitHub.site_admin = githubNaResposta.site_admin;
    usuarioGitHub.name = githubNaResposta.name;
    usuarioGitHub.company = githubNaResposta.company;
    usuarioGitHub.blog = githubNaResposta.blog;
    usuarioGitHub.location = githubNaResposta.location;
    usuarioGitHub.email = githubNaResposta.email;
    usuarioGitHub.hireable = githubNaResposta.hireable;
    usuarioGitHub.bio = githubNaResposta.bio;
    usuarioGitHub.twitter_username = githubNaResposta.twitter_username;
    usuarioGitHub.public_repos = githubNaResposta.public_repos;
    usuarioGitHub.public_gists = githubNaResposta.public_gists;
    usuarioGitHub.followers = githubNaResposta.followers;
    usuarioGitHub.following = githubNaResposta.following;
    usuarioGitHub.created_at = githubNaResposta.created_at;
    usuarioGitHub.updated_at = githubNaResposta.updated_at;

    return usuarioGitHub;
  }

  consultarRepositorioDoUsuario(usuario: string) {
    return this.http.get(this.urlUsuario +usuario+ '/repos').pipe(
      map((data => this.retorno2 = this.converterRespostaParaRepositorio(data) )
    ))
  }

  consultarStarredDoUsuario(usuario: string) {
    return this.http.get(this.urlUsuario +usuario+ '/starred').pipe(
      map((data => this.retorno = this.converterRespostaParaGithub(data) )
    ))
  }

  private converterRespostaParaRepositorio(repositorioNaResposta): Repositorio {
    let repositorio:Repositorio = new Repositorio();

    let lista:any =[{}];

    for (let index = 0; index < repositorioNaResposta.length; index++) {
      repositorio[index] = repositorioNaResposta[index];
      lista[index] = repositorioNaResposta[index];

    }
    return repositorio;
  }


}
