import { StyleSheet, Text, View,TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import uuid from 'react-native-uuid';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, onValue, set, get} from "firebase/database";
import {app,auth} from '../FirebaseConfig';


export default function AddBooks(){

     const [bookName, setBookName] = useState();
     const [writer, setWriter] = useState();
      const database = getDatabase(app);

        const AddBook = (writer, bookName) => {
          const booksRef = ref(database, 'books');

          get(booksRef)
            .then((snapshot) => {
              let bid = uuid.v4();
              let currentBooks = snapshot.exists() ? Object.values(snapshot.val()) : [];
              const newBook = {
                id: bid,
                writer: writer,
                bookName: bookName,
                owner: [],
                wisher: [],
              };
              const updatedBooks = [...currentBooks, newBook];
              const updatedBooksObject = updatedBooks.reduce((acc, book) => {
                acc[bid] = book;
                return acc;
              }, {});

              set(booksRef, updatedBooksObject)
                .then(() => {
                  // Success callback
                  console.log('Book added successfully!');
                })
                .catch((error) => {
                  // Handle set() error
                  console.error('Error setting books:', error);
                });
            })
            .catch((error) => {
              // Handle get() error
              console.error('Error getting books:', error);
            });
        };


     return(
        <View>
            <TextInput
                    editable
                    placeholder='bookName'
                    numberOfLines={1}
                    maxLength={40}
                    onChangeText={text => setBookName(text)}
                    value={bookName}
                    style={{padding: 10, backgroundColor:"whitesmoke",width:300}}
                  />
                  <TextInput
                    editable
                    placeholder='writer'
                    numberOfLines={1}
                    maxLength={40}
                    onChangeText={text => setWriter(text)}
                    value={writer}
                    style={{padding: 10, backgroundColor:"whitesmoke",width:300}}
                  />

                <Pressable
                    style={styles.button}
                    onPress={() => AddBook(writer, bookName) }>
                    <Text style={styles.buttonText}>Wish Add</Text>
                </Pressable>

                <Pressable
                   style={styles.button}
                   onPress={() => AddBook(writer, bookName) }>
                   <Text style={styles.buttonText}>Own Add</Text>
                </Pressable>
        </View>
     );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    marginTop: 5,
    backgroundColor: 'whitesmoke',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});