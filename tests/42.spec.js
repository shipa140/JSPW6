import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage }from '../src/pages/register.page';
import { YourFeedPage } from '../src/pages/yourfeed.page';
import { EditorPage } from '../src/pages/editor.page';
import { articlePage } from '../src/pages/article.page';
import { LoginPage } from '../src/pages/login.page';

function createUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.person.lastName(),
    bio: faker.person.bio(),
  };
}

function createArticle() {
  return {
    title: faker.lorem.sentence(),
    about: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
  };
}

function createComments() {
  return {
    body: faker.lorem.paragraph(),
  };
}

test('Регистрация', async ({ page}) => {

  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const yourfeed = new YourFeedPage(page);
  const user = createUser();

  await main.open();
  await main.gotoRegister();
  await register.signup(user);

  //await expect(yourfeed.getProfileName()).toContainText(user.username);  
  const profileName = await yourfeed.getProfileName();
  await expect(profileName).toContainText(user.username); 

});

test('Авторизация', async ({page}) => {

  const EMAIL = 'shipunov140@internet.ru';
  const PASSWORD = 'dimple123456';
  const USER = 'shipunov140';

  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const yourfeed = new YourFeedPage(page);
  const loginpg = new LoginPage(page);


  await main.open();
  await main.gotoLogin();
  await loginpg.login(EMAIL, PASSWORD);

  const profileName = await yourfeed.getProfileName();
  await expect(profileName).toContainText(USER); 

});

test('Создание статьи', async ({page}) => {

  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const user = createUser();
  const editor = new EditorPage(page);
  const art = createArticle();
  const article = new articlePage(page);


  await main.open();
  await main.gotoRegister();
  await register.signup(user);
  await main.newArticle();
  await editor.createarticle(art);

  await expect(article.title).toHaveText(art.title);
  await expect(article.content).toHaveText(art.body);
});

test('Комментирование статьи', async ({page}) => {

  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const user = createUser();
  const editor = new EditorPage(page);
  const art = createArticle();
  const article = new articlePage(page);
  const com = createComments()

  await main.open();
  await main.gotoRegister();
  await register.signup(user);
  await main.newArticle();
  await editor.createarticle(art);
  await article.postComment(com)

  await expect(article.comments).toHaveText(com.body);
});

test('Выбор статьи по тегу', async ({page}) => {

  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const yourfeed = new YourFeedPage(page);
  const user = createUser();

  await main.open();
  await main.gotoRegister();
  await register.signup(user);
  await yourfeed.tagsfeed();

  const tagfeed = await yourfeed.getFeedTags();
  await expect(tagfeed).toContainText('реклама'); 

});

test('Удаление комментария', async ({page}) => {

  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const user = createUser();
  const editor = new EditorPage(page);
  const art = createArticle();
  const article = new articlePage(page);
  const com = createComments()

  await main.open();
  await main.gotoRegister();
  await register.signup(user);
  await main.newArticle();
  await editor.createarticle(art);
  await article.postComment(com);
  await expect(article.comments).toHaveText(com.body);
  await article.delComment();

  await expect(page.getByText(com.body)).not.toBeVisible();
  
});

