import { FC, useEffect, useRef, useState } from "react"
import fetchData from "../../api/fetchData";
import './LanguageDropdown.scss'


const LanguageDropdown: FC<{ setValue: Function; value: string }> = ({ setValue, value }) => {
    const [isOpen, setIsOpen] = useState(false);


    const [langList, setLangList] = useState([]);

    const divEl = useRef<HTMLDivElement>(null);


    useEffect(() => {
        fetchData.get('lang-list/').then(res => setLangList(res.data))
    }, []);

    useEffect(() => {
        const handler = (event: any) => {
            if (!divEl.current) return
            if (!divEl.current.contains(event.target)) setIsOpen(false);
        };

        document.addEventListener('click', handler, true);

        return () => document.removeEventListener('click', handler)
    }, [])

    return (
        <div ref={divEl} className="dropdown" >

            <div className="selected" onClick={() => setIsOpen(!isOpen)}>
                <div className="selected-item" > {value} </div>
                < div className={`icon ${isOpen}`}>
                    <img src="/extract-data_app/build//icons/ChevronDown.png" alt="" />
                </div>
            </div>

            {
                isOpen && <div className="items-list" >

                    {
                        langList.map(item => {
                            return (
                                <div
                                    className="item"
                                    key={item[0]}
                                    onClick={() => {
                                        setValue(item[0]);
                                        setIsOpen(false);
                                    }
                                    }> {item[0]}
                                </div>
                            )
                        })
                    }
                </div>}

        </div>
    )
}

export default LanguageDropdown