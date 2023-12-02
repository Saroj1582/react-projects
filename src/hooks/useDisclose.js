import { useState } from "react";

function useDisclose() {
  const [isOpen, setOpen] = useState(false);

  function onOpen() {
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

  return { isOpen, onOpen, onClose };
}

export default useDisclose;
