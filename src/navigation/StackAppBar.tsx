import React from 'react';
import { Appbar } from 'react-native-paper';

const StackAppBar = ({ navigation, route, options, back }: any) => {
    return (
        <Appbar.Header>
            {/* 🔑 BACK BUTTON — only when back exists */}
            {back ? (
                <Appbar.BackAction onPress={navigation.goBack} />
            ) : null}

            <Appbar.Content
                title={options.title ?? route.name}
            />
        </Appbar.Header>
    );
};

export default StackAppBar;
