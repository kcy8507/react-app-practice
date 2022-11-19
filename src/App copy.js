import logo from "./logo.svg";
import "./App.css";
import Counter from "./Counter";
import React, { useEffect, useState } from "react";
import Header from "./components/header";

function Nav({ topics = [], onChangeMode }) {
  console.log(topics);
  const lis = topics.map((t, i) => {
    return (
      <li>
        <a
          onClick={() => {
            onChangeMode(i + 1);
          }}
        >
          {t.title}
        </a>
      </li>
    );
  });

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article({ title, body, id, content }) {
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          {" "}
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          {" "}
          <textarea name="body" palceholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Creat"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [search, setSearch] = useState("");
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ]);

  // useEffect(() => {
  //   if (id === 1) {
  //     alert("1번 클릭하셨네요");
  //   }
  //   return () => {
  //     alert("dkssud");
  //   };
  // }, [id]);

  // useEffect(() => {}, []);
  // let content = null;

  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {mode == "WELCOME" && <Article id={1} title="Welcome" body="Hello, Web"></Article>}
      {mode == "READ" && <Article {...topics[id - 1]} />}
      {mode == "CREATE" && (
        <Create
          onCreate={(_title, _body) => {
            const newTopic = { id: nextId, title: _title, body: _body };
            const newTopics = [...topics];
            newTopics.push(newTopic);
            setTopics(newTopics);
          }}
        ></Create>
      )}
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode("CREATE");
        }}
      >
        create
      </a>
    </div>
  );
}

export default App;
