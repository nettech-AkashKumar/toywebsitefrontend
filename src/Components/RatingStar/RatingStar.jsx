import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { Container, Radio, Rating } from "../../Components/RatingStar/Rating"

const RatingStar = ({ rate, onRateChange, readOnly = false }) => {

    return (
        <Container>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label key={index}>
                        {!readOnly && (
                            <Radio type='radio' value={givenRating} onClick={() => {
                                onRateChange(givenRating); //update the rating in form data
                                alert(`Are you sure you want to give ${givenRating} stars ?`);
                            }} />
                        )}
                        <Rating style={{ fontSize: '25px' }}>
                            <FaStar color={givenRating < rate || givenRating === rate ? "#f9c542" : "rgb(192, 192, 192)"
                            }
                            />
                        </Rating>
                    </label>
                );
            })}
        </Container>
    )
}

export default RatingStar;


