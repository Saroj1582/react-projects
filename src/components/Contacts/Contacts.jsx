import { IoIosContact } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import useDisclose from "../../hooks/useDisclose";
import AddContactForm from "../AddContactForm/AddContactForm";
import { useState } from "react";
import { toast } from "react-toastify";
function Contacts({ contact }) {
  const { isOpen, onClose, onOpen } = useDisclose();
  //   const [contactToEdit, setContactToEdit] = useState({
  //     name: contact.name,
  //     email: contact.email,
  //   });

  const deleteContact = async (id) => {
    try {
      const contactRef = collection(db, "contacts");
      await deleteDoc(doc(contactRef, id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }

    // const newContactList = contactList.filter((item) => item.id !== id);
    // setContactList(newContactList);
  };

  //   function handlEditContact() {
  //     setEditContact({ name: contact.name, email: contact.email });
  //     setIsEditContact(true);
  //   }

  return (
    <>
      <div className="flex justify-between items-center p-2 mb-3 bg-[#FFEAAE] rounded-lg">
        <div className="flex items-center gap-1">
          <IoIosContact
            //   onClick={handlEditContact}
            className="text-4xl text-orange-500"
          />

          <div>
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl gap-1">
          <RiEditCircleLine onClick={onOpen} className=" cursor-pointer" />

          <FaTrash
            onClick={() => deleteContact(contact.id)}
            className=" cursor-pointer"
          />
        </div>
      </div>
      <AddContactForm
        isOpen={isOpen}
        onClose={onClose}
        contact={contact}
        isUpdate={true}
      />
    </>
  );
}

export default Contacts;
