export class EditorMdConfig {
    mode: 'gfm' | 'markdown' = 'gfm';
    height?: number | string;
    autoLoadModules = true;
    path = 'assets/editor.md/lib/';
    theme = 'default';
    previewMarkdown = false;
    previewTheme = 'default';
    editorTheme = 'default';
    placeholder = '';
    pluginPath = 'assets/editor.md/plugins/';
    toolbar = true; // show or hide toolbar;
    coldFold = false;
    saveHTMLToTextarea = false;
    emoji = false;
    markdown = '';
    htmlDecode: string | boolean = true;
    watch = false;
    lang?: {
        name?: string,
        description?: string,
        tocTitle?: string,
        toolbar?: {}
    } = {
            name: 'zh-cn',
            tocTitle: '目录'
        };
    gfm = true;
    toolbarIcons: string | string[] = 'simple';
    toolbarCustomIcons?: { [key: string]: string };
    toolbarHandlers?: { [key: string]: () => void };
    toolbarIconsClass?: { [key: string]: string };
    toolbarIconTexts?: { [key: string]: string };
    matchWordHighlight: boolean | 'onselected' = false;
    onload: () => void;
    onpreviewing: () => void;
    onpreviewed: () => void;
    onchange: () => void;

    constructor(options?: {
        height?: number | string,
        autoLoadModules?: boolean,
        path?: string,
        theme?: string,
        previewMarkdown?: boolean,
        previewTheme?: string,
        editorTheme?: string,
        placeholder?: string,
        pluginPath?: string,
        toolbar?: boolean, // show or hide toolbar,
        coldFold?: boolean,
        emoji?: boolean,
        markdown?: string
        lang?: {
            name: string,
            description?: string,
            tocTitle?: string,
            toolbar?: {}
        },
        watch?: boolean,
        toolbarIcons?: string | string[],
        toolbarCustomIcons?: { [key: string]: string },
        toolbarHandlers?: { [key: string]: () => void },
        toolbarIconsClass?: { [key: string]: string },
        toolbarIconTexts?: { [key: string]: string },
        matchWordHighlight?: boolean | 'onselected',
        onload?: () => void,
        onpreviewing?: () => void,
        onpreviewed?: () => void,
        onchange?: () => void,
    }) {
        this.height = options && options.height ? options.height : this.height;
        this.autoLoadModules = options && options.autoLoadModules ? options.autoLoadModules : this.autoLoadModules;
        this.path = options && options.path ? options.path : this.path;
        this.theme = options && options.theme ? options.theme : this.theme;
        this.previewMarkdown = options && options.previewMarkdown ? options.previewMarkdown : this.previewMarkdown;
        this.previewTheme = options && options.previewTheme ? options.previewTheme : this.previewTheme;
        this.editorTheme = options && options.editorTheme ? options.editorTheme : this.editorTheme;
        this.placeholder = options && options.placeholder ? options.placeholder : this.placeholder;
        this.pluginPath = options && options.pluginPath ? options.pluginPath : this.pluginPath;
        this.toolbar = options && options.toolbar ? options.toolbar : this.toolbar;
        this.coldFold = options && options.coldFold ? options.coldFold : this.coldFold;
        this.onload = options && options.onload ? options.onload : this.onload;
        this.onpreviewing = options && options.onpreviewing ? options.onpreviewing : this.onpreviewing;
        this.onpreviewed = options && options.onpreviewed ? options.onpreviewed : this.onpreviewed;
        this.emoji = options && options.emoji ? options.emoji : this.emoji;
        this.markdown = options && options.markdown ? options.markdown : this.markdown;
        this.watch = options && options.watch ? options.watch : this.watch;
        this.onchange = options && options.onchange ? options.onchange : this.onchange;
        this.toolbarIcons = options && options.toolbarIcons ? options.toolbarIcons : this.toolbarIcons;
        this.toolbarHandlers = options && options.toolbarHandlers ? options.toolbarHandlers : this.toolbarHandlers;
        this.toolbarIconsClass = options && options.toolbarIconsClass ? options.toolbarIconsClass : this.toolbarIconsClass;
        this.toolbarIconTexts = options && options.toolbarIconTexts ? options.toolbarIconTexts : this.toolbarIconTexts;
        this.matchWordHighlight = options && options.matchWordHighlight ? options.matchWordHighlight : this.matchWordHighlight;
        if (options && options.lang) {
            Object.assign(this.lang, options.lang);
        }
    }
}
