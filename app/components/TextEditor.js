/*
 * Text Editor
 *
 * This is the textEditor that will be viewed in the homepage
 *
 */

import React, { useState } from 'react';
import AceEditor from 'react-ace';
import Sandbox from 'worker-sandbox';
// Import a Mode (language)
import 'brace/mode/javascript';

// Theme for the text editor
import 'brace/theme/tomorrow_night_eighties';
import styles from '../css/editor.css';

function TextEditor() {
  const [state, setState] = useState({
    codeText: '',
  });
  function onChange(newValue) {
    setState({
      codeText: newValue,
    });
  }
  async function onSubmit() {
    const sandbox = new Sandbox();
    try {
      const { codeText } = state;
      const output = await sandbox.eval(codeText);
      console.log(output);
      return setState({
        ...state,
        output,
      });
    } catch (ex) {
      console.log(ex);
      return setState({
        ...state,
        output: 'Unknown Error',
      });
    } finally {
      sandbox.destroy();
    }
  }

  return (
    <div className={styles.editor}>
      <div className={styles.editorWrap}>
        <AceEditor
          mode="javascript"
          placeholder="Enter your javascript here!"
          theme="tomorrow_night_eighties"
          onChange={onChange}
          name="textEditor"
          id="textEditor"
          editorProps={{ $blockScrolling: true }}
          fontSize={18}
          width="100%"
          height="400px"
          enableLiveAutocompletion
          value={state.codeText}
        />
      </div>
      <div className={styles.btnWrap}>
        <button type="button" onClick={() => onSubmit()}>
          Run
        </button>
      </div>
      <div className={styles.outputBox}>
        <h2>Outputs: </h2>
        <p>{state.output}</p>
      </div>
    </div>
  );
}

export default TextEditor;
