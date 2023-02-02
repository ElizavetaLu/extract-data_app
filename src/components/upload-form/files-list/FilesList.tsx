import { FC } from "react"
import { fileListTool } from "../../../interfaces";
import "./FilesList.scss"


const FilesList: FC<fileListTool> = ({ fileList, setFileList, numbers, setNumbers }) => {

    const csvExist = fileList.find((elem: any) => elem.name.endsWith('.csv'));

    const getFileIcon = (fileName: string) => {
        if (fileName.endsWith(".csv")) return "csv"
        if (fileName.endsWith(".pdf")) return "pdf"
        if (fileName.endsWith(".txt")) return "txt"
        return "file"
    }

    const fileRemove = (file: any) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    }

    return (
        <div className="files-wrapper">
            <div className="filesName-list">
                {csvExist && <h3 className="title">Select column number for .csv file(s):</h3>}
                {fileList.map((file, i: number) => {
                    return (
                        <div key={file.name} className='files-list'>
                            <div className="file-container">
                                <div className="file">
                                    <div className="file-data">
                                        <div className="file-icon">
                                            <img src={`/extract-data_app/build//icons/${getFileIcon(file.name)}.png`} alt="" />
                                        </div>
                                        <div className="file-name">{file.name}</div>
                                    </div>
                                    {file.name.endsWith(".csv")
                                        && <input
                                            type="number"
                                            min={1}
                                            className="num-input"
                                            value={numbers[i] || ''}
                                            onChange={(e) => {
                                                const newNumbers = [...numbers];
                                                newNumbers[i] = e.target.value;
                                                setNumbers(newNumbers);
                                            }}
                                        />
                                    }
                                </div>
                                <div className="delete-icon" onClick={() => fileRemove(file)}>
                                    <img src="/extract-data_app/build//icons/icons8-close-100.png" className="delete-file" alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className="btn" type='submit'>Extract Data</button>
        </div>
    )
}

export default FilesList