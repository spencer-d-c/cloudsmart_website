import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'CloudSmart - Platinum Salesforce Consultancy - London',
  description: 'CloudSmart is a Platinum Salesforce Partner that helps businesses of all sizes maximise their Sales and Marketing efforts. Get in touch for more details!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}