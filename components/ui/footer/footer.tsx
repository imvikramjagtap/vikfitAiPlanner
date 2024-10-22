import React from "react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0  flex w-full items-center justify-center p-2 text-xs bg-transparent "
    >
      <p>VikFit Meal Planner, by <a className="text-blue-500" href="https://vikramjagtap.dev" target="_blank">Vikram Jagtap</a> © {year}</p>
    </footer>
  );
}
