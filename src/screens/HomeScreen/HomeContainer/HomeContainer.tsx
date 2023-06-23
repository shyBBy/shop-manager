import React from "react";
import {useAuth} from "../../../hooks/useAuth";
import {Text} from "@ui-kitten/components";

export const HomeContainer = () => {

    const {user} = useAuth()

    return(
        <>
            {user?.data.store}
        </>
    )

}