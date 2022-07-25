import { FC, useContext, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { AuthContext } from './contexts/auth/AuthContext';
import { logout } from './contexts/auth/authActions';
import { PostProvider } from './contexts/posts/PostContext';
import Posts from './components/Posts/Posts';
import CreateEditPost from './components/Posts/CreateEditPost';
import classNames from 'classnames';
import './App.css';
import logo from './logo.svg';

const App: FC = () => {
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
    <PostProvider>
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
          <li><Link to="/login">Login</Link></li>
        </ul>
      </header>
      <div id="content">
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts/new" element={<CreateEditPost />} />
          </Route>
        </Routes>
      </div>
      {/* https://www.geeksforgeeks.org/how-to-create-fixed-sticky-footer-on-the-bottom-using-tailwind-css/ */}
      <footer className={classNames("mt-5 backdrop-blur fixed text-xs font-light italic text-center bottom-0 left-[1vw] right-[1vw w-[98vw] pb-2")}>
        <hr className={classNames("border-[1px] border-black drop-shadow-xl mb-2")} />
        2022, Grace de la Mora. Some rights reserved. <br className="lg:hidden" />Credits given to original author(s) where possible. <br className="lg:hidden" />Opinions published here are solely my own.
      </footer>
    </PostProvider>
  );
};

const Home: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = state;
  return (
    <>
      {isAuthenticated && (<>Hello, $user. <a onClick={() => logout(dispatch)}>Logout?</a></>)}

      <Posts />
    </>
  );
};

export default App;
