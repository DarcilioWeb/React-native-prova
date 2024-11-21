 import React, { useState } from 'react';
 import { View, TextInput, Text, StyleSheet, Alert, Button } from 'react-native';
 import { useNavigation } from '@react-navigation/native';
 import bcrypt from 'bcryptjs'

 const Cadastro = () => {
   const navigation = useNavigation();
   const [username, setUsername] = useState('');
   const [usernameerror, setUsernameerror] = useState('');
   const [pass, setPass] = useState('');
   const [pass2, setPass2] = useState('');
   const [email, setEmail] = useState('');
   const [email2, setEmail2] = useState('');
   const [error1, setError1] = useState('');
   const [error2, setError2] = useState('');
   const [error3, setError3] = useState('');
   const [error4, setError4] = useState('');

   const validareUsername = (text) => {
    setUsername(text);
    if (text.trim() === '') {
      setUsernameerror('Vazio');
    } else if (text.length < 3 ) {
      setUsernameerror('Nome de usuario pequeno');
    } else {
      setUsernameerror('');
    }
   }

   const validatePass = (text) => {
    setPass(text);
    let errors = [];
    if (!/[A-Z]/.test(text)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula.');
    }
    if (!/\d/.test(text)) {
      errors.push('A senha deve conter pelo menos um dígito.');
    }
    if (!/[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`\\|-]/.test(text)) {
      errors.push('A senha deve conter pelo menos um caractere especial.');
    }
    if (text.length === 0) {
      errors.push('A senha não pode estar vazia.');
    }
    if (text.length < 6) {
      errors.push('A senha não poder ser menor que 6 caracteres');
    }
    if (errors.length > 0) {
      setError1(errors.join(' '));
    } else {
      setError1('');
    }
  };

    const validateEmail = (text) => {
     setEmail(text);
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (text.trim() ===''){
      setError2('O e-mail esta vazio');
     } else if (emailRegex.test(text)) {
       setError2('');
     } else {
       setError2('Endereço de e-mail inválido');
     }
   };

   const igualEmail = (text) => {
    setEmail2(text);
    if (email === text) {
      setError3('Os Email estao Iguais');
    } else {
      setError3('Os Email estao errado');
    }
   };

   const igualPass = (text) => {
    setPass2(text);
    if (pass === text) {
      setError4('As Senhas estao Iguais');
    } else {
      setError4('As Senhas estao errado');
    }
   };

   const handleHash = async () => {
    const hashSenha = await bcrypt.hash(pass, 10)

    const dadosAPI = {
      username,
      email,
      senha: hashSenha,
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAPI),
      });
  
      if (response.ok) {
        Alert.alert('Cadastro realizado com sucesso!');
      } else {
        Alert.alert('Erro ao realizar o cadastro');
      }
    } catch (error) {
      Alert.alert('Erro de conexão com a API');
    }
    navigation.navigate('Login');
   };

   const errorTextStyle = error3 === 'Os Email estao Iguais' ? styles.successText : styles.errorText;
   const errorTextStyle2 = error4 === 'As Senhas estao Iguais' ? styles.successText : styles.errorText;


   return (
    <View style={styles.container}>
      <TextInput
         style={styles.input}
         placeholder="Digite seu nome de Usuario"
         value={username}
         onChangeText={validareUsername}
       />
       {usernameerror ? <Text style={styles.errorText}>{usernameerror}</Text> : null}
       <TextInput
         style={styles.input}
         placeholder="Digite seu e-mail"
         value={email}
         onChangeText={validateEmail}
         keyboardType="email-address"
       />
       {error2 ? <Text style={styles.errorText}>{error2}</Text> : null}
       <TextInput
         style={styles.input}
         placeholder="Confirme seu e-mail"
         value={email2}
         onChangeText={igualEmail}
         keyboardType="email-address"
       />
       {error3 ? <Text style={errorTextStyle}>{error3}</Text> : null}
       <TextInput
         style={styles.input}
         placeholder="Digite sua Senha"
         value={pass}
         onChangeText={validatePass}
         secureTextEntry={true}
       />
       {error1 ? <Text style={styles.errorText}>{error1}</Text> : null}
       <TextInput
         style={styles.input}
         placeholder="Confirme sua Senha"
         value={pass2}
         onChangeText={igualPass}
         secureTextEntry={true}
       />
       <Button title="Enviar cadastro" onPress={handleHash} />
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
   errorText: {
     color: 'red',
     fontSize: 16,
   },
   successText: {
    color: 'green',
    fontSize: 16,
  },
 });

export default Cadastro;