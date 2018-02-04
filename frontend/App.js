import React from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';

// import { Icon } from 'react-native-vector-icons';
// import EStyleSheet from 'react-native-extended-stylesheet';
// EStyleSheet.build({ "$outline": 1 });

const styles = require('./styles.js');
const DEFAULT_STATUS = "Hey there! I am hanging";
const DUMMY_RESPONSE = {
  data: [
    {
      id: "Sample_Random_Id_1",
      username: "Lacie P",
      location: {
        latitude: "lat",
        longitude: "long",
      },
      status: "Freaking out about a wedding",
    },
    {
      id: "Sample_Random_Id_2",
      username: "Naomi",
      location: {
        latitude: "lat",
        longitude: "long",
      },
      status: "Going to the beach!!!",
    },
    {
      id: "Sample_Random_Id_3",
      username: "Ryan",
      location: {
        latitude: "lat",
        longitude: "long",
      },
      status: "Just bored on my way home. Looking to contemplate the meaning of life and avoid the spiral of darkness that follows.",
    },
  ],
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "RandomId",
      username: "MyUsername",
      latitude: null,
      longitude: null,
      error: null,
      list: DUMMY_RESPONSE.data,
      status: DEFAULT_STATUS,
      refreshing: false,
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        ...this.state,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    })
  }

  sendLocation() {
    fetch('http://localhost:8000/rest/submit', {
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
      }).catch((error) => console.log("error", error))
  }

  OnPressUpdate() {
    this.sendLocation();
    this.setState({
      ...this.state,
      list: DUMMY_RESPONSE.data,
    })
  }

  handleRefresh = () => {
    console.log("HANDLE RESFRESH HANDLE RESFRESH HANDLE RESFRESH HANDLE RESFRESH HANDLE RESFRESH HANDLE RESFRESH ");
    this.setState({
      ...this.setState,
      refreshing: true,
    });
    this.setState({
      ...this.state,
      list: [...this.state.list,
      {
        id: "Sample_Random_Id_4",
        username: "Robert",
        location: {
          latitude: "lat",
          longitude: "long",
        },
        status: "Going to lunch at ${insert potential sponsor}"
      }],
    });

    fetch('http://localhost:8000/nearby')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        
        this.setState({
          ...this.state,
          list: [...this.state.list,
            ...responseJson
          ],
        });

        return responseJson
      }).catch((error) => {
        console.log("error", error)
      }).finally(() => {
        this.setState({
          ...this.setState,
          refreshing: false,
        });
      });

  }

  render() {

    return (
      <View style={styles.container}>
        <Image
          source={require('./images/hanging.png')}
          style={{ height: 50 }}
          resizeMode="contain"
        />

        <Text style={{ fontSize: 22, textAlign: "left", width: "100%", fontFamily: "Verdana", marginVertical: 10 }}>Potential friends available:</Text>
        <FlatList
          style={styles.list}
          data={this.state.list}
          keyExtractor={(item, index) => index}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemUsername}>{item.username}</Text>
              <Text style={styles.listItemStatus}>{item.status}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => (<View style={{ height: 1 + StyleSheet.hairlineWidth, backgroundColor: "#ff9a91", margin: 5 }} />)}
        />
        <KeyboardAvoidingView behavior="padding" style={{ flexDirection: 'row', backgroundColor: "#ff9a91", borderRadius: 4, borderWidth: 0, }}>
          {/* <View style={{ flexDirection: 'row' }}> */}
          <TextInput placeholder={this.state.status} style={styles.input} onChangeText={(text) => this.setState({ text })} />

          <Button
            onPress={() => this.OnPressUpdate()}
            title="Update"
            color="#fff"
            accessibilityLabel="Update Status"
          />
          {/* </View> */}
        </KeyboardAvoidingView>

      </View>
    );
  }
}

