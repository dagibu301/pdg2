import React, { Component } from "react";
import "./P32.css";
import continuar from "../assets/gif0.gif";
import seleccionar from "../assets/Seleccionar.png";
import square from "../assets/square.PNG";
import squareFull from "../assets/square-full.png";
import step3 from "../assets/step3.png";
import { Redirect } from "react-router";
import UIfx from "uifx";
import mp3File from "../assets/beep.wav";

class P32 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      P1: this.props.location.pathname.slice(5, 6),
      P2: this.props.location.pathname.slice(7),
      toP42: false,
      isSelected: false,
      isSelectedQ: [false, false, false, false],
      questionsHover: [true, false, false, false],
      actualHover: 0
    };
    this.rightFunction = this.rightFunction.bind(this);
    this.downFunction = this.downFunction.bind(this);
    this.upFunction = this.upFunction.bind(this);
  }

  rightFunction(event) {
    if (event.keyCode === 39) {
      const beep = new UIfx(mp3File);
      beep.play();
      console.log("Right arrow", this.state.isSelected);
      if (this.state.isSelected === true) {
        console.log("Right arrow plus selected");
        console.log(this.props.location.pathname.slice(4));
        console.log("this.state.toP32", this.state.toP32);
        this.setState(() => ({
            toP42: true
          }));
      }
      let updIsSelectedQ = this.state.isSelectedQ;
      updIsSelectedQ[this.state.actualHover] = true;
      this.setState(() => ({
        isSelected: true,
        isSelectedQ: updIsSelectedQ
      }));
    }
  }

  downFunction(event) {
    if (event.keyCode === 40) {
      if (this.state.actualHover < 4) {
        this.setState(() => ({
          actualHover: this.state.actualHover + 1,
          isSelected: false,
          isSelectedQ: [false, false, false, false]
        }));
        console.log("Actual", this.state.actualHover);
        let updQuestionsHover = this.state.questionsHover;
        updQuestionsHover[this.state.actualHover - 1] = false;
        updQuestionsHover[this.state.actualHover] = true;
        console.log("updQuestionsHover", updQuestionsHover);
        this.setState(() => ({
          questionsHover: updQuestionsHover
        }));
      }
    }
  }

  upFunction(event) {
    if (event.keyCode === 38) {
      if (this.state.actualHover > 0) {
        this.setState(() => ({
          actualHover: this.state.actualHover - 1,
          isSelected: false,
          isSelectedQ: [false, false, false, false]
        }));
        console.log("Actual", this.state.actualHover);
        let updQuestionsHover = this.state.questionsHover;
        updQuestionsHover[this.state.actualHover + 1] = false;
        updQuestionsHover[this.state.actualHover] = true;
        console.log("updQuestionsHover", updQuestionsHover);
        this.setState(() => ({
          questionsHover: updQuestionsHover
        }));
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.rightFunction, false);
    document.addEventListener("keydown", this.downFunction, false);
    document.addEventListener("keydown", this.upFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.rightFunction, false);
    document.removeEventListener("keydown", this.downFunction, false);
    document.removeEventListener("keydown", this.upFunction, false);
  }
  render() {
    /* console.log(this.props.location.pathname.slice(4)) */
    if (this.state.toP42 === true) {
      return (
        <Redirect
          to={
            "/P42/" +
            this.state.P1 +
            "," +
            this.state.P2 +
            "," +
            this.state.actualHover
          }
        />
      );
    }
    return (
      <div className="P32">
        <div className="P32-text">
          <img src={step3} alt="Paso 2" className="P32-step" />
          <h1 className="P32-h1">
          Cuando a una mujer le silban, le tiran besos, le dicen piropos, la persiguen o le bloquean el paso, mientras transita por el espacio público 
            {" "}
            <label className="P32-bigger">
            ¿Qué es lo primero que piensas?
            </label>{" "}
            
          </h1>

          <div className="P32-questions-container">
            <div
              className={
                this.state.questionsHover[0]
                  ? "P32-question-hover"
                  : "P32-question"
              }
            >
              <img
                src={this.state.isSelectedQ[0] ? squareFull : square}
                alt=""
              />
              <label className="P32-label">Es normal, porque está muy bonita</label>
            </div>

            <div
              className={
                this.state.questionsHover[1]
                  ? "P32-question-hover"
                  : "P32-question"
              }
            >
              <img
                src={this.state.isSelectedQ[1] ? squareFull : square}
                alt=""
              />
              <label className="P32-label">Debe sentirse halagada por recibir tanta atención</label>
            </div>

            <div
              className={
                this.state.questionsHover[2]
                  ? "P32-question-hover"
                  : "P32-question"
              }
            >
              <img
                src={this.state.isSelectedQ[2] ? squareFull : square}
                alt=""
              />
              <label className="P32-label">Si se viste así es porque quiere recibir piropos</label>
            </div>

            <div
              className={
                this.state.questionsHover[3]
                  ? "P32-question-hover"
                  : "P32-question"
              }
            >
              <img
                src={this.state.isSelectedQ[3] ? squareFull : square}
                alt=""
              />
              <label className="P32-label">Debe sentirse incómoda recibiendo piropos de un extraño</label>
            </div>

            <div
              className={
                this.state.questionsHover[4]
                  ? "P32-question-hover"
                  : "P32-question"
              }
            >
              <img
                src={this.state.isSelectedQ[4] ? squareFull : square}
                alt=""
              />
              <label className="P32-label">Es una falta de respeto, las mujeres no deberían aguantar piropos en la calle</label>
            </div>
          </div>
        </div>

        {this.state.isSelected ? (
          <img src={continuar} alt="continuar..." className="P32-img" />
        ) : (
          <img src={seleccionar} alt="continuar..." className="P32-img" />
        )}
      </div>
    );
  }
}

export default P32;
