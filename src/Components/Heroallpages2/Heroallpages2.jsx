import React from 'react';


const Heroallpages2 = ({profile_nav}) => {
  return (
    <div>
       <div className='whislisthero section-padding pb-0'>
          <div className='whishlistheader' style={{backgroundColor:"var(--background)",
  color: "var(--text-color)", padding:"40px 0", marginTop:"90px"}}>
          <p className='text-center' style={{color:"var( --account-header)" ,fontWeight:"bolder", marginBottom:"0px"}}>Your Profile<span style={{color:"#7F56D9", fontWeight:"400"}}> /{profile_nav}</span></p>
          </div>                                                                                                           
        </div>
    </div>
  );
}

export default Heroallpages2;
