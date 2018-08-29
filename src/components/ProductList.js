import { Text, View, StyleSheet, Image } from 'react-native'

export const ProductList = ({ data }) => {
    if(!data){
        data = []
    }
    return data.map((item, index) => {
        return (
            <View style={styles.productContainer}>
                <Image source="" />
                <View style={styles.contentBox}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.bottomMsg}>

                    </View>
                </View>
            </View>
        )
    })
}

const styles = StyleSheet.create({
    productContainer:{
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentBox:{

    },
    title:{

    },
    bottomMsg:{

    }
})