import React, { useState, useRef } from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import SplitPane from 'react-split-pane';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import './A4.css';
import resume_cn from './resume_cn.md';
import resume_us from './resume_us.md';
import svg_cn from './cn.svg';
import svg_us from './us.svg'

function App() {
  const [zNMode, setZNMode] = useState(true);

  const [resumeCN, setResumeCN] = useState(resume_cn);

  const [resumeUS, setResumeUS] = useState(resume_us);

  const code = zNMode ? resumeCN : resumeUS;
  
  const [darkMode, setDarkMode] = useState(true);

  const myEditor = useRef<monaco.editor.IStandaloneCodeEditor>();

  const [width, setWidth] = useState('100%');

  const editorDidMount = (editor: monaco.editor.IStandaloneCodeEditor): void => {
    myEditor.current = editor;
    myEditor.current.focus();
    myEditor.current.updateOptions({
      minimap: {
        enabled: false
      }
    })
  }

  const onMonacoChange = (newValue: any) => zNMode ? setResumeCN(newValue) : setResumeUS(newValue);

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
          <div className="w-full bg-purple-700 h-12 flex justify-center items-center px-4">
            <a className="text-white text-lg no-underline" href="https://www.baidu.com" target="_blank" rel="noreferrer">Geek Resume</a>
          </div>
          <div className="flex justify-center overflow-scroll" style={{ height: 'calc(100% - 48px)' }}>
            <div className="A4Wrapper">
              <ReactMarkdownWithHtml plugins={[gfm]} allowDangerousHtml className="A4 markdown-body" >
                {code}
              </ReactMarkdownWithHtml>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="w-full bg-purple-700 h-12 flex justify-between items-center px-4">
            <ul className="flex items-center text-white h-full list-none">
              <li 
                className={`px-2 mx-2 h-full flex items-center cursor-pointer border-solid border-0 border-b-2 ${ zNMode ? 'border-green-300' : 'border-transparent' }`} 
                onClick={() => setZNMode(true)}
              >
                <img className="w-4" src={svg_cn} alt="zh-cn" />
                <span className="pl-4 text-sm">中文</span>
              </li>
              <li 
                className={`px-2 mx-2 h-full flex items-center cursor-pointer border-solid border-0 border-b-2 ${ !zNMode ? 'border-green-300' : 'border-transparent' }`}
                onClick={() => setZNMode(false)}
              >
                <img className="w-4" src={svg_us} alt="us" />
                <span className="pl-4 text-sm">English</span>
              </li>
            </ul>
            <ul className="flex justify-between list-none">
              {/* <li className="">linkin / Boss / </li>
              <li className="">Export as PDF / PNG / Markdown</li> */}
              <li className="cursor-pointer text-white pr-4" onClick={() => window.print()}>
                <span>🖨️</span>
              </li>
              <li className="cursor-pointer flex items-center" onClick={() => setDarkMode(value => !value)}>
                <span>{ darkMode ? '🌕' : '🌙' }</span>
              </li>
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
