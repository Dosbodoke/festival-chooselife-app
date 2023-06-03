import { LoadingIcon } from "../assets";

interface Props {
  label: string;
  loading?: boolean;
  icon?: JSX.Element;
  onClick?: () => void;
}

function PrimaryButton({ label, loading, icon, onClick }: Props) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {loading ? (
        <LoadingIcon className="mr-3 inline h-4 w-4 animate-spin text-white" />
      ) : (
        <span className="flex flex-row items-center justify-center gap-2">
          {icon} {label}
        </span>
      )}
    </button>
  );
}

export default PrimaryButton;
