import React, { useEffect, useState } from "react";
import Header from '../../common/header/Header'
import "./Home.css";


const Home = (props) => {
   

  return (

    <React.Fragment>
      <Header onReleasedMoviePage={false} {...props} />
      <div className="heading">
        <div className="heading-label">Upcoming Movies</div>
      </div>
      
    </React.Fragment>
  );
};
export default Home;