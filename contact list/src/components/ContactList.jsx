// import React from "react"; 
import { useEffect } from 'react';
import { useState } from 'react'
import ContactRow from "./ContactRow";


// const dummyContacts = [
//     { id: 1, name: "R2-D2", phone: "222-222-2222", email: "r2d2@droids.com" },
//     { id: 2, name: "C-3PO", phone: "333-333-3333", email: "c3po@droids.com" },
//     { id: 3, name: "BB-8", phone: "888-888-8888", email: "bb8@droids.com" },
//   ];

export default function ContactList({ setSelectedContactId }) { 
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    // console.log('Contacts:', contacts)

    useEffect(()=> {
        async function fetchContacts() {
            try {
                const response = await fetch(
                  "https://jsonplace-univclone.herokuapp.com/users"
                );
                const result = await response.json();
                setContacts(result);
            } catch (error) {
                setError(error);
            }
        }
        fetchContacts();
        // console.log(contacts)
    }, []);


    return (
      <table>
        <thead>
          <tr>
            <th colSpan="3">Contact List</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Phone</td>
            <td>Email</td>
          </tr>
          {error ? (
            <tr>{error}</tr>
          ) : (
            contacts.map((contact) => {
              return (
                <ContactRow
                  key={contact.id}
                  contact={contact}
                  setSelectedContactId={setSelectedContactId}
                />
              );
            })
          )}
        </tbody>
      </table>
    );
  }