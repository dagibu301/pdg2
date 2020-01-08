import React, { Component } from "react";
import "./Gracias.css";
import continuar from "../assets/gif0.gif";
import { Redirect } from "react-router";
import UIfx from "uifx";
import mp3File from '../assets/beep.wav';

class Gracias extends Component {
    constructor(props) {
        super(props);
        this.state = {
          toP1: false
        };
        this.rightFunction = this.rightFunction.bind(this);
      }
      rightFunction(event) {
        if (event.keyCode === 39) {
          const beep = new UIfx(mp3File);
          beep.play();
          this.setState(() => ({
            toP1: true
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
    if (this.state.toP1 === true) {
      return <Redirect to="/P1" />;
    }
    return (
      <div className="Gracias">
        <div className="Gracias-text">
          <h1>¡Hola, gracias por participar!</h1>
          <p>
            Llenando este formulario anónimo de <b> 40 segundos </b> ayudas a la
            Subsecretaría de Equidad de Género de Cali a recopilar estadísticas
            sobre la inseguridad que perciben las mujeres en el espacio público.
          </p>
        </div>
        <img src={continuar} alt="continuar..." className="Gracias-img" />
      </div>
    );
  }
}

export default Gracias;
