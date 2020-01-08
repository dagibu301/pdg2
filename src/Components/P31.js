import React, { Component } from "react";
import "./P31.css";
import continuar from "../assets/gif0.gif";
import seleccionar from "../assets/Seleccionar.png";
import square from "../assets/square.PNG";
import squareFull from "../assets/square-full.png";
import step3 from "../assets/step3.png";
import { Redirect } from "react-router";
import UIfx from "uifx";
import mp3File from '../assets/beep.wav';

class P31 extends  Component{
    constructor(props) {
        super(props);
        this.state = {
          P1: this.props.location.pathname.slice(5,6),
          P2: this.props.location.pathname.slice(7),
          toP41: false,
          toP411: false,
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
            console.log(this.props.location.pathname.slice(4))
            console.log("this.state.toP31",this.state.toP31);
            if (this.state.actualHover !== 4) {
              this.setState(() => ({
                toP41: true
              }));
            } else if (this.state.actualHover === 4) {
              this.setState(() => ({
                toP411: true
              }));
            }
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
        if (this.state.toP41 === true) {
          return (
            <Redirect
              to={
                "/P41/" +
                this.state.P1 +
                "," + this.state.P2 + "," +
                this.state.actualHover
              }
            />
          );
        }
        if (this.state.toP411 === true) {
          return (
            <Redirect
              to={
                "/P43/" +
                this.state.P1 +
                "," + this.state.P2 + "," +
                this.state.actualHover
              }
            />
          );
        }
        return (
          <div className="P31">
            <div className="P31-text">
              <img src={step3} alt="Paso 2" className="P31-step" />
              <h1 className="P31-h1"> <label className="P31-bigger">Cuando transitas por el espacio público</label> ¿Te silban, te tiran besos, te dicen piropos, te persiguen o te bloquean el paso?</h1>
    
              <div className="P31-questions-container">
                <div
                  className={
                    this.state.questionsHover[0]
                      ? "P31-question-hover"
                      : "P31-question"
                  }
                >
                  <img
                    src={this.state.isSelectedQ[0] ? squareFull : square}
                    alt=""
                  />
                  <label className="P31-label">Si, todos los días</label>
                </div>
    
                <div
                  className={
                    this.state.questionsHover[1]
                      ? "P31-question-hover"
                      : "P31-question"
                  }
                >
                  <img
                    src={this.state.isSelectedQ[1] ? squareFull : square}
                    alt=""
                  />
                  <label className="P31-label">Si, cada dos o tres días</label>
                </div>
    
                <div
                  className={
                    this.state.questionsHover[2]
                      ? "P31-question-hover"
                      : "P31-question"
                  }
                >
                  <img
                    src={this.state.isSelectedQ[2] ? squareFull : square}
                    alt=""
                  />
                  <label className="P31-label">Si, una vez por semana</label>
                </div>
    
                <div
                  className={
                    this.state.questionsHover[3]
                      ? "P31-question-hover"
                      : "P31-question"
                  }
                >
                  <img
                    src={this.state.isSelectedQ[3] ? squareFull : square}
                    alt=""
                  />
                  <label className="P31-label">Si, rara vez</label>
                </div>
    
                <div
                  className={
                    this.state.questionsHover[4]
                      ? "P31-question-hover"
                      : "P31-question"
                  }
                >
                  <img
                    src={this.state.isSelectedQ[4] ? squareFull : square}
                    alt=""
                  />
                  <label className="P31-label">No, nunca me ha pasado</label>
                </div>
    
               
              </div>
            </div>
    
            {this.state.isSelected ? (
              <img src={continuar} alt="continuar..." className="P31-img" />
            ) : (
              <img src={seleccionar} alt="continuar..." className="P31-img" />
            )}
          </div>
        );
      }
}

export default P31;