export class GetPollDto {
  id: number;

  title: string;

  options: object;

  newsId: string;

  createdAt: Date;

  constructor(
    id: number,
    title: string,
    options: object,
    newsId: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.options = options;
    this.newsId = newsId;
    this.createdAt = createdAt;
  }
}
