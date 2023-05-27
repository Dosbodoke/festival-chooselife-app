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
      className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      {loading ? (
        <LoadingIcon className="inline w-4 h-4 mr-3 text-white animate-spin" />
      ) : (
        <span className="flex flex-row items-center justify-center gap-2">
          {icon} {label}
        </span>
      )}
    </button>
  );
}

export default PrimaryButton;
