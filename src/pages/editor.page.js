export class EditorPage {

    constructor (page)
     {
        this.page = page;

        this.title = page.getByRole('textbox', { name: 'Article Title' });
        this.about = page.getByRole('textbox', { name: "What's this article about?" });
        this.body = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.tags = page.getByRole('textbox', { name: 'Enter tags' });
        this.publish = page.getByRole('button', { name: 'Publish Article' });
     }

    async createarticle(article){
        const {title, body, about} = article;

        await this.title.click();
        await this.title.fill(title);
        await this.about.click();
        await this.about.fill(about);
        await this.body.click();
        await this.body.fill(body);
        await this.publish.click();

    }

}

 