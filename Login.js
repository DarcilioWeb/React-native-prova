import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import bcrypt from 'bcryptjs';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/users?email=' + email);
      const users = await response.json();

      if (users.length === 0) {
        setError('Usuário não encontrado');
        setSuccessMessage('');
        return;
      }

      const user = users[0];
      const match = await bcrypt.compare(pass, user.senha);

      if (match) {
        setSuccessMessage('Login realizado com sucesso!');
        setError('');
      } else {
        setSuccessMessage('');
        setError('Senha incorreta');
      }
    } catch (error) {
      setSuccessMessage('');
      setError('Erro de conexão com a API');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null} 

      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

      <View style={styles.buttonSpacing} />
      <Button 
        title="Ir para o Cadastro" 
        onPress={() => navigation.navigate('Cadastro')} 
        color="gray" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonSpacing: {
    height: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 12,
  },
  successText: {
    color: 'green',
    fontSize: 16,
    marginTop: 12,
  },
});

export default Login;
