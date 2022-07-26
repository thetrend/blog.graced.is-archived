import { AuthContext } from '../Auth/AuthContext';
import { FC, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../logo.svg';
import setAuthToken from '../../utils/setAuthToken';

const Header: FC = () => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;
  const [isShrunk, setShrunk] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // https://phuctm97.com/blog/auto-shrink-header-on-scroll
    const handleScroll = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50)
        ) {
          return true;
        }

        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }

        return isShrunk;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  return (
    <header className={
      classNames(
        "sticky top-0 z-10 py-2 my-4 md:my-6 transition duration-500 flex lg:flex-row flex-col",
        { "backdrop-blur": isShrunk }
      )
    }>
      <img src={logo} className={
        classNames(
          "w-full lg:w-9/12 xl:w-10/12 transition duration-75 ease-in-out",
          (isShrunk ?
            "max-h-[10vh] lg:max-h-[12vh]" :
            "max-h-[18vh] lg:max-h-[20vh]"
          )
        )
      } />
      <ul className={classNames("lg:border-l-4 border-black topNav lg:w-3/12 xl:w-2/12 lg:flex-col flex flex-row uppercase font-extralight justify-center place-items-center")}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li>{isAuthenticated ? <Link to="/login">Login</Link> : <Link to="/posts/new">New Post</Link>}</li>
      </ul>
    </header>
  );
};

export default Header;
