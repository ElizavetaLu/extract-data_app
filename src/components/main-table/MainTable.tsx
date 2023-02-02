import { FC, useState } from 'react';
import { DataListProps, SortedSentences } from "../../interfaces";
import SearchBar from '../search-bar/SearchBar';
import cloneDeep from "lodash/cloneDeep";
import "./MainTable.scss";


const MainTable: FC<DataListProps> = ({ data }) => {

    const dataCopy = cloneDeep(data);


    const [selectedFileName, setSelectedFileName] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');


    let filesName: string[] = [];
    dataCopy.forEach((item: SortedSentences) => filesName.push(item.name));



    const selectedFileData = dataCopy.find((item: SortedSentences) => item.name === selectedFileName);


    let testArr: string[] = [];

    if (searchText && searchText.trim()) {
        selectedFileData?.sentences.map((sentence: string) => {
            return testArr.push(sentence.replace(new RegExp(searchText, "gi"), ''))
        })
        selectedFileData!.sentences = testArr
    }


    return (
        <div className='main-container'>

            <div className="files">
                <div className='block-title'>Uploaded files:</div>

                <ul className='files-list'>
                    {filesName.map(name => {
                        return (
                            <li
                                className='file-name'
                                key={name}
                                onClick={() => setSelectedFileName(name)}
                            >
                                {name}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <SearchBar setSearchText={setSearchText} />


            {selectedFileName &&
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sentence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedFileData?.sentences.map((sentence: string, i: number) => {
                            return (
                                <tr key={i}>
                                    <td>{++i}</td>
                                    <td>{sentence}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default MainTable