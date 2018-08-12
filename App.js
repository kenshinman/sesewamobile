import React, { Component } from "react";
import { Platform, StyleSheet, Text, ScrollView } from "react-native";
import Meteor, { withTracker, MeteorListView } from "react-native-meteor";
import { List, ListItem } from "react-native-elements";

console.disableYellowBox = true;

// Meteor.connect("ws://sesewa.org/websocket"); //do this only once
Meteor.connect("ws://192.168.8.100:4000/websocket"); //do this only once

class App extends Component {
  renderRow() {
    return this.props.opportunities.map(opp => {
      return (
        <ListItem
          key={opp._id}
          title={opp.title}
          subtitle={opp.opportunity_type}
        />
      );
    });
  }
  render() {
    console.log(this.props);
    if (!this.props.ready) {
      return <Text>Loading...</Text>;
    }
    return <ScrollView>{this.props.ready && this.renderRow()}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default withTracker(params => {
  const handle = Meteor.subscribe("allOpportunities");
  Meteor.subscribe("allOpportunities");

  return {
    ready: handle.ready(),
    opportunities: Meteor.collection("opportunities").find(
      {},
      { fields: { title: 1, opportunity_type: 1 } }
    )
  };
})(App);
