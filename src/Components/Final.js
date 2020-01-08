import React, { Component } from "react";
import "./Final.css";
import terminar from "../assets/Terminar.gif";
import { Redirect } from "react-router";
import UIfx from "uifx";
import mp3File from "../assets/beep.wav";
import preguntas from "./Preguntas"

class Final extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toInicio: false,
      P1: this.props.location.pathname.slice(7, 8),
      P2: this.props.location.pathname.slice(9, 10),
      P3: this.props.location.pathname.slice(11, 12),
      P4: this.props.location.pathname.slice(13, 14)
    };
    this.rightFunction = this.rightFunction.bind(this);
    this.generateTxt = this.generateTxt.bind(this);
    console.log("this.state.P1: ", this.state.P1);
    console.log("this.state.P2: ", this.state.P2);
    console.log("this.state.P3: ", this.state.P3);
    console.log("this.state.P4: ", this.state.P4);
  }

  generateTxt(p1,p2,p3,p4){
    let resultado = [];
    if(p1 === '0' || p1 === '2'){
      resultado.push("[{ P1:'" + preguntas[0].enunciado + "', R1:'" + preguntas[0].respuestas[p1] + "'}");
      resultado.push("{ P2:'" + preguntas[1].enunciado + "', R2:'" + preguntas[1].respuestas[p2] + "'}");
      resultado.push("{ P3:'" + preguntas[2].enunciado + "', R3:'" + preguntas[2].respuestas[p3] + "'}");
      if (p3 !== '4') {
        resultado.push("{ P4:'" + preguntas[4].enunciado + "', R4:'" + preguntas[4].respuestas[p4] + "'}]");
      } else  if(p3 === '4'){
        resultado.push("{ P4:'" + preguntas[6].enunciado + "', R4:'" + preguntas[6].respuestas[p4] + "'}]");
      }

    } else
    
    if(p1 === '1' || p1 === '3'){
      resultado.push("[{ P1:'" + preguntas[0].enunciado + "', R1:'" + preguntas[0].respuestas[p1] + "'}");
      resultado.push("{ P2:'" + preguntas[1].enunciado + "', R2:'" + preguntas[1].respuestas[p2] + "'}");
      resultado.push("{ P3:'" + preguntas[3].enunciado + "', R3:'" + preguntas[3].respuestas[p3] + "'}");
      resultado.push("{ P4:'" + preguntas[5].enunciado + "', R4:'" + preguntas[5].respuestas[p4] + "'}]");
    }
    const element = document.createElement("a");
    const file = new Blob([resultado], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    let docName = Math.floor(Math.random() * 100000000);
    element.download = docName + ".txt";
    document.body.appendChild(element); 
    element.click();
  }

  rightFunction(event) {
    if (event.keyCode === 39) {
      const beep = new UIfx(mp3File);
      beep.play();
      console.log("Right arrow", this.state.isSelected);
      this.generateTxt(this.state.P1, this.state.P2, this.state.P3, this.state.P4);
      this.setState(() => ({
        toInicio: true
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
    if (this.state.toInicio === true) {
      return <Redirect to={"/Inicio"} />;
    }
    return (
      <div className="Final">
        <div className="Final-text">
          <h1 className="Final-h1">
            <label className="Final-bigger">Eso es todo,</label> Pero ¿sabías
            que?:
          </h1>

          <p className="Final-label">
            <span className="Final-bold">58</span> de cada{" "}
            <span className="Final-bold">100</span> mujeres, en la ciudad, se
            sienten en peligro transitando las calles. Tus datos anónimos
            ayudarán a cambiar esta realidad. ¡Gracias por tu aporte!
          </p>
        </div>

        <img src={terminar} alt="terminar..." className="Final-img" />
      </div>
    );
  }
}

export default Final;
