type Props = {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
};
export const SocialButton = ({ title, icon, onClick }: Props): JSX.Element => {
  return (
    <button
      type="button"
      className="p-2 text-sm flex items-center space-x-1"
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </button>
  );
};
