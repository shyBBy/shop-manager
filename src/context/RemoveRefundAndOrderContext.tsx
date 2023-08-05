import {createContext, useState} from "react";

export const RemoveRefundAndOrderContext = createContext({
    isDeleting: false,
    setIsDeleting: (value: boolean) => {}
})


export const RemoveRefundAndOrderProvider = ({children}: {children: JSX.Element}) => {
    const [isDeleting, setIsDeleting] = useState(false)

    return (
        <RemoveRefundAndOrderContext.Provider value={{ isDeleting, setIsDeleting }}>
            {children}
        </RemoveRefundAndOrderContext.Provider>
    )
}