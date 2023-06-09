import Head from "next/head";
import React from "react";
import Graph from "@/components/graph";
import styles from "@/styles/Home.module.scss";
import PinIcon from "@/components/icons/PinIcon";
import { catOne, catTwo } from "@/constant/tabs-array";
import { connect } from "react-redux";
import { RootState } from "@/typings/store";
import AddBox from "@/components/icons/AddBox";
import { updateTab } from "@/store/slices/tabs";
import RemoveBox from "@/components/icons/RemoveBox";

class Home extends React.Component {
  state = {
    tabOne: true,
    tabTwo: true,
  };

  whenOpen = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    console.log(this.state);

    const dropdownStyle = {
      dOne: {
        maxHeight: this.state.tabOne ? "200px" : "0px",
        overflow: "hidden",
      },
      dTwo: {
        maxHeight: this.state.tabTwo ? "200px" : "0px",
        overflow: "hidden",
      },
    };
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.graphtab}>
          <div className={styles.tabs}>
            <label className={styles.mainlabel}>Col1</label>
            <div className={styles["tab-container"]}>
              <label
                className={styles.label}
                onClick={() => this.whenOpen("tabOne", !this.state.tabOne)}
              >
                {this.state.tabOne ? (
                  <RemoveBox height={18} width={18} fill="#555" />
                ) : (
                  <AddBox height={18} width={18} fill="#555" />
                )}
                {catOne.name}
              </label>
              <ul style={dropdownStyle.dOne}>
                {catOne.category.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() =>
                        this.props.dispatch(
                          updateTab({
                            key: "tabOne",
                            value: item.label,
                          })
                        )
                      }
                    >
                      <span className={styles["name"]}>{item.label}</span>
                      {this.props.tabs.tabOne === item.label ? (
                        <PinIcon height={16} width={16} fill="#fff" />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles["tab-container"]}>
              <label
                className={styles.label}
                onClick={() => this.whenOpen("tabTwo", !this.state.tabTwo)}
              >
                {this.state.tabTwo ? (
                  <RemoveBox height={18} width={18} fill="#555" />
                ) : (
                  <AddBox height={18} width={18} fill="#555" />
                )}
                {catTwo.name}
              </label>
              <ul style={dropdownStyle.dTwo}>
                {catTwo.category.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() =>
                        this.props.dispatch(
                          updateTab({
                            key: "tabTwo",
                            value: item.label,
                          })
                        )
                      }
                    >
                      <span className={styles["name"]}>{item.label}</span>
                      {this.props.tabs.tabTwo === item.label ? (
                        <PinIcon height={16} width={16} fill="#fff" />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles.raectselectbox}>
            <ul>
              <li>
                <select name="" id="">
                  <option value="1">a</option>
                  <option value="1">b</option>
                  <option value="1">c</option>
                </select>
              </li>
              <li>
                <select name="" id="">
                  <option value="1">d</option>
                  <option value="1">e</option>
                  <option value="1">f</option>
                </select>
              </li>
            </ul>
            <div className={styles.reactgraph}>
              <Graph />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  tabs: state.tabs,
});

export default connect(mapStateToProps)(Home);
