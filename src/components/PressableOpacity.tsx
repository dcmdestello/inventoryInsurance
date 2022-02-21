import { Pressable, PressableProps, ViewStyle } from 'react-native';

export default function PressableOpacity({onPress, style, children, ...props}: PressableProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        (style as ViewStyle),
      ]}
      pressRetentionOffset={10}
      {...props}
      >
      {children}
    </Pressable>
  )

}
