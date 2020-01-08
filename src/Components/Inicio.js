import React, { Component } from "react";
import "./Inicio.css";
import continuar from "../assets/gif1.gif";
import { Redirect } from "react-router";
import UIfx from "uifx";
import mp3File from '../assets/beep.wav';

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toGracias: false
    };
    this.rightFunction = this.rightFunction.bind(this);
  }
  
  rightFunction(event) {
    if (event.keyCode === 39) {
      const beep = new UIfx(mp3File);
      beep.play();
      this.setState(() => ({
        toGracias: true
      }));
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.rightFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.rightFunction, false);
  }
  render() {
    if (this.state.toGracias === true) {
      return <Redirect to="/Gracias" />;
    }
    
    return (
      <div className="Inicio">
        <p>Ayúdanos a </p>
        <p>generar</p>
        <p>estadísticas</p>
        <img src={continuar} alt="continuar..." className="Inicio-img" />
      </div>
    );
  }
}

export default Inicio;
