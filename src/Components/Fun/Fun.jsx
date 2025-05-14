import React from 'react'
import '../Fun/Fun.css'
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import Duck from '../../Assets/Image/duck.png'
import Truck from '../../Assets/Image/truck.png'
import Truck1 from '../../Assets/Image/truck1.png'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { BsCart } from "react-icons/bs";
import { TbRulerMeasure2 } from "react-icons/tb";
import Arrow from '../../Assets/Image/arrow.png'
import rulermesure from '../../Assets/Image/measurefiltericon.png'
import Stationarymaterial from "../../Assets/Image/stationarymaterial.png"
import Footwear from "../../Assets/Image/footwear.png"
import { Link } from 'react-router-dom';

const Fun = () => {
  return (
    <div className=' section-padding fun d-none d-md-block'>
    <div className="row align-items-center pt-5 pb-5">
      <div className="col-12 col-md-5">
        <div>
          <h1 className='fun-heading'>Endless Fun with  Every <span className='toy' style={{ fontFamily: "Matemasie", fontWeight: '400', fontStyle: 'normal' }}>Toy </span> <br />Adventure!</h1>
          <Link to='/productshowcase'><button className="text-white btn-funn" > Shop Now </button></Link>
        </div>
      </div>
      <div className="col-12 col-md-7 duck-cards">
        <div className='d-flex align-items-center justify-content-around d-none d-md-flex duck-card '>

          {/* 1st card */}
          <Link to='/product/toy' style={{ color: 'black' }}>
            <div className='toy-card'>
              <div className='d-flex align-items-center justify-content-center'>
                <img src={Truck} alt="" className='duck-img' />
              </div>
              <div className=''>
                {/* 1st div */}
                <div className='d-flex align-items-center justify-content-between '>
                  <span className='d-flex align-items-center '><LiaRupeeSignSolid style={{ fontSize: '20px', fontWeight: '600' }} /><span className='rupees' style={{ fontSize: '25px', fontWeight: '600' }}>150</span></span>
                  <span className='cart' ><BsCart className='text-white' /></span>
                </div>
                {/* line */}
                <hr style={{ backgroundColor: '#793cfa', margin: '0', padding: '0' }} />
              </div>
              {/* measure div */}
              <div className='d-flex mt-2 gap-2'>
                <p><img className='img-fluid' src={rulermesure} alt="ruler" /></p>
                <div className='d-flex flex-column' style={{ color: '#afb0b1', gap: '15px', lineHeight: '15px' }}>
                  <p>Level</p>
                  <span style={{ color: '#295eac', marginTop: '-20px', fontSize: '13px' }}>0-5</span>
                </div>
              </div>
            </div>
          </Link>
          {/* 2nd div */}
          <Link to='/product/Footwear' style={{ color: 'black' }}>
            <div className='toy-card'>
              <div className='d-flex align-items-center justify-content-center'>
                <img src={Footwear} alt="duck" className='duck-img' />
              </div>
              <div className=''>
                {/* 1st div */}
                <div className='d-flex align-items-center justify-content-between '>
                  <span className='d-flex align-items-center '><LiaRupeeSignSolid style={{ fontSize: '20px', fontWeight: '600' }} /><span className='rupees' style={{ fontSize: '25px', fontWeight: '600' }}>250</span></span>
                  <span className='cart' ><BsCart className='text-white' /></span>
                </div>
                {/* line */}
                <hr style={{ backgroundColor: '#793cfa', margin: '0', padding: '0' }} />
              </div>
              {/* measure div */}
              <div className='d-flex mt-2 gap-2'>
                {/* <p><TbRulerMeasure2 style={{fontSize:'30px', fontWeight:'300', color:'#3d3e3f'}}/></p> */}
                <p><img className='img-fluid' src={rulermesure} alt="ruler" /></p>
                <div className='d-flex flex-column' style={{ color: '#afb0b1', gap: '15px', lineHeight: '15px' }}>
                  <p>Level</p>
                  <span style={{ color: '#295eac', marginTop: '-20px', fontSize: '13px' }}>5-10</span>
                </div>
              </div>
            </div>
          </Link>

          {/* 3rd div */}
          <Link to='/product/stationary' style={{ color: 'black' }}>
            <div className='toy-card'>
              <div className='d-flex align-items-center justify-content-center'>
                <img src={Stationarymaterial} alt="duck" className='duck-img' />
              </div>
              <div className=''>
                {/* 1st div */}
                <div className='d-flex align-items-center justify-content-between '>
                  <span className='d-flex align-items-center '><LiaRupeeSignSolid style={{ fontSize: '20px', fontWeight: '600' }} /><span className='rupees' style={{ fontSize: '25px', fontWeight: '600' }}>350</span></span>
                  <span className='cart' ><BsCart className='text-white' /></span>
                </div>
                {/* line */}
                <hr style={{ backgroundColor: '#793cfa', margin: '0', padding: '0' }} />
              </div>
              {/* measure div */}
              <div className='d-flex mt-2 gap-2'>
                <p><img className='img-fluid' src={rulermesure} alt="ruler" /></p>
                <div className='d-flex flex-column' style={{ color: '#afb0b1', gap: '15px', lineHeight: '15px' }}>
                  <p>Level</p>
                  <span style={{ color: '#295eac', marginTop: '-20px', fontSize: '13px' }}>10-15</span>
                </div>
              </div>
            </div>
          </Link>


        </div>
      </div>
      {/* row end div */}
    </div>
  </div>
  )
}

export default Fun
