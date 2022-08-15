import { FC } from 'react';
import classNames from 'classnames';

const Footer: FC = () => {
  return (
    <>
      {/* https://www.geeksforgeeks.org/how-to-create-fixed-sticky-footer-on-the-bottom-using-tailwind-css/ */}
      <footer className={classNames("mt-5 backdrop-blur fixed text-xs font-light italic text-center bottom-0 left-[1vw] right-[1vw w-[98vw] pb-2")}>
        <hr className={classNames("border-[1px] border-black drop-shadow-xl mb-2")} />
        &copy; 2022, Grace de la Mora. Some rights reserved. <br className="lg:hidden" />Credits given to original author(s) where possible. <br className="lg:hidden" />Opinions published here are solely my own.
      </footer>
    </>
  );
};

export default Footer;
