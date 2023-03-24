import { useCallback, useEffect, useState } from 'react';
import s from './forms.module.css'
import { useForm } from 'react-hook-form';

function Comments(idProroduct) {
  const [comment, setComment] = useState([])
  const [addComment, setAddComment] = useState();
  const [value, setValue] = useState("");
  const id = Object.values(idProroduct)[0];

  const {register, handleSubmit, formState: {errors} } = useForm();
  const getComments = () =>{
    return fetch (`https://api.react-learning.ru/products/review/${id}`, {
    method: 'GET',  
    headers: {
        Authorization: `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(result => {
      setComment(result);
    }    );
  }
  const postComment = (addComment) => {
    return fetch (`https://api.react-learning.ru/products/review/${id}`, {
    method: 'POST',  
    headers: {
        Authorization: `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }, 
    body: JSON.stringify(addComment)
    }).then(response => response.json())
    .then(result => {
      setComment(result.reviews)
      console.log(result.reviews);
    }    );
  }

useEffect(() => {
  getComments()
}, [])

const onSubmit = (data) => {
  setAddComment(data);
  postComment(data);
  setValue(' ');
  getComments()
}

  const content = comment.map((el) => 
  <div  key={el.author.created_at}>
    <div >
      <h3>{el.author.name}</h3>
      <p>Опубликованно {el.created_at.replace(/[a-zа-яё]/gi, ' ').slice(0, -5).replace(' ', ' в ').replace(/\-/gi, '.' )}</p>
      </div>
    <p>рейтинг: {el.rating}</p>
    <p>{el.text}</p>
  </div>
  );

  return (
    <>
    {content}
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Ваш комментарий:</h3>
      <textarea {...register('text')}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      />
      <button>Отправить</button>
    </form>
    </>
  );
  }

export default Comments;
