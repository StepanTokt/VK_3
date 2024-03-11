import "./style.css";
import { useContext } from "react";
import { SearchContext } from "./SearchContext";
import face from '../../img/face.png'

export function UserCard() {
  const person = useContext(SearchContext);

  return (
    <div className="userCard">
      <img src={face} alt="" className="userPic" />
      <div className="userInfo">
        <div>Name: {person.person.name}</div>
        <div>Age:{person.person.age}</div>
        <div>Count: {person.person.count}</div>
      </div>
    </div>
  );
}
