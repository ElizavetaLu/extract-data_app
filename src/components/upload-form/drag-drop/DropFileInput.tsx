import { FC, useRef } from "react";
import { fileTool } from "../../../interfaces";
import "./DropFileInput.scss"

const DropFileInput: FC<fileTool> = ({ fileList, setFileList }) => {


    const wrapperRef = useRef<HTMLDivElement>(null);
    const onDragEnter = () => wrapperRef.current!.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current!.classList.remove('dragover');
    const onDrop = () => wrapperRef.current!.classList.remove('dragover');


    const onFileDrop = (e: any) => {
        const newFile = e.target.files;

        for (let i = 0; i < newFile.length; i++) {

            if ((newFile[i].name.endsWith('.csv')
                || (newFile[i].name.endsWith('.pdf'))
                || (newFile[i].name.endsWith('.epub'))
                || (newFile[i].name.endsWith('.txt')))) {

                setFileList((prev: any) => [...prev, newFile[i]])
            }
        }
    }

    return (
        <div
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className="content">
                <div className="cloud">
                    <img src="/extract-data_app/build//icons/icons8-download-from-cloud-96.png" alt="icon" className="cloud-img" />
                </div>
                <span className="text">Drag &#38; Drop your files here</span>
                <span className="text">Allowed extensions: .epub, .csv, .pdf, .txt</span>
            </div>
            <input
                className="input"
                value=""
                onChange={onFileDrop}
                type="file"
                multiple
            />
        </div>

    )
}

export default DropFileInput