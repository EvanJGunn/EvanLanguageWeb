import React from 'react';
import Axios from 'axios';
/*
  The TestPortal class is a React
  component that allows the user
  to request a specific type of
  test to be generated and served
  by the server.
*/
class TestPortal extends React.Component {
  // Default properties of the class
  static defaultProps = {
    databaseTestEndpoint: 'http://localhost:8080/test'
  }

  constructor(props) {
    super(props);
    this.state = {
      testSource: '',
      testWordType: '',
      testLanguage: '',
      generationType: 'MAIN_SYMBOLS',
      testQuestions: {},
      testState: 0,
      questionIndex: 0,
      questionFeedback: "",
      currentAnswer: "",
      correct: 0,
      incorrect: 0
    };
  }

  // Handle setting the language
  handleChangeLanguage(event) {
    this.setState({testLanguage: event.target.value});
  }

  // Handle setting the word type
  handleChangeWordType(event) {
    this.setState({testWordType: event.target.value});
  }

  // Handle setting the source
  handleChangeSource(event) {
    this.setState({testSource: event.target.value});
  }

  // Handle setting the test type
  handleChangeGenerationType(event) {
    this.setState({generationType: event.target.value});
  }

  /*
    Query the server for a test
    based on input criteria, when
    the generate button is clicked.
  */
  async handleGenerateClick() {
    // We do not need to test for
    // must-set variables, as a test
    // without variables will simply
    // pull from all database entries.
    // And generationType is set by default.

    // We do however need to test if a variable
    // is needed in the json.

    let postBody = {
      "testType": this.state.generationType
    }

    // Set the language of the test
    if (this.state.testLanguage !== '') {
      postBody.language = this.state.testLanguage;
    }

    // Set the word type of the test
    if (this.state.testWordType !== '') {
      postBody.wordType = this.state.testWordType;
    }

    // Set the source of the test
    if (this.state.testSource !== '') {
      postBody.source = this.state.testSource;
    }

    // console.log(postBody);

    // Post to the database test endpoint
    let retVal = await Axios.post(TestPortal.defaultProps.databaseTestEndpoint, postBody).then(
      function (response) {
        return response.data;
      }
    ).catch(
      function (error) {
        return error.message;
      }
    );

    /*
      If a set of questions is returned, checked by seeing
      if the return json has a question property, then
      set the state for the beginning of the test.
    */
    if (retVal[0]) {
      this.setState({testQuestions: retVal});
      this.setState({questionIndex: 0});
      this.setState({correct: 0});
      this.setState({incorrect: 0});
      this.setState({questionFeedback: ""});
      // testState determines what is rendered in the html,
      // on 0 there is no test, so render the test generation
      // html, on 1, we are in a question so render the question
      // at the current question index, on 2 we have just finished
      // a question so render question feedback, on state 3 we have
      // finished the test, so tell the user their score, and then
      // set the state back to 0 to render test generation
      this.setState({testState: 1});
    }

    // TODO error handling, test failed to be generated
  }

  // Handle changing the state variable representing
  // the answer to a question.
  handleChangeAnswer(event) {
    this.setState({currentAnswer: event.target.value});
  }

  // Handle an answer submission,
  // check if the answer was correct,
  // set user feedback variable accordingly,
  // increment the correct or incorrect variable,
  // set the test state to 2 so
  // that the feedback html is rendered.
  handleSubmitAnswer() {
    // Correct case
    if (this.state.currentAnswer ===
      this.state.testQuestions[this.state.questionIndex].answer) {
        this.setState({questionFeedback: "Correct!"});
        this.setState({correct: this.state.correct+1});
    }
    // incorrect case
    else {
      this.setState({questionFeedback: "Incorrect, the answer was: " + this.state.testQuestions[this.state.questionIndex].answer});
      this.setState({incorrect: this.state.incorrect+1});
    }

    // progress the state
    this.setState({testState: 2});
  }

  // Check that there is a next question
  // if not:
  // set state to 3 so that the finished
  // test html is rendered,
  // if next question:
  // increment the questionIndex to progress
  // to the next question,
  // set the state to 1.
  handleNextQuestion() {
    // Check if next question exists
    if (this.state.testQuestions[this.state.questionIndex+1]) {
      // Move the index forwards
      this.setState({questionIndex: this.state.questionIndex+1});
      // Move the state back to question state
      this.setState({testState: 1});
      // Reset the answer to an empty string
      this.setState({currentAnswer: ''});
    }
    // End of test case
    else {
      // Progress to the last state, end of test
      this.setState({testState: 3});
    }
  }

  // Clean up variables, and reset to test generation html state.
  handleFinishTest() {
    this.setState({correct: 0});
    this.setState({incorrect: 0});
    this.setState({currentAnswer: ''});
    this.setState({testState: 0});
  }

  render() {
    // Setting values in html dynamically is potentially dangerous,
    // however in this case I am not worried as it is for personal use,
    // and the values do not affect my database.
    var myTestState = this.state.testState;
    return (
      <table>
        <tbody style={{ display: myTestState === 1 ? "" : "none"}}>
          <tr>
            <td>
              <h2>
                {this.state.testQuestions[this.state.questionIndex] ? this.state.testQuestions[this.state.questionIndex].question : ""}
              </h2>
              <label>
                Answer:
                <input type="text" value={this.state.currentAnswer} onChange={this.handleChangeAnswer.bind(this)} />
              </label>
              <button onClick = {this.handleSubmitAnswer.bind(this)}>
                Submit
              </button>
            </td>
          </tr>
        </tbody>

        <tbody style={{ display: myTestState === 2 ? "" : "none"}}>
          <tr>
            <td>
              <h2>
                {this.state.questionFeedback}
              </h2>
              <button onClick = {this.handleNextQuestion.bind(this)}>
                Next
              </button>
            </td>
          </tr>
        </tbody>

        <tbody style={{ display: myTestState === 3 ? "" : "none"}}>
          <tr>
            <td>
            <h2>
              You got {this.state.correct} out of {this.state.correct+this.state.incorrect}.
            </h2>
            <button onClick = {this.handleFinishTest.bind(this)}>
              End
            </button>
            </td>
          </tr>
        </tbody>

        <tbody style={{ display: myTestState === 0 ? "" : "none"}}>
          <tr>
            <td>
              <h1>
                Test Generation
              </h1>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Set Language:
                <input type="text" onChange={this.handleChangeLanguage.bind(this)} />
              </label>
              <br/>
              <label>
                Set Word Type (Noun...):
                <input type="text" onChange={this.handleChangeWordType.bind(this)} />
              </label>
              <br/>
              <label>
                Set Source:
                <input type="text" onChange={this.handleChangeSource.bind(this)} />
              </label>
              <br/>
              <div onChange={this.handleChangeGenerationType.bind(this)}>
                <p>
                  Set Generation Type:
                </p>
                <input type="radio" value="MAIN_SYMBOLS" name="generation" /> Main Symbols
                <input type="radio" value="MEANING" name="generation" /> Meaning
              </div>
              <br/>
              <button onClick = {this.handleGenerateClick.bind(this)}>
                Generate
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default TestPortal;
