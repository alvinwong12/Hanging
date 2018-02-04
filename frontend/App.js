import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';

const styles = require('./styles.js');
const DEFAULT_STATUS = "Hey there! I am hanging";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "RandomId",
      username: "MyUsername",
      latitude: null,
      longitude: null,
      error: null,
      list: [{ key: 'a' }, { key: 'b' }],
      status: DEFAULT_STATUS,
    }

  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        ...this.state,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      })
    })
  }

  sendLocation() {
    fetch('http://localhost:8000/fake/hanging', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        username: this.state.username,
        location: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
        status: this.state.status,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson
      }).catch((error) => console.log(error))
  }

  OnPressRefresh() {
    this.sendLocation();
    this.setState({
      ...this.state,
      list: [{ key: 5 }, { key: 7 },],
    })
  }

  render() {
    
    return (
      <View style={styles.container}>
        <TextInput placeholder={this.state.status} style={styles.input} onChangeText={(text) => this.setState({ text })} />
        <FlatList
          style={styles.list}
          data={this.state.list}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
        <Button
          style={styles.refreshBtn}
          onPress={() => this.OnPressRefresh()}
          title="Refresh"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

