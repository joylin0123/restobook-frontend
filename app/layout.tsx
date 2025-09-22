import "./globals.css";
import Navbar from "./components/NavBar";
export const metadata = {
  title: "Restobook",
  description: "Restaurant booking app demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-8">{children}</main>
      </body>
    </html>
  );
}
