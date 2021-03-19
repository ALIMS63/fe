import React, { useState, useEffect, useContext } from "react";
import { Container } from "../../globalStyles";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import {
  MenuBtn,
  HeaderWrap,
  HeaderInner,
  HeaderLogo,
  HeaderMenu,
} from "./Header.elements";
import { Button } from "../Button/Button";
import { Nav } from "./Nav";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { AppContext } from "../../context/HubContext";

export const Header = () => {
  const [header, setHeader] = useState(false);
  const [open, setOpen] = useState(false);
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const logOut = appContext.logOut;
  const admin = appContext.isAdmin;
  let history = useHistory();
  let location = useLocation();

  function handleClick() {
    if (!user) {
      history.push("/login");
    } else {
      history.push("/info");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHeader(true);
      } else {
        setHeader(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const toAdmin = () => {
    history.push("/admin");
  };

  return (
    <HeaderWrap header={header}>
      <Container>
        <HeaderInner>
          <HeaderLogo href="/">
            <Logo />
          </HeaderLogo>
          <MenuBtn open={open} onClick={() => setOpen(!open)}>
            <span></span>
            <span></span>
          </MenuBtn>
          <HeaderMenu open={open}>
            <Nav
              onClose={onClose}
              handleClick={handleClick}
              user={user}
              logOut={logOut}
              location={location.pathname}
              admin={admin}
            />
          </HeaderMenu>
          {admin && (
            <Button danger onClick={toAdmin}>
              Админка
            </Button>
          )}
          {location.pathname === "/" ? (
            <Button onClick={handleClick}>Личный кабинет</Button>
          ) : user ? (
            <Button onClick={logOut}>Выйти</Button>
          ) : (
            <>
              <Button onClick={handleClick}>Личный кабинет</Button>
            </>
          )}
        </HeaderInner>
      </Container>
    </HeaderWrap>
  );
};

const Btn = styled(Button)``;

const LinkButton = styled(Btn)``;
