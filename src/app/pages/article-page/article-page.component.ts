import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { catchError, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ApiService } from '../../service/api.service';

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
  apiService = inject(ApiService);

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
    });
    this.article$ = this.apiService.getArticleById(this.articleId);
    this.article$ = this.apiService.variantGetArticleById(this.articleId);
  }
}
