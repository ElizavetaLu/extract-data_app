import { FC, useState } from 'react';
import MainTable from './components/main-table/MainTable';
import UploadForm from './components/upload-form/UploadForm';
import { SortedSentences } from './interfaces';
import './App.scss';


const App: FC = () => {
  const [extractedData, setExtractedData] = useState<SortedSentences[]>([])

  return (
    <div className="wrapper">
      <div className="container">
        <UploadForm setExtractedData={setExtractedData} />
      </div>
      {extractedData.length > 0 && <MainTable data={extractedData} />}
    </div>
  );
}

export default App;
