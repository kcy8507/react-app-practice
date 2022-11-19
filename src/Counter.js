import React, { useState } from "react";
import { Button } from "antd";

const increaseValidate = (number, limit, setNumber) => {
  if (number >= limit) {
    alert(`${limit} 이상은 안된다`);
    setNumber(parseInt(prompt("원하는 값을 설정해주세요")));
    return false;
  }
  return true;
};
const decreaseValidate = (number, limit) => {
  if (number <= limit) {
    alert("이 이하는 안된다");
    return false;
  }
  return true;
};
function Counter() {
  const [number, setNumber] = useState(0);
  const onIncrease = () => {
    if (increaseValidate(number, 10, setNumber)) {
      setNumber((prevNumber) => prevNumber + 1);
    }
    // setNumber(number + 1);
  };
  const onDecrease = () => {
    if (decreaseValidate(number, -3)) {
      setNumber((prevNumber) => prevNumber - 1);
    }
    console.log("-1");
    // setNumber((prevNumber) => prevNumber - 1);
    // setNumber(number - 1);
  };
  const onReset = () => {
    console.log("reset");
    setNumber((number) => 0);
    // setNumber((prevNumber) => 0);
  };
  return (
    <div>
      <h1>{number}</h1>
      <Button type="primary" onClick={onIncrease}>
        +1
      </Button>
      <Button type="dashed" onClick={onDecrease}>
        -1
      </Button>
      <Button onClick={onReset}>RESET</Button>
    </div>
  );
}
export default Counter;
