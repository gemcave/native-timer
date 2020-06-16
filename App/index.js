import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, Picker, TouchableOpacity, Dimensions, Platform} from 'react-native';
import { useEffect } from 'react';


const screen = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: '#07121B',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: "white",
		fontSize: 45,
		color: "#89AAFF"
	},
	button: {
		borderWidth: 10,
		borderColor: "#89AAFF",
		width: screen.width / 2,
		height: screen.width / 2,
		borderRadius: screen.width / 2,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30
	},
	buttonStop: {
		borderColor: "#FF851B"
	},	
	buttonTextStop: {
		color: "#FF851B"
	},	
	timerText: {
		fontSize: 90,
		color: '#fff'
	},
	pickerContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	picker: {
		width: 50,
		...Platform.select({
			android: {
				color: "#fff",
				backgroundColor: "#07121B",
				marginLeft: 10
			}
		})
	},
	pickerItem: {
		color: "#fff",
		fontSize: 20
	}
});
const formatNumber = (number) => `0${number}`.slice(-2)

const getRamainig = (time) => {
	const minutes = Math.floor(time / 60)
	const seconds = time - minutes * 60

	return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
}


export default function App() {
	const [remainingSeconds,setRemainingSeconds] = useState(0)
	const [isRunning,setIsRunning] = useState(false)
	const [selectedMinutes,setSelectedMinutes] = useState("0")
	const [selectedSeconds,setSelectedSeconds] = useState("5")
	
	const { minutes, seconds } = getRamainig(remainingSeconds)
	const intervalRef = useRef(null);

	const createArray = length => {
		const arr = [];
		let i = 0;
		while (i < length) {
			arr.push(i.toString());
			i += 1;
		}
	
		return arr;
	};

	const AVAILABLE_MINUTES = createArray(11);
	const AVAILABLE_SECONDS = createArray(60);
	
	const start = () => {
		setRemainingSeconds(parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10) + 1 )
		if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
			setIsRunning(true)
      setRemainingSeconds((remainingSeconds) => {
        if (remainingSeconds >= 1) return remainingSeconds - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
	}

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
		setRemainingSeconds(60);
		setIsRunning(false)
  }

	const stop = () => {
		if (intervalRef.current === null) return;
		clearInterval(intervalRef.current);
		intervalRef.current = null
		setIsRunning(false)
	}

	const renderPickers = () => {
		return (
			<View style={styles.pickerContainer}>
				<Picker
					style={styles.picker}
					itemStyle={styles.pickerItem}
					selectedValue={selectedMinutes}
					onValueChange={itemValue => setSelectedMinutes(itemValue)}
					mode="dropdown"
					>
						{AVAILABLE_MINUTES.map(value => 
								(<Picker.Item key={value} label={value} value={value} />))}
				</Picker>
				<Text style={styles.pickerItem}>minutes</Text>
				<Picker
					style={styles.picker}
					itemStyle={styles.pickerItem}
					selectedValue={selectedSeconds}
					onValueChange={itemValue => setSelectedSeconds(itemValue)}
					mode="dropdown"
					>
						{AVAILABLE_SECONDS.map(value => 
								(<Picker.Item key={value} label={value} value={value} />))}
				</Picker>
				<Text style={styles.pickerItem}>seconds</Text>
			</View>
		)
	}
	

  return (
    <View style={styles.container}>
			<StatusBar barStyle="light-content" />
			{isRunning ? (<Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>) : renderPickers()}
			{isRunning ? (
				<TouchableOpacity onPress={() => stop()} style={[styles.button, styles.buttonStop]}>	
					<Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity onPress={() => start()} style={styles.button}>	
					<Text style={styles.buttonText}>Start</Text>
				</TouchableOpacity>
				)}
    </View>
  );
}

