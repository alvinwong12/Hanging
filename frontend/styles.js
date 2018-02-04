const React = require('react-native')
const { StyleSheet } = React


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 30,
        width: "100%",
    },
    list: {
        flex: 1,
        backgroundColor: '#fff',
        width: "100%",
        paddingVertical: 5,
        
    },
    listItem: {
        flex: 1,
        
        // lineHeight: 40,
        // color: "blue",
        // backgroundColor: 'black',
        justifyContent: 'flex-start',
        // textAlign: "left",
    },
    listItemUsername: {
        flex: 1,
        
        fontSize: 20,
        fontWeight: 'bold',
        
        color: "#ff9a91",
        // backgroundColor: 'black',
        // justifyContent: 'flex-end',
        textAlign: "left",
        fontFamily: "Verdana",
    },
    listItemStatus: {
        flex: 1,
        
        // lineHeight: 40,
        fontStyle: 'italic',
        // color: "white",
        // backgroundColor: 'black',
        // justifyContent: 'flex-end',
        textAlign: "left",
        marginVertical: 5,
        fontFamily: "Verdana",
        
    },
    input: {
     
        height: 40,
        flex: 3,
        // width: "100%",
        backgroundColor: '#fff',
        // backgroundColor: 'green',
        borderColor: 'transparent',
        color: "#ff9a91",
        alignItems: 'center',
        justifyContent: 'center',
    },
    refreshBtn: {
        flex: 1,
        height: 40,
        backgroundColor: '#000',
        // backgroundColor: '#00f',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Verdana",
    },
});

module.exports = styles