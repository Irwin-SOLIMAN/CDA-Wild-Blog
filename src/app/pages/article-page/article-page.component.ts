import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { catchError, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  articleId!: number;
  article$!: Observable<Article>;

  http = inject(HttpClient);

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/articles/${id}`);
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

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
    });
    this.article$ = this.getArticleById(this.articleId);
    // this.article$ = this.variantGetArticleById(this.articleId);
  }
}
