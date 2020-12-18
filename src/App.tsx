import React, { useState, useRef } from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import SplitPane from 'react-split-pane';
import ReactMarkdown from 'react-markdown';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import './A4.css';
import resume_cn from './resume_cn';
import resume_us from './resume_us';
import svg_cn from './cn.svg';
import svg_us from './us.svg'

function App() {

  const [code, setCode] = useState(resume_cn);
  
  const [darkMode, setDarkMode] = useState(true);

  const myEditor = useRef<monaco.editor.IStandaloneCodeEditor>();

  const [width, setWidth] = useState('100%');

  const editorDidMount = (editor: monaco.editor.IStandaloneCodeEditor): void => {
    myEditor.current = editor;
    myEditor.current.focus();
  }

  const onMonacoChange = (newValue: any) => setCode(newValue);

  const onSplitChange = (size: unknown) => {
    const newSize = size as number[];
    console.log(newSize[1]*0.01 + 'px');
    setWidth(newSize[1]*0.01 + 'px');
    myEditor.current?.layout();
  };

  return (
    <div className="w-screen h-screen">
      <SplitPane split="vertical" onChange={onSplitChange} >
        <div className="w-full h-full bg-gray-100">
          <div className="w-full bg-black h-12 flex justify-center items-center px-4">
            <a className="text-white text-lg" href="https://www.baidu.com" target="_blank" rel="noreferrer">Geek Resume</a>
          </div>
          <div className="flex justify-center overflow-scroll" style={{ height: 'calc(100% - 48px)' }}>
            <ReactMarkdown className="A4 markdown-body">{code}</ReactMarkdown>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="w-full bg-black h-12 flex justify-between items-center px-4">
            <ul className="flex items-center text-white h-full">
              <li className="px-4 h-full flex items-center cursor-pointer border-0 border-b-2 border-green-300">
                <img className="w-6" src={svg_cn} />
                <span className="pl-4 text-sm">中文</span>
              </li>
              <li className="px-4 h-full flex items-center cursor-pointer border-0 border-green-300">
                <img className="w-6" src={svg_us} />
                <span className="pl-4 text-sm">English</span>
              </li>
            </ul>
            <ul className="w-64 flex justify-between">
              <li className="">linkin / Boss / </li>
              <li className="">Export as PDF / PNG / Markdown</li>
              <li className="cursor-pointer flex items-center" onClick={() => setDarkMode(value => !value)}>
                <span>{ darkMode ? '🌕' : '🌙' }</span>
              </li>e
            </ul>
          </div>
          <MonacoEditor
            width={width}
            height={'100%'}
            language="markdown"
            theme={darkMode ? "vs-dark" : "vs"}
            value={code}
            options={{ selectOnLineNumbers: true }}
            onChange={onMonacoChange}
            editorDidMount={editorDidMount}
          />
        </div>
      </SplitPane>
    </div>
  );
}

render(
  <App />,
  document.getElementById('root')
);

export default App;
