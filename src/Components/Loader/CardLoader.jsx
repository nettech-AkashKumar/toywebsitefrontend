import React from 'react';
import './CardLoader.css'; // Make sure to create this CSS file

const CardLoader = () => {

    const arr = [1, 2, 4, 5, 6, 7, 8, 1, 2, 4, 5, 6, 7, 8, 1, 2, 4, 5, 6, 7, 8, 1, 2, 4, 5, 6, 7, 8,]

    return (
        <>
            {
                arr.map((card, index) => (
                    <div className="d-flex justify-content-between gap-4 flex-wrap gaptype">
                        <div key={index} className="card-loader cardhome">
                            <div className="cardimage-placeholder"></div>
                            <div className="carddescription">
                                <div className="pricing-placeholder">
                                    <p className="m-0">
                                        <b className="text-placeholder"></b>
                                    </p>
                                    <p className="m-0">
                                        <del className="text-placeholder"></del>
                                        <span>
                                            <b className="text-placeholder"></b>
                                        </span>
                                    </p>
                                    <p className="m-0 text-placeholder"></p>
                                </div>
                                <div className="rating">
                                    <div className="staricon-placeholder"></div>
                                    <div className="level">
                                        <div className="measureicon-placeholder"></div>
                                        <div className="level_details">
                                            <p className="text-placeholder"></p>
                                            <p className="text-placeholder"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-placeholder">Loading...</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default CardLoader;
