import { CiSearch } from "react-icons/ci";
import { AiFillPlusCircle } from "react-icons/ai";
import useDisclose from "../../hooks/useDisclose";
import AddContactForm from "../AddContactForm/AddContactForm";
import { useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

function SearchContact({ setContactList, setIsEmpty }) {
  const { isOpen, onOpen, onClose } = useDisclose();
  // const [contact, setContact] = useState({
  //   name: "",
  //   email: "",
  // });

  function filterContact(e) {
    const searchValue = e.target.value;

    const contactsRef = collection(db, "contacts");
    // const contactsSnapshot = await getDocs(contactsRef);

    onSnapshot(contactsRef, (snapshot) => {
      const contacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredContact = contacts.filter((contact) =>
        contact.name.toUpperCase().includes(searchValue.toUpperCase())
      );
      if (filteredContact.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
      setContactList(filteredContact);
      return filteredContact;
    });
  }
  return (
    <>
      <div className="flex gap-2 my-4">
        <div className="flex flex-grow relative items-center">
          <CiSearch className="absolute ml-1 text-3xl text-white" />

          <input
            onChange={filterContact}
            className="h-10 flex-grow text-white rounded-md bg-transparent border outline-none placeholder:text-white pl-9"
            type="text"
            placeholder="search"
          />
        </div>

        {/* Add Contact Section */}

        <div onClick={onOpen} className="cursor-pointer">
          <AiFillPlusCircle className="text-5xl text-white" />
        </div>
      </div>
      <AddContactForm isOpen={isOpen} onClose={onClose} isUpdate={false} />
    </>
  );
}

export default SearchContact;
