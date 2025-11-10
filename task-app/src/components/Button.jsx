import clsx from "clsx";

export default function Button({
  variant = "primary",
  children,
  className,
  ...props
}) {
  const base = "px-4 py-2 font-semibold rounded-lg focus:outline-none transition";
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button className={clsx(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
