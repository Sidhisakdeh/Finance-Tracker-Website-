import { useRef } from "react";
import { RotateCcw } from "lucide-react";
import { useFinance } from "../contexts/FinanceContext";

export default function ResetButton({ variant = "sidebar" }) {
  const { resetAll } = useFinance();
  const dialogRef = useRef(null);

  function openConfirm() {
    dialogRef.current?.showModal();
  }

  function handleConfirm() {
    resetAll();
    dialogRef.current?.close();
  }

  const triggerClass = variant === "sidebar" ? "reset-link" : "reset-link-mobile";

  return (
    <>
      <button className={triggerClass} onClick={openConfirm} type="button">
        <RotateCcw size={18} />
        Reset
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Reset all data?</h3>
          <p className="py-3 text-sm text-base-content/70">
            This will permanently clear all transactions, budgets, and your savings
            goal from this browser. This action can not be undone. Are you sure you want to
            proceed?
          </p>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => dialogRef.current?.close()}
            >
              No, cancel
            </button>
            <button type="button" className="btn btn-error" onClick={handleConfirm}>
              Yes, reset everything
            </button>
          </div>
        </div>
        {/* click-outside-to-close backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}