export interface ILanguage {
    name: string,
    code: string,
    dir?: string,
    active: boolean,
    [propName: string]: any,
}


export interface ILocalize {
    defaultLanguage: string,
    activeLanguage: ILanguage,
    initialize: any,

    translate(id: string): string,

    addTranslation(translation: any): any,

    addTranslationForLanguage(translation: any, language: string): any,

    setActiveLanguage(languageCode: any): any,

    languages: ILanguage[],
    LocalizeContextProps: any,
    renderToStaticMarkup: any,
    ignoreTranslateChildren?: boolean,

    [propName: string]: any,
}
