import { useState } from "react";
import Frame from "react-frame-component";
import Split from "react-split";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import prettier from "prettier/standalone";
import parserHTML from "prettier/parser-html";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSessionStorageState } from "ahooks";
import { useHotkeys } from "react-hotkeys-hook";
import { Modal, Popover, Button, message } from "antd";
import { CopyOutlined, PictureOutlined } from "@ant-design/icons";

import RESUME from "./resume.md";

import "antd/dist/antd.less";
import "./index.css";
import "pattern.css/dist/pattern.css";

export default function IndexPage() {
  const [code, setCode] = useState(RESUME);

  const [donation, setDonation] = useSessionStorageState("user-message", "0");

  useHotkeys("up", () => {
    message.success("Up");
  });

  useHotkeys("down", () => {
    message.success("Down");
  });

  const onChange = (code: string) => setCode(code);

  const onCopy = (e: Event) => {
    if (donation !== "1") {
      Modal.info({
        title: "🎉 有你支持，我们会做的更好！",
        icon: null,
        content: (
          <div className="">
            <div className="pt-6"># 方式 1</div>
            <div className="px-4 text-gray-500 py-2 flex items-center contents-center">
              <a
                href="https://github.com/Turkyden/handsome-elements"
                target="_blank"
              >
                <img
                  className=""
                  alt="GitHub Repo stars"
                  src="https://img.shields.io/github/stars/Turkyden/handsome-elements?style=social"
                />
              </a>
              <div className="pl-4">帮忙点个 Star ⭐</div>
            </div>
            <div className="pt-6"># 方式 2</div>
            <img
              className="w-48"
              src="https://watermark-pro.vercel.app/static/wechat.22a540b9.png"
            />
          </div>
        ),
        okText: "下次再说",
      });
      setDonation("1");
    } else {
      message.success("Copyed !");
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div
        className="w-full bg-black absolute top-0 left-0 z-50 flex justify-between items-center px-10 py-2 shadow"
        style={{ backgroundColor: "rgb(36, 41, 47)" }}
      >
        <div className="flex justify-center items-center">
          <svg
            height="32"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            fill="#fff"
          >
            <path
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
          <div className="text-xl text-white font-mono pl-4">Github Resume</div>
          <a
            className="mx-4"
            href="https://github.com/Turkyden/handsome-elements"
            target="_blank"
          >
            <img
              className=""
              alt="GitHub Repo stars"
              src="https://img.shields.io/github/stars/Turkyden/handsome-elements?style=social"
            />
          </a>
        </div>

        <div className="w-16 flex justify-between items-center text-white">
          <Popover
            content={
              <div className="w-48 flex flex-wrap">
                <div className="w-24 h-24 text-center flex flex-col items-center justify-center">
                  <img
                    height="36"
                    alt="github"
                    src="https://camo.githubusercontent.com/b079fe922f00c4b86f1b724fbc2e8141c468794ce8adbc9b7456e5e1ad09c622/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f6769746875622e737667"
                  ></img>
                  <div className="text-gray-500 pt-2">滤镜</div>
                </div>
                <div className="w-24 h-24 text-center flex flex-col items-center justify-center">
                  <img
                    height="36"
                    alt="github"
                    src="https://camo.githubusercontent.com/b079fe922f00c4b86f1b724fbc2e8141c468794ce8adbc9b7456e5e1ad09c622/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f6769746875622e737667"
                  ></img>
                  <div className="text-gray-500 pt-2">社交</div>
                </div>
                <div className="w-24 h-24 text-center flex flex-col items-center justify-center">
                  <img
                    height="36"
                    alt="github"
                    src="https://camo.githubusercontent.com/b079fe922f00c4b86f1b724fbc2e8141c468794ce8adbc9b7456e5e1ad09c622/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f6769746875622e737667"
                  ></img>
                  <div className="text-gray-500 pt-2">技术</div>
                </div>
              </div>
            }
            placement="bottomRight"
            title={null}
          >
            <PictureOutlined className="cursor-pointer text-lg" />
          </Popover>
          <CopyToClipboard text={code} onCopy={onCopy}>
            <CopyOutlined
              className="cursor-pointer text-lg"
              id="copy_to_clipboard"
            />
          </CopyToClipboard>
        </div>
      </div>
      <div className="w-full h-screen flex">
        {/* <div className="w-48 bg-gray-200 pt-10 overflow-auto shadow-2xl">
          <div className="p-4">
            --
          </div>
        </div> */}
        <Split className="w-full split pt-12 " minSize={[500, 400]}>
          <div className="flex justify-center items-center bg-gray-100 relative overflow-auto | pattern-checks-sm text-gray-300">
            <Frame
              className="w-full h-full border-0 overflow-hidden"
              head={
                <>
                  <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.min.css"
                  />
                  <style>{`
                  :root {
                    --bleeding: 0.5cm;
                    --margin: 0.5cm;
                  }
                  
                  @page {
                    size: A4;
                    margin: 0;
                  }
                  
                  * {
                    box-sizing: border-box;
                  }
                  
                  body {
                    margin: 0;
                  }

                  .A4Wrapper{
                    display: flex;
                  }
                  
                  .A4 {
                    display: inline-block;
                    position: relative;
                    /* height: 297mm; */
                    width: 210mm;
                    font-size: 12pt;
                    margin: 2em auto;
                    padding: calc(var(--bleeding) + var(--margin));
                    box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
                    background: white;
                  }
                  
                  @media screen {
                    .A4::after {
                      position: absolute;
                      content: '';
                      top: 0;
                      left: 0;
                      width: calc(100% - var(--bleeding) * 2);
                      height: calc(100% - var(--bleeding) * 2);
                      margin: var(--bleeding);
                      outline: thin dashed black;
                      pointer-events: none;
                      z-index: 9999;
                    }
                  }
                  
                  @media print {
                    .A4Wrapper{
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100%;
                      display: flex;
                      flex-direction: column;
                      background: #fff;
                      z-index: 99999;
                      margin: 0 auto;
                      overflow-y: auto;
                    }
                    .A4 {
                      margin: 0;
                      overflow: hidden;/
                  }
                  `}</style>
                </>
              }
            >
              <div className="A4Wrapper">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw, gfm]}
                  className="A4 markdown-body"
                >
                  {code}
                </ReactMarkdown>
              </div>
            </Frame>
          </div>
          <Editor
            height="calc(100% - 0px)"
            defaultLanguage="markdown"
            theme="vs-dark"
            value={code}
            onChange={onChange}
            onMount={(editor, monaco) => {
              console.log(editor, monaco);
              editor.addCommand(
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_C,
                () => {
                  document.querySelector("#copy_to_clipboard")?.click();
                }
              );
              editor.onContextMenu((e, a) => {
                console.log(e, a);
              });
            }}
          />
        </Split>
      </div>
    </div>
  );
}
