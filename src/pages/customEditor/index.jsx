import React, { useState, ChangeEvent, useRef, useEffect } from "react";

import Prism from "prismjs";
import "./Style.scss";

// Importing a language
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-arduino";

// Importing a theme
import "prismjs/themes/prism-okaidia.css";

import "prismjs/plugins/line-numbers/prism-line-numbers.css";

const CustomEditor = ({ CustomCode, setCustomCode }) => {
  const language = "arduino";

  const codeElement = useRef();

  const handleChange = (event) => {
    setCustomCode(event.target.value);
  };

  const firstDivRef = useRef();
  const secondDivRef = useRef();

  const handleScrollFirst = (scroll) => {
    secondDivRef.current.scrollTop = scroll.target.scrollTop;
    console.log(scroll);
  };

  const handleScrollSecond = (scroll) => {
    firstDivRef.current.scrollTop = scroll.target.scrollTop;
    console.log(scroll);
  };

  useEffect(() => {
    if (codeElement.current) {
      Prism.highlightElement(codeElement.current);
    }
  }, [CustomCode]);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <div>
        <div className="Code-Block">
          <textarea
            onScroll={handleScrollFirst}
            ref={firstDivRef}
            className="Editor-TextArea"
            onChange={handleChange}
            value={CustomCode}
            spellcheck="false"
          ></textarea>
          <pre
            className="line-numbers Editor-Block"
            onScroll={handleScrollSecond}
            ref={secondDivRef}
          >
            <code ref={codeElement} className={`language-${language}`}>
              {CustomCode}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
};

export default CustomEditor;
