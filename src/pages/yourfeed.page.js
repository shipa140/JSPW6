export class YourFeedPage {
    constructor(page) {
        this.page = page;
        this.profileName = page.getByRole('navigation');
        this.feedtags = page.locator('.tag-list .tag-pill:first-child');
        this.articles = page.locator('.article-preview');
        this.articleTags = page.locator('.article-preview .tag-list .tag-pill');
        this.emptystate = page.locator('.article-preview');
    }

    async getProfileName() {
        return this.profileName;
    }

    async tagsfeed() {
        await this.feedtags.click();
    }

    async getFeedTags() {
        return this.feedtags;
    }

    async getFirstTagText() {
        await this.feedtags.waitFor({ state: 'visible' });
        return await this.feedtags.innerText();
    }

    async clickFirstTag() {
        await this.feedtags.waitFor({ state: 'visible' });
        await this.feedtags.click();
    }

    async getArticleTagsText() {
        await this.articles.first().waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
        return await this.articleTags.allInnerTexts();
    }

    emptyState() {
        return this.emptystate;
    }
}
