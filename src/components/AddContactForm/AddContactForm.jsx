import { useState } from "react";
import Modal from "../Modal/Modal";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
// import useDisclose from "../../hooks/useDisclose";
function AddContactForm({ isOpen, onOpen, onClose, contact, isUpdate }) {
  const [newContact, setNewContact] = useState(
    isUpdate
      ? {
          name: contact.name,
          email: contact.email,
        }
      : {
          name: "",
          email: "",
        }
  );

  function handleOnchange(e) {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  }

  function editContact(newContact, id) {
    const documentRef = doc(db, "contacts", id);

    updateDoc(documentRef, newContact)
      .then(() => {
        console.log("Document successfully updated!");
        toast.success("Contact Updated Successfully");
      })

      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  const addNewContact = async () => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, newContact);
      toast.success("Contact Added Successfully");
      setNewContact({
        name: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  function addContacts(e) {
    e.preventDefault();
    // console.log(contact);
    isUpdate ? editContact(newContact, contact.id) : addNewContact(newContact);
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <form className="flex flex-col p-4 gap-5 min-h-[200px] bg-white rounded  w-full">
          <div className="flex flex-col gap-2">
            <label className="" htmlFor="name">
              Name
            </label>
            <input
              onChange={handleOnchange}
              className="border border-black outline-none p-3"
              name="name"
              type="text"
              value={newContact.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleOnchange}
              className="border border-black outline-none p-3"
              type="email"
              name="email"
              value={newContact.email}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={addContacts}
              className="border border-black rounded bg-[#FCCA3F] py-[6px] px-3"
            >
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddContactForm;
