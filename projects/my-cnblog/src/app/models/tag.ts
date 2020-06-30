export type Tags = Tag[];

export class Tag {
    name: string;

    // tslint:disable-next-line:variable-name
    private _tagColor: string;

    constructor(tagName?: string) {
        this.name = tagName;
    }

    get tagColor() {
        if (!this._tagColor) {
            this._tagColor = this.randomTagColor();
        }

        return this._tagColor;
    }

    assignToAddDto() {
        return {
            name: this.name
        };
    }

    private randomTagColor() {
        const colorMap = ['magenta', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'geekblue'];
        return colorMap[Math.floor((Math.random() * (colorMap.length - 1)))];
    }
}
