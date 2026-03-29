import {faker} from '@faker-js/faker';

export class ArticleBuilder {

    title() {
        this.title = faker.lorem.sentence();
        return this;
    }

    about() {
        this.about = faker.lorem.sentence();
        return this;
    }

    body() {
        this.body = faker.lorem.paragraph();
        return this;
    }

    build() {
        const result = {...this};
        return result;
    }

}