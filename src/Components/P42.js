import React, { Component } from "react";
import "./P42.css";
import continuar from "../assets/gif0.gif";
import seleccionar from "../assets/Seleccionar.png";
import square from "../assets/square.PNG";
import squareFull from "../assets/square-full.png";
import step4 from "../assets/step4.png";
import { Redirect } from "react-router";
import UIfx from "uifx";
import mp3File from "../assets/beep.wav";

class P42 extends Component{
    constructor(props) {
        super(props);
        this.state = {
          P1: this.props.location.pathname.slice(5, 6),
          P2: this.props.location.pathname.slice(7,8),
          P3: this.props.location.pathname.slice(9,10),
          toFinal: false,
          isSelected: false,
          isSelectedQ: [false, false, false, false],
          questionsHover: [true, false, false, false],
          actualHover: 0
        };
        this.rightFunction = this.rightFunction.bind(this);
        this.downFunction = this.downFunction.bind(this);
        this.upFunction = this.upFunction.bind(this);
        console.log("this.state.P1: ", this.state.P1);
        console.log("this.state.P2: ", this.state.P2);
        console.log("this.state.P3: ", this.state.P3);
      }
    
      rightFunction(event) {
        if (event.keyCode === 39) {
          const beep = new UIfx(mp3File);
          beep.play();
          console.log("Right arrow", this.state.isSelected);
          if (this.state.isSelected === true) {
            console.log("Right arrow plus selected");
            console.log(this.props.location.pathname.slice(4));
            console.log("this.state.toFinal", this.state.toFinal);
            this.setState(() => ({
              toFinal: true
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
          if (this.state.actualHover < 3) {
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
        if (this.state.toFinal === true) {
          return (
            <Redirect
              to={
                "/Final/" +
                this.state.P1 +
                "," +
                this.state.P2 +
                "," +
                this.state.P3 +
                "," +
                this.state.actualHover
              }
            />
          );
        }
        return (
          <div className="P42">
            <div className="P42-text">
              <img src={step4} alt="Paso 2" className="P42-step" />
              <h1 className="P42-h1">
              Cuando a una mujer le silban, le tiran besos, le dicen piropos, la persiguen o le bloquean el paso, mientras transita por el espacio público 
                {" "}
                <label className="P42-bigger">
                ¿Qué sueles hacer?
                </label>{" "}
                
              </h1>
    
              <div className="P42-questions-container">
                <div
                  className={
                    this.state.questionsHover[0]
                      ? "P42-question-hover"
                      : "P42-question"
                  }
                >
                  <img
                    src={this.state.isSelectedQ[0] ? squareFull : square}
                    alt=""
                  />
                  <label className="P42-label">También le digo un piropo</label>
                </div>
    
                <div
                  className={
                    this.state.questionsHover[1]
                      ? "P42-question-hover"
                      : "P42-question"
                  }
                >
                  <img
                    src={this.state.isSelectedQ[1] ? squareFull : square}
                    alt=""
                  />
                  <label className="P42-label">Me da risa</label>
                </div>
    
                <div
                  className={
                    this.state.questionsHover[2]
                      ? "P42-question-hover"
                      : "P42-question"
                  }
                >
                  <img
                    src={this.state.isSelectedQ[2] ? squareFull : square}
                    alt=""
                  />
                  <label className="P42-label">Me quedo callado, el tema no es conmigo</label>
                </div>
    
                <div
                  className={
                    this.state.questionsHover[3]
                      ? "P42-question-hover"
                      : "P42-question"
                  }
                >
                  <img
                    src={this.state.isSelectedQ[3] ? squareFull : square}
                    alt=""
                  />
                  <label className="P42-label">Intervengo y exijo respeto para esa mujer</label>
                </div>
    
              </div>
            </div>
    
            {this.state.isSelected ? (
              <img src={continuar} alt="continuar..." className="P42-img" />
            ) : (
              <img src={seleccionar} alt="continuar..." className="P42-img" />
            )}
          </div>
        );
      }
}

export default P42;