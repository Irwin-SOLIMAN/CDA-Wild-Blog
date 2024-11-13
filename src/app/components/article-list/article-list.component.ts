import { Component, inject } from '@angular/core';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { ArticleThumbnailComponent } from '../article-thumbnail/article-thumbnail.component';
import { ApiService } from '../../service/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleThumbnailComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  htpp = inject(HttpClient);
  articles$!: Observable<Article[]>;

  getArticles() {
    return this.htpp.get<Article[]>('http://localhost:3000/articles');
  }

  ngOnInit() {
    this.articles$ = this.getArticles();
    console.log(this.articles$);
  }

  handleLike(article: Article) {
    article.isLiked = !article.isLiked;
  }
}
