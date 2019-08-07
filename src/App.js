import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import butterfly from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.butterfly to the cards json array
  state = {
    butterfly,
    clickedButterflyIds: [],
    score: 0,
    goal: 9,
    status: ""
  };

  //shuffle the butterflies cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedButterflyIds = this.state.clickedButterflyIds;

    if(clickedButterflyIds.includes(id)){
      this.setState({ clickedButterflyIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedButterflyIds.push(id)

      if(clickedButterflyIds.length === 8){
        this.setState({score: 8, status: "You Won! Great Job, Smartie! Click to play again!", clickedButterflyIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ butterfly, clickedButterflyIds, score: clickedButterflyIds.length, status: " " });

      for (let i = butterfly.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [butterfly[i], butterfly[j]] = [butterfly[j], butterfly[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Butterflies Clicky Game</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.butterfly.map(butterfly => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={butterfly.id}
              key={butterfly.id}
              image={butterfly.image}
            />
          ))}
        </Wrapper>
        <footer>
          <p>Copyright &copy; 2019 | Ahmed Chebli</p>
        </footer>
    </div>
    );
  }
}

export default App;
