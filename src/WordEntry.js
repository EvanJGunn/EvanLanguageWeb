import React from 'react';

/*
  The word entry class is meant to
  allow the user to enter a word into
  the database via the webpage.
*/
class WordEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {language: '',
                  meaning: '',
                  romanization: '',
                  type: '',
                  mainSymbols: '',
                  ancillarySymbols: '',
                  source: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle setting the ;anguage
  handleChangeLanguage(event) {
    this.setState({language: event.target.value});
  }

  // Handle setting the meaning
  handleChangeMeaning(event) {
    this.setState({meaning: event.target.value});
  }

  handleSubmit(event) {

  }

  render() {
    return (
      <form onSumbit={this.handleSubmit}>
        <label>
          Set Language:
          <input type="text" value={this.state.language} onChange={this.handleChangeLanguage.bind(this)} />
        </label>
        <br />
        <label>
          Set Meaning:
          <input type="text" value={this.state.meaning} onChange={this.handleChangeMeaning.bind(this)} />
        </label>
        <br />
        <input type="submit" value="Submit" />
        <h1>
        Language: {this.state.language}
        </h1>
        <h1>
        Meaning: {this.state.meaning}
        </h1>
      </form>

    )
  }
}

export default WordEntry;
