import { useState } from 'react';
import './App.css';
import { Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

const konsonanter = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
function App() {

  const [input, setInput] = useState('');
  const [translatorOutput, setTransalatorOutput] = useState('')

  function translatorInput(value) {
    const valueList = value.split('');

    for (let i = 0; i < valueList.length; i++) {
      const char = valueList[i];
      if (konsonanter.includes(char)) {
        valueList.splice(i, 1, char, 'o', char)
        i += 2
      }
    }

    setInput(value);
    setTransalatorOutput(valueList.join(''));

  }


  async function postData() {
    // Default options are marked with *
    const response = await fetch('https://v2.jokeapi.dev/joke/Any', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return response.json();
  }

  return (
    <div className="app">
      <div className="app-container">
        <h2 className="text-center mb-5 text-white">Joke api</h2>
        <div className="form-wrapper rounded shadow mb-4">
          <div className="translator">
            <div className="mb-3">
              <Form.Label>Input text</Form.Label>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <FormControl
                    onChange={(e) => translatorInput(e.target.value)}
                    value={input}
                    type="text"
                    placeholder=""></FormControl>
                </div>
                <div>
                  <button onClick={() => postData().then(data => translatorInput(data.delivery ? data.delivery : data.joke))} className="btn btn-primary ms-3">Load random joke</button>
                </div>
              </div>
            </div>
            {translatorOutput &&
              <textarea className="translator-ouptut border" value={translatorOutput} c />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
