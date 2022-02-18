import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Notify, NotifyProps, Loader } from "components/elements";
import { AuthStore } from "store/auth";

type InitDataProps = {
  openLoader: (isOpen: boolean) => void;
  showNotify: (
    type: "open" | "close",
    title?: string,
    message?: string,
    action?: () => void,
    force?: boolean
  ) => void;
};

const InitContext = createContext<InitDataProps>({
  openLoader: () => {},
  showNotify: () => {},
});

type ProviderProps = {
  children: ReactNode;
};

export function InitDataProvider({ children }: ProviderProps): JSX.Element {
  const { expiresIn, logout } = AuthStore((state) => ({
    expiresIn: state.expiresIn,
    logout: state.logout,
  }));

  useEffect(() => {
    if (!!expiresIn) return;

    logout();
  }, [expiresIn]);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [notify, setNotify] = useState<NotifyProps>({
    isOpen: false,
    title: "",
    message: "",
    force: false,
    setOpen: (isOpen: boolean) => {
      setNotify({ ...notify, isOpen: isOpen });
    },
  });

  const showNotify = (
    type: "open" | "close",
    title?: string,
    message?: string,
    action?: () => void,
    force?: boolean
  ): void => {
    if (type === "close") {
      setNotify({
        ...notify,
        isOpen: false,
        title: "",
        message: "",
        action: undefined,
        force: false,
      });
      return;
    }

    setNotify({
      ...notify,
      isOpen: true,
      title: title || "",
      message: message || "",
      action: action,
      force: force || false,
    });
  };

  const openLoader = (isOpen: boolean): void => setLoading(isOpen);

  const contextOption = {
    openLoader,
    showNotify,
  };

  return (
    <InitContext.Provider value={contextOption}>
      <Loader.Action isOpen={isLoading} />
      {children}
      <Notify
        title={notify.title}
        message={notify.message}
        isOpen={notify.isOpen}
        setOpen={(isOpen) => setNotify({ ...notify, isOpen: isOpen })}
        action={notify.action}
        force={notify.force}
      />
    </InitContext.Provider>
  );
}

export function useInitData(): InitDataProps {
  const context = useContext(InitContext);
  if (context === null) {
    throw new Error("Provider was not wrapped by parent layer");
  }
  return context;
}
