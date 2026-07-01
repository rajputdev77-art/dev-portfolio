"use client";
import { track } from "@/lib/track";

export default function PrintButton() {
  return (
    <button
      className="cv-print-btn"
      onClick={() => {
        track("cv_print_clicked", {});
        window.print();
      }}
    >
      PRINT / SAVE AS PDF ↓
    </button>
  );
}
