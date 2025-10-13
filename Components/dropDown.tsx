import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, StyleSheet } from 'react-native'
import React, {ReactNode, useEffect, useRef, useState} from 'react'

export const MenuTrigger = ({children}:{children: ReactNode}) => {
  return <>{children}</>
}


export const MenuOption = ({onSelect, children}:{onSelect: ()=> void; children: ReactNode}) =>{
  return (
    <TouchableOpacity onPress={onSelect} className='p-1 '>
      {children}
    </TouchableOpacity>
  )
}

interface DropDownProps {
  visible: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  trigger: ReactNode;
  children: ReactNode;
  dropDownWidth?: number;
}



export const DropdownMenu: React.FC<DropDownProps> = ({
  visible,
  handleOpen,
  handleClose,
  trigger,
  children,
  dropDownWidth = 360,
}) => {
  const triggerRef = useRef<View>(null);
  const [position, setPosition] = useState({x:0,y:0,width:0});

  useEffect (()=>{
    if(triggerRef.current && visible){
      triggerRef.current.measure((fx, fy, width, height, px, py)=>{
        setPosition({
          x:px,
          y:py+10,
          width:width
        });
      });
    };

  },[visible])

  return (
    <View >
      <TouchableWithoutFeedback onPress={handleOpen}>
        <View ref={triggerRef}>{trigger}</View>
      </TouchableWithoutFeedback>
      {visible && (
        <Modal transparent={true}
               visible={true}
               animationType='fade'
               onRequestClose={handleClose} >
                <TouchableWithoutFeedback onPress={handleClose}>
                  <View className='flex-1 justify-start align-centert' >
                    <View className='position-absolute bg-white rounded-md items-start px-1'
                    style={{top:position.y, left:position.x + position.width / 2 - dropDownWidth / 2,
                            width:dropDownWidth,
                    }}>
                      {children}
                    </View>
                  </View>

                </TouchableWithoutFeedback>
               </Modal>
      )}
    </View>
  )

}

