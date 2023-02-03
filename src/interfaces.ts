export interface ExtractedData {
    name: string;
    eachWordArray: string[];
    arrayOfUniqueWords: string[];
    eachSymbolArray: string[];
    arrayOfUniqueSymbols: string[];
    separateSentencesArray: string[];
}

export interface SortedSentences {
    name: string;
    sentences: string[];
}

export interface DataListProps {
    data: SortedSentences[]
}

export interface setDataFuncProp {
    setExtractedData: Function
}

export interface fileTool {
    fileList: any[]
    setFileList: Function
}

export interface fileListTool {
    fileList: any[];
    setFileList: Function;
    numbers: string[];
    setNumbers: Function;
}


export interface InputValueProps {
    setSearchText: Function;
}