import React from "react";
import {Avatar, Button, ListItem, Text} from "@ui-kitten/components";
import {getStatusColor} from "../../helpers/orderStatusConverter";


export const SingleOrderElementOfList = (props: any) => {
    const {order} = props


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("default", {month: "short"});
        return `${day} ${month}`;
    };
    const statusColor = getStatusColor(order.status)

    const InstallButton = (): React.ReactElement => (
        <Button size='small' appearance='outline' status='basic'>
            {`${order.total} zł`}
        </Button>
    );

    const ItemImage = (props: any): React.ReactElement => (
        <Avatar
            {...props}
            style={[props.style]}
            source={require('../../../assets/icon.png')}
        />
    );

    const Test = (): React.ReactElement => (
        <>
            <Text>{`${order.billing.first_name} ${order.billing.last_name}`}</Text>
        </>


    )

    return (
        <ListItem
            title='UI Kitten'
            description={<Test/>}
            accessoryLeft={ItemImage}
            accessoryRight={InstallButton}
            style={{marginBottom: 5, marginTop: 5}}
        />
    );
}