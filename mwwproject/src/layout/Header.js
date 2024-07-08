import { useState } from "react";
import Button from "./css/Button";
import ButtonDiv from "./css/ButtonDiv";
import Container from "./css/Container";
import Wrapper from "./css/Wrapper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";

const Header = () => {
  const [isLggdeIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const handleLogout = () => {
    dispatch(logout());
  };
  console.log(user);
  return (
    <>
      <Wrapper>
        <Container>
          <Link to="/">
            <img src={process.env.PUBLIC_URL + "/logo-mind.png"}></img>
          </Link>
          {!user ? (
            <ButtonDiv>
              <Button to="login">로그인</Button>
            </ButtonDiv>
          ) : (
            <div>{user.nickname}</div>
          )}
        </Container>
      </Wrapper>
    </>
  );
};
export default Header;
