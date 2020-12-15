import React, { useState, useRef } from 'react';
import { render } from 'react-dom';
import { useSize } from "ahooks";
import MonacoEditor from 'react-monaco-editor';

function App() {
  const [code, setCode] = useState('');

  const ref = useRef(null);

  const size = useSize(ref);

  const editorDidMount = (editor: any, monaco: any): void => {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  const onChange = (newValue: any, e: any): void => {
    console.log('onChange', newValue, e);
  }

  const options = {
    selectOnLineNumbers: true
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-14 bg-black">bala</div>
      <div className="w-full flex">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="w-64 h-64 bg-white rounded-lg shadow-xl">
            hola
          </div>
        </div>
        <div ref={ref} className="w-1/2">
          <MonacoEditor
            width={size.width}
            height={size.height}
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
          />
        </div>
      </div>
    </div>
  );
}

render(
  <App />,
  document.getElementById('root')
);

export default App;
