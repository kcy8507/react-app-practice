import logo from "./logo.svg";
import "./App.css";
import Counter from "./Counter";
import React, { useEffect, useState } from "react";
import Header from "./components/header";

const Card = ({ topics = [], onChangeMode }) => {
  // const topics = [
  //   { title: "김채연", body: "김채연이 쓴 글이다." },
  //   { title: "이가현", body: "이가현이 쓴 글이다." },
  //   { title: "이예림", body: "이예림이 쓴 글이다." },
  // ];
  const lis = topics.map((t, i) => {
    return (
      <div>
        <h2
          onClick={() => {
            onChangeMode(i + 1);
          }}
        >
          {t.title}
        </h2>
        <p>{t.body}</p>
      </div>
    );
  });
  return <div>{lis}</div>;
};

const Create = (props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onCreate(title, body);
      }}
    >
      <p>
        <input type="text" name="title" placeholder="이름"></input>
      </p>
      <p>
        <textarea name="body" placeholder="내용"></textarea>
      </p>
      <input type="submit" value="Create"></input>
    </form>
  );
};

const App = () => {
  const [mode, setMode] = useState("READ");
  const [topics, setTopics] = useState([
    { title: "김채연", body: "김채연이 쓴 글이다." },
    { title: "이가현", body: "이가현이 쓴 글이다." },
    { title: "이예림", body: "이예림이 쓴 글이다." },
  ]);

  console.log(mode);
  return (
    <div>
      <Card
        topics={topics}
        onChangeMode={() => {
          setMode("READ");
        }}
      ></Card>
      {mode == "READ" &&
        ((<Card {...topics}></Card>),
        (
          <div
            onClick={(e) => {
              e.preventDefault();
              setMode("CREATE");
            }}
          >
            +
          </div>
        ))}
      {mode == "CREATE" && (
        <Create
          onCreate={(title, body) => {
            const newTopic = { title: title, body: body };
            const newTopics = [...topics];
            newTopics.push(newTopic);
            setTopics(newTopics);
            setMode("BACK");
          }}
        ></Create>
      )}
      {mode == "BACK" && (
        <div
          onClick={(e) => {
            e.preventDefault();
            setMode("CREATE");
          }}
        >
          +
        </div>
      )}
    </div>
  );
};

export default App;
