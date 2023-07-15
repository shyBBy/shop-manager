import React, { useState } from 'react';
import {Text} from "@ui-kitten/components";
import { Drawer, DrawerGroup, DrawerItem, IndexPath } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';


export const Test = () => {

    const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>(undefined);

    const handleSelectItem = (index: IndexPath) => {
        setSelectedIndex(index);
        // Dodaj tutaj obsługę dla wybranego elementu
    };

    return(
        <>
            <View style={styles.container}>
                <Drawer
                    selectedIndex={selectedIndex}
                    onSelect={handleSelectItem}
                >
                    <DrawerGroup title="Akveo React Native">
                        <DrawerItem title="UI Kitten" />
                        <DrawerItem title="Kitten Tricks" />
                    </DrawerGroup>
                    <DrawerGroup title="Akveo Angular">
                        <DrawerItem title="Nebular" />
                        <DrawerItem title="ngx-admin" />
                        <DrawerItem title="UI Bakery" />
                    </DrawerGroup>
                    <DrawerGroup title="Akveo Design">
                        <DrawerItem title="Eva Design System" />
                        <DrawerItem title="Eva Icons" />
                    </DrawerGroup>
                </Drawer>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});