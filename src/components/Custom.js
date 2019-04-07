import React from "react";

// TODO: Use react-dock to simulate a terminal.
//import Dock from "react-dock";

const Custom = () => {
  return (
    <div className="ui container">
      <h3>
        React{" "}
        <span>
          <img
            src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-32.png"
            width="32"
          />
        </span>
        + Parcel{" "}
        <span>
          <img src="https://parceljs.org/assets/parcel@2x.png" width="32" />{" "}
        </span>
        + Electron{" "}
        <span>
          <img src="https://electronjs.org/images/favicon.ico" width="32" />
        </span>{" "}
        = Awesomeness ! 🎉
      </h3>
      {/* <Dock position='bottom' isVisible={true} style={{ background: 'rgba(0, 0, 100, 0.2)' }}>
      <h3 style={{ color: "black"}}>teste </h3>
      <div onClick={() => this.setState({ isVisible: !this.state.isVisible })}>X</div>
    </Dock> */}
    </div>
  );
};

export default Custom;
