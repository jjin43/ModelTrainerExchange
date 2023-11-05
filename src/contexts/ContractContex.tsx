import { createContext, ReactNode, useState } from "react";

const defaultValue = {
  contractStatus: '',
  setContractStatus: (newValue: string) => {},
}

export const ContractContext = createContext(defaultValue)

export const ContractContextProvider = (props: { children: ReactNode | undefined }) => {
  const [contractStatus, setContractStatus] = useState('')

  return (
    <ContractContext.Provider
      value={{
        contractStatus: contractStatus,
        setContractStatus: setContractStatus
      }}
    >
      {props.children}
    </ContractContext.Provider>
  )
}