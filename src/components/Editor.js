import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const electron = window.require("electron");
// // const electron = ipcRenderer.require("electron");

// const ipcRenderer = electron.ipcRenderer;
// console.log(electron)
//let width = 800
 let { width } = electron.remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds()
// // console.log('size:', remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds());

// ipcRenderer.on('resize', function (e, x, y) {
//  console.log(e, x, y, "RESIZE DUDE!")
//   });

// var monitorWidth = document.body.clientWidth;
// var monitorHeight = screen.height;

// console.log(monitorWidth + "x" + monitorHeight);

monaco.editor.defineTheme('myCustomTheme', {
	base: 'vs-dark', // can also be vs-dark or hc-black
	inherit: true, // can also be false to completely replace the builtin rules
	rules: [
		{ token: 'comment', foreground: '002b36', fontStyle: 'italic underline' },
		{ token: 'comment.js', foreground: '002b36', fontStyle: 'bold' },
		{ token: 'comment.css', foreground: '002b36' } // will inherit fontStyle from `comment` above
  ],
  colors: {
    'editorIndentGuides.background': '#00000000',
    'editorIndentGuide.activeBackground': '#00000000',
    'editor.background': '#00000000',
    'editor.caret': '#00000000',
    'editor.foreground': '#00000000',
    'editor.gutter': '#00000000',
    'editor.invisibles': '#00000000',
    'editor.lineHighlight': '#00000000',
    'editor.selection': '#00000000',
    'editor.inactiveSelection': '#00000000',
    'editor.selectionBorder': '#00000000',
    'editor.guide': '#00000000',
    'editor.activeLinkForeground': '#00000000',
    'editor.selectionHighlight': '#00000000',
    'editor.hoverHighlight': '#00000000',
    'editor.findMatchHighlight': '#00000000',
    'editor.currentFindMatchHighlight': '#00000000',
    'editor.wordHighlight': '#00000000',
    'editor.wordHighlightStrong': '#00000000',
    'editor.referenceHighlight': '#00000000',
    'editor.rangeHighlight': '#00000000',
    'editor.findRangeHighlight': '#00000000',
  }

});

window.addEventListener('resize', console.log("resize"));
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code,
    }
  }
  editorDidMount(editor, monaco) {
    // console.log('editorDidMount', editor);
    editor.focus();
  }
  // onChange(newValue, e) {
  //   console.log('onChange', newValue, e);
  // }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      minimap: { enabled: false }
    };
    let wid = width - 65
    return (
      <MonacoEditor
        width={wid}
        height="600"
        language="javascript"
        // theme="vs-dark"
        theme="myCustomTheme"
        value={code}
        options={options}
        // onChange={::this.onChange}
        editorDidMount={this.editorDidMount}
        // style={{background-color: rgba(0, 0, 0, 0.92)}}
      />
    );
  }
}
