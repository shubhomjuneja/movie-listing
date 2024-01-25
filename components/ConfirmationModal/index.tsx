import React from "react";
import Button from "../Button";

type Props = {
  setShowModal: () => void;
  handleConfirmation: any;
  modalTitle: string;
  modalSubTitle: string;
};

function ConfirmationModal({
  setShowModal,
  handleConfirmation,
  modalTitle,
  modalSubTitle,
}: Props) {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" />
      <div
        className={`z-50 absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-full max-w-[400px] bg-card flex justify-between items-center rounded-xl px-2`}
      >
        <div className="flex justify-center flex-col w-full p-8">
          <div className="text-left">
            <p className="text-[30px] text-white">{modalTitle || ""}</p>
            <p className="text-[20px] text-white mt-2">{modalSubTitle || ""}</p>
          </div>
          <div className="flex justify-end w-full mt-7">
            <div className="flex justify-center mr-[20px]">
              <button
                className="border border-1 border-white px-3 py-1 w-[100px] rounded-[5px] font-[500] text-[14px] text-white"
                onClick={setShowModal}
              >
                No
              </button>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[white] px-3 py-1 w-[100px] rounded-[5px] font-[500] text-[14px] text-black"
                onClick={() => handleConfirmation(true)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
