import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchData } from '../../store/actions';
import './WelcomeComponent.css';

const WelcomeComponent = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1>Добро пожаловать в Цифрового Тьютора!</h1>
      <p className="description">
        Ваш универсальный помощник для учёбы и адаптации в университете
      </p>
      <div className="button-panel">
        <Link to="/chat">
          <button
            onClick={() => dispatch(fetchData())}
            className="button button-primary"
          >
            Начать чат
          </button>
        </Link>
      </div>
    </>
  );
};

export default WelcomeComponent;
