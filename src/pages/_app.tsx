
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { ThemeProvider } from '@/theme/theme'
import { LangProvider } from '@/theme/language'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LangProvider>
        <Component {...pageProps} />
      </LangProvider>
    </ThemeProvider>


  )
}
