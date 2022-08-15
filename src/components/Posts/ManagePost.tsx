import { ChangeEvent, FC, MouseEvent, useContext, useEffect, useState } from 'react';
import { Post } from './types';
import { PostContext } from './PostContext';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faHeading,
  faItalic,
  faStrikethrough,
  faLink,
  faQuoteLeft,
  faCode,
  faListUl,
  faListOl,
  faImage,
  faEye,
  faEyeSlash,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

const ManagePost: FC = () => {
  const { state, dispatch } = useContext(PostContext);
  const [formData, setFormData] = useState<Post>({
    title: '',
    body: '',
    slug: '',
    isPrivate: false,
    isDraft: false,
    categories: '',
    tags: '',
  });
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const { title, body, slug, isPrivate, isDraft, categories, tags } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clickInsert = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const button: HTMLButtonElement = e?.currentTarget!;
    const buttonData = button.dataset;
    const target: HTMLTextAreaElement = document.querySelector(button!.parentElement!.dataset.target as string)!;
    const appendString: string = buttonData.markdown! + (buttonData.enclose ? null : ' ');
    const wrapString: string = `${buttonData.markdown}text${buttonData.markdown}`;
    target.focus();
    const [start, end] = [target.selectionStart, target.selectionEnd];
    target.setRangeText(
      buttonData.enclose ? wrapString : appendString,
      start,
      end,
      buttonData.enclose ? 'select' : 'end');
  };

  const togglePreview = () => {
    let list = ['#new-post-header', '.post-viewer', '.post-editor'];
    const toggleHidden = () => {
      list.forEach(item => {
        document.querySelector(item)?.classList.toggle('hidden');
      });
    }
    toggleHidden();
    setShowPreview(!showPreview);
  };

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <div className={classNames("w-11/12 md:w-8/12 m-auto flex flex-col")}>
      <h1 id="new-post-header">Create A Post</h1>
      <form>
        <div className="post-viewer hidden">
          {title && <h1>{title}</h1>}
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{body || 'Nothing to see here! Close the preview to start writing!'}</ReactMarkdown>
        </div>
        <div className="post-editor">
        <input type="text" name="title" placeholder="Post Title" value={title} onChange={handleChange} />
        <div className="flex flex-wrap button-group justify-evenly" data-target="#create-a-post">
          <button type="button" onClick={clickInsert} data-markdown="#">
            <FontAwesomeIcon icon={faHeading} />
            <sub className="font-serif">1</sub>
          </button>
          <button type="button" onClick={clickInsert} data-markdown="##">
            <FontAwesomeIcon icon={faHeading} />
            <sub className="font-serif">2</sub>
          </button>
          <button type="button" onClick={clickInsert} data-markdown="###">
            <FontAwesomeIcon icon={faHeading} />
            <sub className="font-serif">3</sub>
          </button>
          <button type="button" onClick={clickInsert} data-markdown="####">
            <FontAwesomeIcon icon={faHeading} />
            <sub className="font-serif">4</sub>
          </button>
          <button type="button" onClick={clickInsert} data-markdown="#####">
            <FontAwesomeIcon icon={faHeading} />
            <sub className="font-serif">5</sub>
          </button>
          <button type="button" onClick={clickInsert} data-markdown="**" data-enclose={true}>
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button type="button" onClick={clickInsert} data-markdown="*" data-enclose={true}>
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button type="button" onClick={clickInsert} data-markdown="~~" data-enclose={true}>
            <FontAwesomeIcon icon={faStrikethrough} />
          </button>
          <button type="button" onClick={clickInsert} data-markdown="[Link](https://)">
            <FontAwesomeIcon icon={faLink} />
          </button>
          <button type="button" onClick={clickInsert} data-markdown="![Image](https://)">
            <FontAwesomeIcon icon={faImage} />
          </button>
          <button type="button" onClick={clickInsert} data-markdown="`" data-enclose={true}>
            <FontAwesomeIcon icon={faCode} />
          </button>
          <button type="button" onClick={clickInsert} data-markdown="```" data-enclose={true}>
            <FontAwesomeIcon icon={faSquare} />
          </button>
          <button type="button" onClick={clickInsert} data-markdown=">">
            <FontAwesomeIcon icon={faQuoteLeft} />
          </button>
          <button type="button" onClick={clickInsert} data-markdown="1. ">
            <FontAwesomeIcon icon={faListOl} />
          </button>
          <button type="button" onClick={clickInsert} data-markdown="* ">
            <FontAwesomeIcon icon={faListUl} />
          </button>
        </div>
        <textarea id="create-a-post" name="body" placeholder="Post Content" value={body} onChange={handleChange} />
        </div>
        <div className="flex flex-wrap button-group justify-between">
          <button className="preview" type="button" onClick={() => togglePreview()}>
            <FontAwesomeIcon icon={showPreview ? faEyeSlash : faEye} /><span className="uppercase text-xs">{showPreview ? ' Close' : ' Open'} Preview</span>
          </button>
          <div className="flex justify-center rounded-lg text-lg" role="group">
            <button type="submit" onClick={() => setFormData({...formData, isPrivate: true, isDraft: true})} className="link-button">Save as Draft</button>
            <button type="submit" onClick={() => setFormData({...formData, isPrivate: false, isDraft: false})}>Publish</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManagePost;
