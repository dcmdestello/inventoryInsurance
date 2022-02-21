import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store'
import { Provider } from 'react-redux'
import { ToastProvider } from 'react-native-toast-notifications'
// import { useFonts } from "expo-font";
// import { fonts } from './src/theme/fonts';
// import { ActivityIndicator, Text } from 'react-native';

// import boldFont from './assets/fonts/CircularStd-Bold.woff';
// import regularFont from './assets/fonts/CircularStd-Medium.woff';

// "https://fonts.cdnfonts.com/s/15011/CircularStd-Medium.woff",
// "https://fonts.cdnfonts.com/s/15011/CircularStd-Bold.woff",
export default function App() {
    // const [fontsLoaded] = useFonts({
    //   [fonts.regular]: regularFont,
    //   [fonts.bold]: boldFont,
    // });
    // if(!fontsLoaded) return <Text>Loading fonts...</Text>;

    // <ActivityIndicator size="large" style={{justifyContent: 'center', flex: 1}} />
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <ToastProvider>
            <Navigation />
            <StatusBar />
          </ToastProvider>
        </SafeAreaProvider>
      </Provider>
    );
}
