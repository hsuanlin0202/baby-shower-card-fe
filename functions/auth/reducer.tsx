type Action = {
  type: "auth-null" | "auth-pass" | "auth-fail";
};

type State = {
  type: "loading" | "logged" | "no-logged";
};

export const AuthReducer = (state: State, action: Action): State => {
  if (action.type === "auth-fail" || action.type === "auth-null") {
    return { ...state, type: "no-logged" };
  }

  if (action.type === "auth-pass") {
    return { ...state, type: "logged" };
  }

  return state;
};
