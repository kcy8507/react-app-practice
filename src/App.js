import logo from "./logo.svg";
import "./App.css";
import Counter from "./Counter";
import React, { useEffect, useState } from "react";
import Header from "./components/header";

import { Card } from "antd";
import { Button, Space } from "antd";
import { Input } from "antd";
const { TextArea } = Input;

const CardWrap = ({ topics = [], onChangeMode }) => {
  // const topics = [
  //   { title: "김채연", body: "김채연이 쓴 글이다." },
  //   { title: "이가현", body: "이가현이 쓴 글이다." },
  //   { title: "이예림", body: "이예림이 쓴 글이다." },
  // ];
  const lis = topics.map((t, i) => {
    return (
      <div className="site-card-border-less-wrapper">
        <Card
          type="inner"
          title={t.title}
          bordered={false}
          style={{
            width: `${100}%`,
          }}
        >
          <p>{t.body}</p>
        </Card>
      </div>
    );
  });
  return <div>{lis}</div>;
};

const Create = (props) => {
  const onChange = (e) => {
    console.log(e);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onCreate(title, body);
      }}
    >
      <>
        <Input name="title" placeholder="이름" allowClear onChange={onChange} />
        <br />
        <br />
        <TextArea name="body" placeholder="내용" allowClear onChange={onChange} />
      </>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Button type="primary" htmlType="submit" block>
          글 쓰기
        </Button>
      </Space>
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
      <CardWrap
        topics={topics}
        onChangeMode={() => {
          setMode("READ");
        }}
      ></CardWrap>
      {mode == "READ" &&
        ((<CardWrap {...topics}></CardWrap>),
        (
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
            onClick={(e) => {
              e.preventDefault();
              setMode("CREATE");
            }}
          >
            <Button type="dashed" block>
              +
            </Button>
          </Space>
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
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          onClick={(e) => {
            e.preventDefault();
            setMode("CREATE");
          }}
        >
          <Button type="dashed" block>
            +
          </Button>
        </Space>
      )}
    </div>
  );
};

export default App;
