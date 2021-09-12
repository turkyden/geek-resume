import { useEffect, useState } from "react";
import Frame from "react-frame-component";
import Split from "react-split";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useSessionStorageState } from "ahooks";
import { Modal, Popover, Button, message } from "antd";
import {
  PictureOutlined,
  InsertRowAboveOutlined,
  InsertRowLeftOutlined,
  TableOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

import RESUME from "../../README.md";

import "antd/dist/antd.less";
import "./index.css";
import "pattern.css/dist/pattern.css";

function MySplit({ direction, children }) {
  useEffect(() => {
    if (direction === "vertical") {
      document.querySelector(".monaco-view").style.height = "calc(50% - 5px)";
      document.querySelector(".monaco-view").style.width = "auto";
      document.querySelector(".monaco-editor").style.height = "calc(50% - 5px)";
      document.querySelector(".monaco-editor").style.width = "auto";
      if (!document.querySelector(".gutter")) return;
      document
        .querySelector(".gutter")
        .classList.replace("gutter-horizontal", "gutter-vertical");
      document.querySelector(".gutter").style.height = "10px";
      document.querySelector(".gutter").style.width = "auto";
    } else if (direction === "horizontal") {
      document.querySelector(".monaco-view").style.width = "calc(50% - 5px)";
      document.querySelector(".monaco-view").style.height = "auto";
      document.querySelector(".monaco-editor").style.height = "calc(50% - 5px)";
      document.querySelector(".monaco-editor").style.height = "auto";
      if (!document.querySelector(".gutter")) return;
      document
        .querySelector(".gutter")
        .classList.replace("gutter-vertical", "gutter-horizontal");
      document.querySelector(".gutter").style.height = "auto";
      document.querySelector(".gutter").style.width = "10px";
    } else {
    }
  }, [direction]);

  if (direction === "vertical") {
    return (
      <Split className="w-full h-full pt-12" direction="vertical" minSize={0}>
        {children}
      </Split>
    );
  }
  if (direction === "horizontal") {
    return (
      <Split
        className="w-full h-full pt-12 flex"
        direction="horizontal"
        minSize={0}
      >
        {children}
      </Split>
    );
  }
  return (
    <div className="w-screen h-screen pt-12 overflow-auto">{children[0]}</div>
  );
}

export default function IndexPage() {
  const [code, setCode] = useState(RESUME);

  const [donation, setDonation] = useSessionStorageState("user-message", "0");

  const [direction, setDirection] = useState("horizontal");

  const onChange = (code: string) => setCode(code);

  const print = (e: Event) => {
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
        onOk: () => window.print(),
        onCancel: () => window.print(),
        okText: "下次再说",
      });
      setDonation("1");
    } else {
      window.print();
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div
        className="w-full bg-black absolute top-0 left-0 z-50 flex justify-between items-center px-10 py-2 shadow"
        style={{ backgroundColor: "rgb(36, 41, 47)" }}
      >
        <div className="flex justify-center items-center">
          <div className="text-xl text-white font-mono pl-4">MD RESUME</div>
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

        <div className="flex space-x-6 justify-between items-center text-white">
          <InsertRowAboveOutlined
            className="cursor-pointer text-lg"
            onClick={() => setDirection("vertical")}
          />
          <InsertRowLeftOutlined
            className="cursor-pointer text-lg"
            onClick={() => setDirection("horizontal")}
          />
          <TableOutlined
            className="cursor-pointer text-lg"
            onClick={() => setDirection("full")}
          />
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
                  <div className="text-gray-500 pt-2">徽标</div>
                </div>
              </div>
            }
            placement="bottomRight"
            title={null}
          >
            <PictureOutlined className="cursor-pointer text-lg" />
          </Popover>
          <PrinterOutlined className="cursor-pointer text-lg" onClick={print} />
        </div>
      </div>
      <MySplit direction={direction}>
        <div className="monaco-view flex bg-gray-100 relative overflow-auto | pattern-checks-sm text-gray-300">
          <div className="m-auto A4Wrapper">
            <div className="A4">
              <Frame
                className="w-full border-0 overflow-hidden"
                style={{ height: 1020 }}
                head={
                  <>
                    <link
                      rel="stylesheet"
                      href="https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.min.css"
                    />
                    <style>{`
                      *{ margin: 0 }
                      body{ overflow: hidden }
                    `}</style>
                  </>
                }
              >
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw, gfm]}
                  className="markdown-body"
                  components={{
                    // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
                    a: ({ node, ...props }) => (
                      <a target="__blank" {...props} />
                    ),
                  }}
                >
                  {code}
                </ReactMarkdown>
              </Frame>
            </div>
          </div>
        </div>
        <Editor
          wrapperClassName="monaco-editor"
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
      </MySplit>
    </div>
  );
}
