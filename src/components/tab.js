import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import styled from 'styled-components';

import Editor from "./Editor";
class TAB extends React.Component {
  constructor(props) {
    super(props);

    this.characters = {
      "Ant-Man": { img: "https://reactcommunity.org/react-tabs/eec97ae821295f42e3969e082be11fac.png", color: "transparent", text: "white", desc: `{
        bladerunner(func: uid(0x579683)) {
          uid
          name@en
          initial_release_date
          netflix_id
        }
      }` },
      "Black Widow": { img: "https://reactcommunity.org/react-tabs/eec97ae821295f42e3969e082be11fac.png", color: "transparent", text: "white", desc: `{
        scott(func: eq(name@en, "Ridley Scott")) {
          name@en
          initial_release_date
          director.film @filter(le(initial_release_date, "2000")) {
            name@en
            initial_release_date
          }
        }
      }` },
      "Captain America": { img: "https://reactcommunity.org/react-tabs/eec97ae821295f42e3969e082be11fac.png", color: "transparent", text: "white", desc: `{
        var(func: eq(name@en,"Minority Report")) {
          d as initial_release_date
        }
      
        me(func: eq(name@en, "Steven Spielberg")) {
          name@en
          director.film @filter(ge(initial_release_date, val(d))) {
            initial_release_date
            name@en
          }
        }
      }
      ` },
      "Director Fury": { img: "https://reactcommunity.org/react-tabs/eec97ae821295f42e3969e082be11fac.png", color: "transparent", text: "white", desc: `{
        ID as var(func: allofterms(name@en, "Steven")) @filter(has(director.film)) {
          director.film {
            num_actors as count(starring)
          }
          average as avg(val(num_actors))
        }
      
        films(func: uid(ID)) {
          director_id : uid
          english_name : name@en
          average_actors : val(average)
          num_films : count(director.film)
      
          films : director.film {
            name : name@en
            english_name : name@en
            french_name : name@fr
          }
        }
      }` },
      Hawkeye: { img: "https://reactcommunity.org/react-tabs/eec97ae821295f42e3969e082be11fac.png", color: "transparent", text: "white", desc: "\"Just can't seem to miss.\"" },
      "Iron Man": { img: "https://reactcommunity.org/react-tabs/eec97ae821295f42e3969e082be11fac.png", color: "transparent", text: "black", desc: "\"My armor was never a distraction or a hobby. It was a cocoon. And now I'm a changed man. You can take away my house, all my tricks and toys. But one thing you can't take away... I am Iron Man.\"" },
      Loki: { img: "https://reactcommunity.org/react-tabs/eec97ae821295f42e3969e082be11fac.png", color: "transparent", text: "black", desc: "\"I, Loki, Prince of Asgard, Odinson, the rightful King of Jotunheim, God of Mischief, do hereby pledge to you, my undying fidelity.\"" },
      Thor: { img: "https://reactcommunity.org/react-tabs/eec97ae821295f42e3969e082be11fac.png", color: "transparent", text: "black", desc: "\"You know I’m 1500 years old. I’ve killed twice as many enemies as that. And every one of them would have rather killed me than not succeeded. I’m only alive because fate wants me alive. Thanos is just the latest of a long line of bastards, and he’ll be the latest to feel my vengeance. Fate wills it so.\"" },
      "War Machine": { img: "https://reactcommunity.org/react-tabs/eec97ae821295f42e3969e082be11fac.png", color: "transparent", text: "black", desc: "\"138 combat missions. That's how many I've flown, Tony. Every one of them could've been my last, but I flew 'em. Because the fight needed to be fought.\"" }
    };

    this.state = {
      "Ant-Man": true,
      "Black Widow": true,
      "Captain America": true,
      "Director Fury": false,
      Loki: false,
      Hawkeye: true,
      "Iron Man": true,
      Thor: true,
      "War Machine": true
    };

    this.handleCheckClicked = this.handleCheckClicked.bind(this);
  }

  handleCheckClicked(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  render() {
    const links = [];
    const tabs = [];
    const tabPanels = [];

    Object.keys(this.characters).forEach(name => {
      links.push(
        <label key={name}>
          <input
            type="checkbox"
            checked={this.state[name]}
            name={name}
            onChange={this.handleCheckClicked}
          />
          {name}{" "}
        </label>
      );

      if (!this.state[name]) return;

      const { img, color: backgroundColor, text: color, desc } = this.characters[name];

      tabs.push(
        <Tab style={{ backgroundColor }}>
          <img src={img} alt={name} height="32" width="32" />
        </Tab>
      );

      tabPanels.push(
        <TabPanel style={{ backgroundColor, color }} className="avengers-tab-panel">
          <Editor code={desc}/>
        </TabPanel>
      );
    });

const VerticalTabs = styled(Tabs)`
    display: flex;
    `;

const VerticalTabList = styled(TabList)`
    display: flex;
    flex-direction: column;
    `;

    return (
      <div>
        <VerticalTabs
          selectedTabClassName="avengers-tab--selected"
          selectedTabPanelClassName="avengers-tab-panel--selected"
        >
          <VerticalTabList className="avengers-tab-list">{tabs}</VerticalTabList>
          {tabPanels}
        </VerticalTabs>
      </div>
    );
  }
}

export default TAB;