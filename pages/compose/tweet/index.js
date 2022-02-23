import { useEffect, useState } from 'react';
import Button from '@c/Button';
import useUser from 'hooks/useUser';
import { getDownloadURL } from 'firebase/storage';

import { addDevit, uploadImage } from 'firebase/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Avatar } from '@c/Avatar';

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const user = useUser();
  const router = useRouter();
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [message, setMessage] = useState('');
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (task) {
      let onProgress = () => {};
      let onError = () => {};
      let onComplete = () => {
        console.log('on compleeteee');
        getDownloadURL(task.snapshot.ref).then(setImgURL);
        console.log(task);
      };
      task.on('state_changed', onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => router.push('/home'))
      .catch((err) => {
        console.log(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];

    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;
  return (
    <>
      <Head>
        <title>Crear un Devit / Devter</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué está pasando?"
            value={message}
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>

      <style jsx>{`
        div {
          padding: 15px;
        }

        button {
          background: rgba(0, 0, 0, 0.3)
          border: 0;
          border-radius: 999px;
          color: #fff;
          font-size: 24px;
          width: 32px;
          height: 32px;
          top: 15px;
          position: absolute;
          right: 15px;
        }

        .avatar-container {
          padding-left: 10px;
          padding-top: 20px;
        }

        .form-container {
          display: flex;
          align-items: flex-start;
        }

        form {
          padding: 10px;
        }

        .remove-img {
          position: relative;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }

        textarea {
          border: ${
            drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? '3px dashed #09f'
              : '3px solid transparent'
          };
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  );
}
