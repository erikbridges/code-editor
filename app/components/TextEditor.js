/*
 * Text Editor
 *
 * This is the textEditor that will be viewed in the homepage
 *
 */

import React, { useState } from 'react';
import AceEditor from 'react-ace';
import safeEval from 'notevil';
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
  function onSubmit() {
    const { codeText } = state;
    console.log(codeText);
    const output = safeEval(codeText);
    console.log(output);
    return setState({
      ...state,
      output,
    });
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
