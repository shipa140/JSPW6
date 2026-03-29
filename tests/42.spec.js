import { test, expect } from '@playwright/test';
import { App } from '../src/pages/app.page';
import { UserBuilder } from '../src/helpers/builders/user.builder';
import { ArticleBuilder } from '../src/helpers/builders/article.builders';
import { CommentsBuilder } from '../src/helpers/builders/comments.builders';

test('Регистрация', async ({page}) => {
  const app = new App(page);
  const user = new UserBuilder().withEmail().withPassword().withUsername().build(); 

  await app.main.open();
  await app.main.gotoRegister();
  await app.register.signup(user);

  const profileName = await app.yourfeed.getProfileName();
  await expect(profileName).toContainText(user.username); 

});

test('Создание статьи', async ({page}) => {

  const app = new App(page);
  const user = new UserBuilder().withEmail().withPassword().withUsername().build();
  const art = new ArticleBuilder().title().about().body().build(); 

  await app.main.open();
  await app.main.gotoRegister();
  await app.register.signup(user);
  await app.main.newArticle();
  await app.editor.createarticle(art);

  await expect(app.article.title).toHaveText(art.title);
  await expect(app.article.content).toHaveText(art.body);
});

test('Комментирование статьи', async ({page}) => {
  const app = new App(page);
  const user = new UserBuilder().withEmail().withPassword().withUsername().build();
  const art = new ArticleBuilder().title().about().body().build();
  const com = new CommentsBuilder().body().build();

  await app.main.open();
  await app.main.gotoRegister();
  await app.register.signup(user);
  await app.main.newArticle();
  await app.editor.createarticle(art);
  await app.article.postComment(com);

  await expect(app.article.comments).toHaveText(com.body);
});

test('Удаление комментария у статьи', async ({page}) => {

  const app = new App(page);
  const user = new UserBuilder().withEmail().withPassword().withUsername().build();
  const art = new ArticleBuilder().title().about().body().build();
  const com = new CommentsBuilder().body().build();

  await app.main.open();
  await app.main.gotoRegister();
  await app.register.signup(user);
  await app.main.newArticle();
  await app.editor.createarticle(art);
  await app.article.postComment(com);
  await expect(app.article.comments).toHaveText(com.body);
  await app.article.delComment();

  await expect(page.getByText(com.body)).not.toBeVisible();
  
});

test.only('Удаление статьи', async ({page}) => {
  const app = new App(page);
  const user = new UserBuilder().withEmail().withPassword().withUsername().build();
  const art = new ArticleBuilder().title().about().body().build(); 

  await app.main.open();
  await app.main.gotoRegister();
  await app.register.signup(user);
  await app.main.newArticle();
  await app.editor.createarticle(art);
  await app.article.delArticle();

  await expect(app.yourfeed.emptyState()).toHaveText('Articles not available.');
});

test('Выбор статьи по тегу', async ({page}) => {
  const app = new App(page);
  const user = new UserBuilder().withEmail().withPassword().withUsername().build();

  await app.main.open();
  await app.main.gotoRegister();
  await app.register.signup(user);
  await app.yourfeed.tagsfeed();
  const firstTagText = await app.yourfeed.getFirstTagText();
  await app.yourfeed.clickFirstTag();
  const articleTags = await app.yourfeed.getArticleTagsText();

  expect(articleTags).toContain(firstTagText);
});

