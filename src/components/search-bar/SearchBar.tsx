import { FC, FormEvent, useState } from "react";
import { InputValueProps } from "../../interfaces";
import "./SearchBar.scss";


// const dataFromLocalStorage = JSON.parse(localStorage.getItem('data') || '[]')


const SearchBar: FC<InputValueProps> = ({ setSearchText }) => {

    const [value, setValue] = useState<string>('')



    const [data, setData] = useState<string[]>([]);

    // useEffect(() => {
    //     localStorage.setItem('data', JSON.stringify(data))
    // }, [data])



    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSearchText(value);
        setData([...data, value]);
        setValue('');
    }


    return (
        <div className="search-bar">
            <form className="search-form" onSubmit={onSubmit}>

                <div className="search">
                    <input
                        placeholder="Text to replace..."
                        className="search-input"
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button type="submit" className="btn">Replace all</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar