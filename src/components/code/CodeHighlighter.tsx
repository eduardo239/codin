import React, { useEffect } from "react";
import Highlight from "react-highlight";

const CodeHighlighter = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  useEffect(() => {
    // Find all code blocks with the "hljs" class and apply syntax highlighting
  }, []);

  return <Highlight className="javascript code">{code}</Highlight>;
};

export default CodeHighlighter;
