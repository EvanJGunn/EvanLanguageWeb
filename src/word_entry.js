import React from 'react';
import Axios from 'axios';
/*
  The word entry class is meant to
  allow the user to enter a word into
  the database via the webpage.
*/
class WordEntry extends React.Component {
  // Default properties of the class
  static defaultProps = {
    databaseSaveEndpoint: 'http://localhost:8080/save'
  }

  constructor(props) {
    super(props);
    this.state = {language: '',
                  meaning: '',
                  romanization: '',
                  type: '',
                  mainSymbols: '',
                  ancillarySymbols: '',
                  source: '',
                  successMessage: ''};
  }

  // Handle setting the language
  handleChangeLanguage(event) {
    this.setState({language: event.target.value});
  }

  // Handle setting the meaning
  handleChangeMeaning(event) {
    this.setState({meaning: event.target.value});
  }

  // Handle setting the romanization
  handleChangeRomanization(event) {
    this.setState({romanization: event.target.value});
  }

  // Handle setting the type
  handleChangeType(event) {
    this.setState({type: event.target.value});
  }

  // Handle setting the main symbols
  handleChangeMain(event) {
    this.setState({mainSymbols: event.target.value});
  }

  // Handle setting the ancillary symbols
  handleChangeAncillary(event) {
    this.setState({ancillarySymbols: event.target.value});
  }

  // Handle setting the source
  handleChangeSource(event) {
    this.setState({source: event.target.value});
  }

  // Handle the attempt to save the data,
  // post to the database.
  async handleSaveClick() {
    // If any of the necessary fields
    // are undefined, return without
    // attempting to push to the database.
    if (this.state.language === '' ||
        this.state.meaning === '' ||
        this.state.romanization === '' ||
        this.state.type === '') return;

    // Create the JSON body of the post
    let postBody = {
      "language": this.state.language,
      "meaning": this.state.meaning,
      "romanization": this.state.romanization,
      "type": this.state.type
    };

    // Create the json body of the symbols table
    if (this.state.mainSymbols !== '') {
      let symbolsBody = {
        "main": this.state.mainSymbols
      };
      if (this.state.ancillarySymbols !== '') {
        symbolsBody.ancillary = this.state.ancillarySymbols;
      }
      // Append to the word table post body
      postBody.symbols = symbolsBody;
    } else if (this.state.ancillarySymbols !== '') {
      let symbolsBody = {
        "ancillary": this.state.ancillarySymbols
      };
      postBody.symbols = symbolsBody;
    }

    // Create the json body of the source table
    if (this.state.source !== '') {
      let sourceBody = {
        "source": this.state.source
      };
      postBody.wordSource = sourceBody;
    }

    // Create the headers
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','');

    // Post to the database
    let retVal = await Axios.post(WordEntry.defaultProps.databaseSaveEndpoint, postBody, headers).then(
      function (response) {
        return Promise.resolve("Created word with id: " + response.data.id);
      }
    ).catch(
      function (error) {
        return Promise.resolve(error.message);
      }
    );

    // Set the message shown to the user
    this.handleSetMessage(retVal);

    // Reset the fields the user will want to
    // change for a new word, but leave Language
    // and source unchanged, to prevent having
    // to enter duplicate data for those fields.
    this.setState({romanization: ''});
    this.setState({meaning: ''});
    this.setState({type: ''});
    this.setState({mainSymbols: ''});
    this.setState({ancillarySymbols: ''});
  }

  // Set the success message that
  // tells the user if the database
  // query succeeded
  handleSetMessage(response) {
    this.setState({successMessage: response});
  }

  /*
  Render the input boxes
  for inputting word data.
  */
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td width = "500" height = "100">
              <label>
                Set Language:
                <input type="text" value={this.state.language} onChange={this.handleChangeLanguage.bind(this)} />
              </label>
              <br />
              <label>
                Set Romanization:
                <input type="text" value={this.state.romanization} onChange={this.handleChangeRomanization.bind(this)} />
              </label>
              <br />
              <label>
                Set Meaning:
                <input type="text" value={this.state.meaning} onChange={this.handleChangeMeaning.bind(this)} />
              </label>
              <br />
              <label>
                Set Type:
                <input type="text" value={this.state.type} onChange={this.handleChangeType.bind(this)} />
              </label>
              <br />
              <label>
                Set Main Symbols:
                <input type="text" value={this.state.mainSymbols} onChange={this.handleChangeMain.bind(this)} />
              </label>
              <br />
              <label>
                Set Ancillary Symbols:
                <input type="text" value={this.state.ancillarySymbols} onChange={this.handleChangeAncillary.bind(this)} />
              </label>
              <br />
              <label>
                Set Source:
                <input type="text" value={this.state.source} onChange={this.handleChangeSource.bind(this)} />
              </label>
              <br />
              <button onClick = {this.handleSaveClick.bind(this)}>
                Save
              </button>
            </td>

            <td width = "500" height = "100">
              <p>
              Language: {this.state.language}
              </p>
              <p>
              Romanization: {this.state.romanization}
              </p>
              <p>
              Meaning: {this.state.meaning}
              </p>
              <p>
              Type: {this.state.type}
              </p>
              <p>
              Main Symbols: {this.state.mainSymbols}
              </p>
              <p>
              Ancillary Symbols: {this.state.ancillarySymbols}
              </p>
              <p>
              Source: {this.state.source}
              </p>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td width = "500" height = "100">
              <p>
                {this.state.successMessage}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default WordEntry;
