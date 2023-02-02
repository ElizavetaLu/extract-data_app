import { FC, FormEvent, useState, useRef, useEffect } from "react";
import { ExtractedData, setDataFuncProp } from "../../interfaces";
import LanguageDropdown from "../language-dropdown/LanguageDropdown";
import DropFileInput from "./drag-drop/DropFileInput";
import FilesList from "./files-list/FilesList";
import fetchData from "../../api/fetchData";
import "./UploadForm.scss";


const UploadForm: FC<setDataFuncProp> = ({ setExtractedData }) => {

    const [response, setResponse] = useState<{ text: string, status: boolean }>({
        text: '',
        status: true
    });
    const [value, setValue] = useState('Select Language');
    const [numbers, setNumbers] = useState<string[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);
    const errDiv = useRef<HTMLDivElement>(null);
    const [uploaded, setUploaded] = useState(false);

    useEffect(() => {
        if (uploaded) setTimeout(() => setUploaded(!uploaded), 3000);
    }, [uploaded])

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (value === 'Select Language') {
            setResponse({
                text: 'Please, select language first',
                status: false
            })
            return errDiv.current!.scrollIntoView(false)
        }

        const formData = new FormData();

        let query = '';
        for (let i = 0; i < fileList!.length; i++) {
            formData.append("files", fileList![i]);

            if (fileList![i].name.endsWith('.csv')) query += `file${i}=${numbers[i]}&`;
        }


        fetchData.post(`upload-files?${query}language=${value}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(({ data }) => {

                const sepSentences = data.sortedTextData.map((elem: ExtractedData) => {
                    return {
                        name: elem.name,
                        sentences: elem.separateSentencesArray
                    }
                });

                setExtractedData(sepSentences);

                setResponse({
                    text: data.status,
                    status: true
                });

                setUploaded(!uploaded);
            })
            .catch(err => {
                setResponse({
                    text: err.message ? err.message : err.response.data,
                    status: false
                })
            }
            );
    }

    const getExamples = async () => {
        if (value === 'Select Language') {
            setResponse({
                text: 'Please, select language first',
                status: false
            })
            return errDiv.current!.scrollIntoView(false)
        }
        await fetchData.get(`word-usage?language=${value}`)
            .then(res => setResponse({ text: res.data, status: true }))
            .catch(err => setResponse({ text: err.response.data, status: false }))
    }

    return (
        <form className='form' onSubmit={onSubmit}>
            <h1 >Upload files</h1>
            <div className="success" style={{ opacity: uploaded ? '1' : '0' }}>
                <div className="icon">
                    <img src="/extract-data_app/build//icons/icons8-ok-128.png" alt="" className="icon-img" />
                </div>
                <div className="text">{response.text}</div>
            </div>

            {<div className="error" ref={errDiv}>{response.status ? null : response.text}</div>}

            <LanguageDropdown setValue={setValue} value={value} />

            <DropFileInput fileList={fileList} setFileList={setFileList} />

            {fileList.length > 0 &&
                <FilesList fileList={fileList} setFileList={setFileList} numbers={numbers} setNumbers={setNumbers} />
            }

            <button className="btn" onClick={getExamples}>Get Examples</button>
        </form>
    )
}

export default UploadForm