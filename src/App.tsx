import React, { useState, useRef } from 'react';
import { render } from 'react-dom';
import { useSize } from "ahooks";
import MonacoEditor from 'react-monaco-editor';
import SplitPane from 'react-split-pane';
import ReactMarkdown from 'react-markdown';
import './A4.css';

function App() {
  const [code, setCode] = useState(`# Hello, *world*!`);
  const [darkMode, setDarkMode] = useState(true);

  const ref = useRef(null);

  const { height = 0 } = useSize(ref);

  const editorDidMount = (editor: any, monaco: any): void => {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  const onChange = (newValue: any) => setCode(newValue);

  const options = {
    selectOnLineNumbers: true
  };

  return (
    <div ref={ref} className="w-screen h-screen">
      <SplitPane split="horizontal" allowResize={false}>
        <div className="w-full bg-black h-12 flex justify-between items-center px-4">
          <a className="text-white text-lg" href="https://www.baidu.com" target="_blank" >Geek Resume</a>
          <ul className="w-64 flex justify-between">
            <li className="">linkin / Boss / </li>
            <li className="">Export as PDF / PNG / Markdown</li>
            <li className="cursor-pointer" onClick={() => setDarkMode(value => !value)}>{ darkMode ? '🌕' : '🌙' }</li>
          </ul>
        </div>
        <SplitPane split="vertical" size={height - 3.5*14 + 'px'} >
          <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100 overflow-scroll">
            <ReactMarkdown className="page markdown-body">{code}</ReactMarkdown>
          </div>
          <div className="w-full h-full">
            <MonacoEditor
              width="100%"
              height={height - 3.5*14 + 'px'}
              language="markdown"
              theme={darkMode ? "vs-dark" : "vs"}
              value={code}
              options={options}
              onChange={onChange}
              editorDidMount={editorDidMount}
            />
          </div>
        </SplitPane>
      </SplitPane>
    </div>
  );
}

render(
  <App />,
  document.getElementById('root')
);

export default App;
