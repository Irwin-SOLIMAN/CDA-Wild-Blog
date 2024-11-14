import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/articles';

  private http = inject(HttpClient);

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  variantGetArticleById(id: number): Observable<Article> {
    return this.http.get<Article[]>(`http://localhost:3000/articles`).pipe(
      map((articles: Article[]) => articles[id]),
      catchError((err) => {
        console.log(err);
        return of({} as Article); // création d'un observable null [car le pipe n'accepete que de chain les observables]
      })
    );
  }

  constructor() {}
}
