import TopHeading from "./components/TopHeading/TopHeading";
import "./App.css";
import SearchContact from "./components/SearchContact/SearchContact";
import NoContact from "./components/NoContact/NoContact";
import Contacts from "./components/Contacts/Contacts";
import AddContactForm from "./components/AddContactForm/AddContactForm";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDisclose from "./hooks/useDisclose";

function App() {
  const [contactList, setContactList] = useState([]);

  const [isEmpty, setIsEmpty] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactsSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot) => {
          const contacts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setContactList(contacts);
          return contacts;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="w-[361px] m-auto relative">
      <TopHeading />
      <SearchContact
        setIsEmpty={setIsEmpty}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setContactList={setContactList}
      />

      {!isEmpty ? (
        contactList.map((contact) => (
          <Contacts key={contact.id} contact={contact} />
        ))
      ) : (
        <NoContact />
      )}

      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
