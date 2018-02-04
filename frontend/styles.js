const React = require('react-native')
const { StyleSheet } = React


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
     
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        color: "#f00",
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'stretch',
        // justifyContent: 'center',
    },
    refreshBtn: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

module.exports = styles