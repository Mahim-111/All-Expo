import { View, Text } from 'react-native'
import React from 'react'
import MyButton from '@/components/MyButton'

const Index = () => {
  return (
    <View style = {{flex:1, justifyContent: "center", alignItems:"center"}}>
      <MyButton title={"Continue"}/>
    </View>
  )
}

export default Index