import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

export default function PlayerPoints() {
  const [pointsPlayer1, setPlayer1] = useState(0);
  const [pointsPlayer2, setPlayer2] = useState(0);
  const [winPlayer1, setWinPlayer1] = useState(0);
  const [winPlayer2, setWinPlayer2] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [statusPlay, setSatusPlay] = useState('');
  const [inputStart, setInputStart] = useState(true);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [validate, setValidate] = useState('');

  let sec = 'segundos';

  const validar = () => {
    if ((player1Name, player2Name) == '') {
      setValidate(`Preencha os Campos!`);
      setInputStart(true);
      setPlayer1(0);
      setPlayer2(0);
    } else {
      setSatusPlay('Em andamento');
      setInputStart(false);
      setValidate('');
      setSeconds(0);
      if (isRunning === true) {
        interval = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
      }
    }
  };

  const cancel = () => {
    clearInterval(interval);
    setInputStart(true);
    setSatusPlay('Cancelada');
    setPlayer1Name('');
    setPlayer2Name('');
    setGameOverMessage('');
    setPlayer1(0);
    setPlayer2(0);
    setWinPlayer1(0);
    setWinPlayer2(0);
  };

  const finish = (winner) => {
    clearInterval(interval);
    setSatusPlay('Finalizada');
    setInputStart(true);
    setPlayer1Name('');
    setPlayer2Name('');
    setPlayer1(0);
    setPlayer2(0);
    setWinPlayer1(0);
    setWinPlayer2(0);
    setGameOverMessage(
      `Player ${winner}, Congratulations on Winning the Game!!`
    );
  };

  const reset = () => {
    setSatusPlay('');
    setPlayer1(0);
    setSeconds(0);
    setPlayer2(0);
    setGameOverMessage('');
    setValidate('');
    setWinPlayer1(0);
    setWinPlayer2(0);
  };

  const descPoints1 = () => {
    if (pointsPlayer1 > 0) {
      setPlayer1(pointsPlayer1 - 1);
    }
  };

  const descPoints2 = () => {
    if (pointsPlayer2 > 0) {
      setPlayer2(pointsPlayer2 - 1);
    }
  };

  const tellPlayer1 = () => {
    if ((player1Name, player2Name) == '') {
      setValidate(`Preencha os Campos!`);
    } else {
      if (pointsPlayer1 === 10 && pointsPlayer2 === 10) {
        setPlayer1(pointsPlayer1 + 1);
      } else if (pointsPlayer1 >= 10 && pointsPlayer1 - pointsPlayer2 === 1) {
        setPlayer1(pointsPlayer1 + 1);
        setWinPlayer1(winPlayer1 + 1);
        finish(player1Name);
      } else if (pointsPlayer1 >= 10 && pointsPlayer1 - pointsPlayer2 >= 2) {
        setWinPlayer1(winPlayer1 + 1);
        if (winPlayer1 + 1 === 2) {
          finish(player1Name);
        } else {
          handleGameOver(player1Name);
        }
      } else {
        setPlayer1(pointsPlayer1 + 1);
      }
    }
  };

  const tellPlayer2 = () => {
    if ((player1Name, player2Name) == '') {
      setValidate(`Preencha os Campos!`);
    } else {
      if (pointsPlayer1 === 10 && pointsPlayer2 === 10) {
        setPlayer2(pointsPlayer2 + 1);
      } else if (pointsPlayer2 >= 10 && pointsPlayer2 - pointsPlayer1 === 1) {
        setPlayer2(pointsPlayer2 + 1);
        setWinPlayer2(winPlayer2 + 1);
        finish(player2Name);
      } else if (pointsPlayer2 >= 10 && pointsPlayer2 - pointsPlayer1 >= 2) {
        setWinPlayer2(winPlayer2 + 1);
        if (winPlayer2 + 1 === 2) {
          finish(player2Name);
        } else {
          handleGameOver(player2Name);
        }
      } else {
        setPlayer2(pointsPlayer2 + 1);
      }
    }
  };

  const handleGameOver = (winner) => {
    setPlayer1(0);
    setPlayer2(0);
    setGameOverMessage(`Player ${winner} Congratulations on Winning the Set!!`);
  };

  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>
        <Text
          style={
            styles.paragraph
          }>{` Súmula Tênis de Mesa - JIFENA 2024 `}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Player 1 Name"
        value={player1Name}
        onChangeText={setPlayer1Name}
        required
        editable={inputStart}
      />
      <TextInput
        style={styles.input}
        placeholder="Player 2 Name"
        value={player2Name}
        onChangeText={setPlayer2Name}
        required
        editable={inputStart}
      />
      <TouchableOpacity
        onPress={validar}
        disabled={!inputStart}
        style={styles.buttonStart}
        value={statusPlay}>
        <Text style={{ color: 'white' }}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={cancel}
        disabled={inputStart}
        style={styles.buttonCancel}
        value={statusPlay}>
        <Text style={{ color: 'white' }}>Cancel</Text>
      </TouchableOpacity>
      <View style={styles.adversarios}>
        <Text style={styles.adversarios}>{player1Name}</Text>
        <Text style={styles.adversarios}>X</Text>
        <Text style={styles.adversarios}>{player2Name}</Text>
      </View>
      <View style={styles.adversarios}>
        <Text style={styles.adversarios}>Sets Player 1: {winPlayer1}</Text>
        <Text style={styles.adversarios}></Text>
        <Text style={styles.adversarios}>Sets Player 2: {winPlayer2}</Text>
      </View>
      <View style={styles.adversarios}>
        <Text style={styles.adversarios}>Points Player 1: {pointsPlayer1}</Text>
        <Text style={styles.adversarios}></Text>
        <Text style={styles.adversarios}>Points Player 2: {pointsPlayer2}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <View style={{ flex: 1 }}>
          <Button title="+1 Player 1" onPress={tellPlayer1} />
          <Button title="-1 Player 1" onPress={descPoints1} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="+1 Player 2" onPress={tellPlayer2} />
          <Button title="-1 Player 2" onPress={descPoints2} />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Button title="Reset" onPress={reset} />
        </View>
      </View>
      <FlatList
        style={styles.flat}
        data={[{ key1: statusPlay }, { key2: seconds }, { key3: sec }]}
        renderItem={({ item }) => (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.textCenter}>{item.key1}</Text>
            <Text style={styles.textCenter}>
              {item.key2}
              {item.key3}
            </Text>
          </ScrollView>
        )}
      />
      {gameOverMessage !== '' && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>{gameOverMessage}</Text>
        </View>
      )}
      {validate !== '' && (
        <View style={styles.validateContainer}>
          <Text style={styles.validateText}>{validate}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    margin: 20,
  },
  paragraph: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  adversarios: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  buttonCancel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  flat: {
    marginTop: 8,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  gameOverContainer: {
    backgroundColor: '#9ccc65',
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
  },
  gameOverText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  validateContainer: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
  },
  validateText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});