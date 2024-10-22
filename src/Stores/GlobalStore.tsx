import { createContext, PropsWithChildren, useContext } from "react";
import { CartStoreType } from "../types/providerTypes";

type GlobalContextType = {
    cartStore: CartStoreType|null
};

const GlobalContext = createContext<GlobalContextType|null>(null);

type Props = PropsWithChildren;

export const GlobalStoreProvider = ({children}: Props) => {
    return (
        <GlobalContext.Provider value={{
            cartStore: null
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalStore = (): GlobalContextType => {
    const globalContext = useContext(GlobalContext);
    if(globalContext === null) {
        throw new Error('To use globalStore, you must wrap your component with GlobalStoreProvider');
    }
    return globalContext;
}
