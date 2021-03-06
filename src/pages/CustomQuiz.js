import React from "react";
import axios from "axios";

export default class CustomQuiz extends React.Component {
 constructor(props) {
    super(props);

    //keep state
    this.state = {
      question: '',
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      testName: '',
      currQuesList: [],
    };
  }

  //post request via axios
  sendCustomTemplate(e) {
    //e.preventDefault();
    axios.post('/questions', {
      name: this.state.question,
      correct: this.state.answer,
      wrong1: this.state.option1,
      wrong2: this.state.option2,
      wrong3: this.state.option3,
      testName: this.state.testName,
    })
    .then(() => {
      this.setState({
        name: '',
        correct: '',
        wrong1: '',
        wrong2: '',
        wrong3: ''
      })
    });
    this.getTestNameCurrentQuestions();
  }

  handleQuestion(e) {
    this.setState({
      question: e.target.value
    });
  }

  handleCorrentAnswer(e) {
    this.setState({
      answer: e.target.value
    });
  }

  handleWrong1(e) {
    this.setState({
      option1: e.target.value
    });
  }

  handleWrong2(e) {
    this.setState({
      option2: e.target.value
    });
  }

  handleWrong3(e) {
    this.setState({
      option3: e.target.value
    });
  }

  handleTestName(e) {
    this.setState({
      testName: e.target.value,
      currQuesList: [],
    }, this.getTestNameCurrentQuestions);
  }

  getTestNameCurrentQuestions() {
    console.log('getasdsfasdfadsf');
    var entries;
    var config = {
      params: {
        ID: this.state.testName
      }
    };
    // console.log('before get request currQuesList = ' + this.state.currQuesList);

    axios.get('/questions', config)
      .then(response => {
        console.log('line 75 custom quiz, res.body = ' + JSON.stringify(response.data, null, 2));

        entries = response.data;
        var temp = [];
        entries.forEach(entry => {
          temp.push(entry.name);
        });
        this.setState({
          currQuesList: temp,
        });
      console.log('after get request currQuesList = ' + this.state.currQuesList);
      })
      .catch(function(err){
        console.log(err)
      })
  }

  handleRemove(e) {
    // do something here that posts a delete request to server
    console.log('handleRemove function INVOKED')
    var tempName = e.target.textContent;
    this.setState({
      currQuesList: [],
    }, function() {
      axios.post('/questions', {
        delete: true,
        name: tempName,
      })
      .catch(function(err){
        console.log(err)
      });
      this.getTestNameCurrentQuestions();
    });
  }

  render() {
    return (
      <div className="container customquiz">
        <div className="col-md-12">
          <div className='row'>

            <div className='col-md-6' >
              <h2>Build a Custom Quiz</h2>
              <form className="form-customquiz customquiz">
                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="testName">Test Name</label>
                  <div className="col-xs-8">
                    <input name="testName" type="text" className="form-control" placeholder="Enter the Name of this Test" onChange={this.handleTestName.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="question">Question</label>
                  <div className="col-xs-8">
                    <input name="question" type="text" className="form-control" placeholder="Enter a question" onChange={this.handleQuestion.bind(this)}></input>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="answer">Correct</label>
                  <div className="col-xs-8">
                    <input name="answer" type="text" className="form-control" placeholder="Enter an answer" onChange={this.handleCorrentAnswer.bind(this)}></input>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option1">Wrong 1</label>
                  <div className="col-xs-8">
                    <input name="option1" type="text" className="form-control" placeholder="Enter an answer" onChange={this.handleWrong1.bind(this)}></input>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option2">Wrong 2</label>
                  <div className="col-xs-8">
                    <input name="option2" type="text" className="form-control" placeholder="Enter an answer" onChange={this.handleWrong2.bind(this)}></input>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option3">Wrong 3</label>
                  <div className="col-xs-8">
                    <input name="option3" type="text" className="form-control" placeholder="Enter an answer" onChange={this.handleWrong3.bind(this)}></input>
                  </div>
                </div>
                <button className="btn btn-sm btn-primary" type="submit" onClick={this.sendCustomTemplate.bind(this)}>Submit</button>
              </form>

            </div>
            <div className='col-md-6'  >
              <div>
                <h3>Click questions below to delete them once created!</h3>
                {this.state.currQuesList.map(option =>
                  <button
                    onClick={this.handleRemove.bind(this)}
                    className={`answer btn btn-lg ${option}`}>{option}
                  </button> )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
