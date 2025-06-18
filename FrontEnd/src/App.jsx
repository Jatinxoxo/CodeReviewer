import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from 'react-simple-code-editor';
import prims from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github.css'; // Import a highlight.js theme


import { use } from "react";

const App = () => {
  const [code, setCode] = useState("");
  const [count, setCount] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    prims.highlightAll();
  }, []);

   async function reviewCode(){

    

      const response = await axios.post('http://localhost:3000/ai/get-review', { code });

      setReview(response.data);
   }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => prims.highlight(code, prims.languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                color: "#abb2bf",
              }}
            />
          </div>
          <button id="bottone1"
            onClick={reviewCode}>
            <strong>Review</strong>
          </button>
        </div>
        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
          >{review}</Markdown>
        </div>
      </main>
    </>
  );
};

export default App;
