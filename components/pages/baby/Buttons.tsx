import ArrowIcon from "assets/svg/arrow.svg";
import _clsx from "clsx";
import { overrideTailwindClasses } from "tailwind-override";

const clsx = (...classNames: string[]) =>
  overrideTailwindClasses(_clsx(...classNames));

export function BackButton() {
  return (
    <button className="flex">
      <ArrowIcon className="w-3.5 mr-5" />
      Back
    </button>
  );
}

export function Button({ className, value }) {
  return (
    <button
      className={clsx("bg-brown-500 rounded-lg p-2 px-8 text-white", className)}
    >
      {value}
    </button>
  );
}
