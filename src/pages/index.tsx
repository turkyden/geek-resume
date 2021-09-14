import { useEffect, useRef, useState, useCallback } from "react";
import Frame from "react-frame-component";
import Split from "react-split";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useSessionStorageState } from "ahooks";
import { Modal, Tooltip, Popover, Button, message } from "antd";
import {
  PictureOutlined,
  InsertRowAboveOutlined,
  InsertRowLeftOutlined,
  TableOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import * as utils from "@/utils";

import RESUME from "../../RESUME.md";

import "antd/dist/antd.less";
import "./index.css";
import "pattern.css/dist/pattern.css";

function MySplit({
  direction,
  children,
}: {
  direction: "vertical" | "horizontal" | "full";
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (direction === "vertical") {
      document.querySelector(".monaco-view").style.height = "calc(60% - 5px)";
      document.querySelector(".monaco-view").style.width = "100%";
      document.querySelector(".monaco-editor").style.height = "calc(40% - 5px)";
      document.querySelector(".monaco-editor").style.width = "100%";
      if (!document.querySelector(".gutter")) return;
      document
        .querySelector(".gutter")
        .classList.replace("gutter-horizontal", "gutter-vertical");
      document.querySelector(".gutter").style.height = "10px";
      document.querySelector(".gutter").style.width = "100%";
    } else if (direction === "horizontal") {
      document.querySelector(".monaco-view").style.width = "calc(60% - 5px)";
      document.querySelector(".monaco-view").style.height = "100%";
      document.querySelector(".monaco-editor").style.height = "calc(40% - 5px)";
      document.querySelector(".monaco-editor").style.height = "100%";
      if (!document.querySelector(".gutter")) return;
      document
        .querySelector(".gutter")
        .classList.replace("gutter-vertical", "gutter-horizontal");
      document.querySelector(".gutter").style.height = "100%";
      document.querySelector(".gutter").style.width = "10px";
    } else {
    }
  }, [direction]);

  if (direction === "vertical") {
    return (
      <Split
        className="w-full h-full pt-12"
        direction="vertical"
        minSize={0}
        sizes={[60, 40]}
      >
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
        sizes={[60, 40]}
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
  const ref = useRef(undefined);

  const [code, setCode] = useState(RESUME);

  const [donation, setDonation] = useSessionStorageState("user-message", "0");

  const [direction, setDirection] = useState("horizontal");

  const print = useCallback((e: Event) => {
    if (true) {
      Modal.info({
        title: (
          <span>
            MD Resume is made with heart by{" "}
            <a
              className="underline"
              target="_blank"
              href="https://github.com/Turkyden"
            >
              @Turkyden
            </a>
          </span>
        ),
        icon: null,
        maskClosable: true,
        centered: true,
        okText: "Download PDF",
        content: (
          <div>
            <p className="text-center">Glad it helps!</p>
            <p className="text-center">A few ways to say thank you 👇</p>
            <div className="space-y-6">
              <div className="transform hover:scale-105 transition duration-1s ease-in-out flex justify-center items-center contents-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-90 hover:opacity-100 rounded-full py-2 shadow-xl cursor-pointer ">
                <a
                  className="text-white hover:text-white"
                  target="_blank"
                  href="https://github.com/Turkyden"
                >
                  ❤️ Sponsor me on gitHub
                </a>
              </div>
              <div className="transform hover:scale-105 transition duration-1s ease-in-out flex justify-center items-center contents-center bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 opacity-90 hover:opacity-100 rounded-full py-2 shadow-xl cursor-pointer ">
                <a
                  className="text-white hover:text-white"
                  target="_blank"
                  href="https://github.com/Turkyden"
                >
                  😉 Follow me on gitHub
                </a>
              </div>
              <div className="transform hover:scale-105 transition duration-1s ease-in-out flex justify-center items-center contents-center bg-gray-600 hover:bg-gray-700 rounded-full py-2 text-white shadow-xl cursor-pointer ">
                <a
                  className="text-white hover:text-white"
                  target="_blank"
                  href="https://github.com/Turkyden/md-resume"
                >
                  ⭐ Star the interesting project
                </a>
              </div>
            </div>
            {/* <img
              className="w-full"
              src="https://watermark-pro.vercel.app/static/wechat.22a540b9.png"
            /> */}
          </div>
        ),
        onOk: () => utils.print(ref.current, "应聘岗位-求职者-联系方式.pdf"),
      });
      setDonation("1");
    } else {
      utils.print(ref.current, "应聘岗位-求职者-联系方式.pdf");
    }
  }, []);

  return (
    <div
      className="w-screen h-screen overflow-hidden"
      style={{ backgroundColor: "#1e1e1e" }}
    >
      <div
        className="w-full h-12 bg-black absolute top-0 left-0 z-50 flex justify-between items-center px-10 py-2 shadow-lg"
        style={{ backgroundColor: "rgb(36, 41, 47)" }}
      >
        <div className="flex justify-center items-center">
          <a
            className="text-xl font-mono mx-2 transition-all font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-500 border-0 border-b border-dotted no-underline border-red-500 hover:opacity-80 hover:text-transparent"
            href="https://github.com/Turkyden/md-resume"
            target="_blank"
          >
            MD RESUME
          </a>
          {/* <a
            className="ml-4"
            href="https://github.com/Turkyden/md-resume"
            target="_blank"
          >
            <img
              className=""
              alt="GitHub Repo stars"
              src="https://img.shields.io/github/stars/Turkyden/md-resume?style=social"
            />
          </a> */}
        </div>

        <div className="flex space-x-6 justify-between items-center text-gray-400">
          <span
            className={`flex items-center transition duration-1s ease-in-out hover:text-white ${
              direction === "vertical"
                ? "text-yellow-500 hover:text-yellow-500"
                : ""
            }`}
          >
            <InsertRowAboveOutlined
              className="cursor-pointer text-lg"
              onClick={() => setDirection("vertical")}
            />
          </span>
          <span
            className={`flex items-center transition duration-1s ease-in-out hover:text-white ${
              direction === "horizontal"
                ? "text-yellow-500 hover:text-yellow-500"
                : ""
            }`}
          >
            <InsertRowLeftOutlined
              className="cursor-pointer text-lg"
              onClick={() => setDirection("horizontal")}
            />
          </span>
          <span
            className={`flex items-center transition duration-1s ease-in-out hover:text-white ${
              direction === "full"
                ? "text-yellow-500 hover:text-yellow-500"
                : ""
            }`}
          >
            <TableOutlined
              className="cursor-pointer text-lg"
              onClick={() => setDirection("full")}
            />
          </span>
          <div className="w-1 h-4 border-solid border-0 border-l border-gray-500"></div>
          {/* <Popover
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
          </Popover> */}
          <PrinterOutlined
            title="Export as PDF"
            className="transition duration-1s ease-in-out hover:text-white cursor-pointer text-lg"
            onClick={print}
          />
          <a
            className="ml-4"
            href="https://github.com/Turkyden/md-resume"
            target="_blank"
          >
            <img
              className=""
              alt="GitHub Repo stars"
              src="https://img.shields.io/github/stars/Turkyden/md-resume?style=social"
            />
          </a>
        </div>
      </div>
      <MySplit direction={direction}>
        <div className="monaco-view flex bg-gray-100 relative overflow-auto | pattern-checks-sm text-gray-300">
          <div className="m-auto A4Wrapper">
            <div ref={ref} className="A4">
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
          onChange={setCode}
          // onMount={(editor, monaco) => {
          //   console.log(editor, monaco);
          //   editor.addCommand(
          //     monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_C,
          //     () => {
          //       document.querySelector("#copy_to_clipboard")?.click();
          //     }
          //   );
          //   editor.onContextMenu((e, a) => {
          //     console.log(e, a);
          //   });
          // }}
        />
      </MySplit>
    </div>
  );
}
