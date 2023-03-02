import React from 'react';
// import styles from './card.module.css';
import style from "@/styles/card.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const Card = ({ name, image, stock, description, price, rating, detail, category }: any) => {
    return (
        <div className={style.card}>
            <img src={image} alt={name} className={style.image} />
            <div className={style.details}>
                <h2 className={style.name}>{name}</h2>
                <p className={style.stock}>{stock} in stock</p>
                <p className={style.price}>${price}</p>
                <div className={style.rating}>
                    <span>{rating}</span>
                    <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
                </div>
                <p className={style.detail}>{detail}</p>
                <p className={style.category}>{category}</p>
            </div>
        </div>
    );
};

export default Card;