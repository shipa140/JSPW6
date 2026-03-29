export class ArticlePage {

    constructor (page)
     {
        this.page = page;
        this.content = page.locator('.article-content p');
        this.title = page.locator('.banner h1');
        this.comment = page.getByRole('textbox', { name: 'Write a comment...' });
        this.postcomments = page.getByRole('button', { name: 'Post Comment' });
        this.comments = page.locator('.card-text');
        this.delcom = page.locator('.card-footer button:has(.ion-trash-a)');
        this.delarticle = page.getByRole('button', {name: ' Delete Article'}).first();
     }

    async postComment(comments) {
        const {body} = comments;
        await this.comment.fill(body);
        await this.postcomments.click();
    }

    async delComment() {
        this.page.once('dialog', dialog => dialog.accept());
        await this.delcom.click();
    }

    async delArticle() {
        this.page.once('dialog', dialog => dialog.accept());
        await this.delarticle.click() 
    }
}
 
