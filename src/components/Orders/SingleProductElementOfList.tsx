import React from "react";
import {Image, View} from "react-native";
import {Text} from "react-native-paper";
import {Product} from "../../interfaces/product.interface";
import {roundPrice} from "../../helpers/roundPrice";

interface SingleProductElementOfListProps {
    product: Product;
}

export const SingleProductElementOfList = (props: SingleProductElementOfListProps) => {
    const {product} = props
    return (
        <View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Image source={{uri: product.image.src}} style={{width: 50, height: 50, marginRight: 7}}/>
            <View style={{flexBasis: 170, flexGrow: 2}}>
                <Text style={{fontSize: 18}}>{product.name}</Text>
                <Text style={{
                    color: 'grey',
                    fontSize: 15
                }}>{`${product.meta_data[0].display_value}${product.meta_data[1] ? `, ${product.meta_data[1].display_value}` : ''} • ${product.quantity} x ${roundPrice(product.price)} zł`}</Text>
            </View>
            <Text style={{}}>{`${product.subtotal} zł`}</Text>
        </View>
    )
}