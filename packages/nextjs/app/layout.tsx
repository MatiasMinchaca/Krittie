import { Katibeh, Poppins } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { cn } from "~~/utils";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const katibeh = Katibeh({ subsets: ["latin"], weight: "400", variable: "--font-katibeh" });
const poppins = Poppins({ subsets: ["latin"], weight: "400", variable: "--font-poppins" });

export const metadata = getMetadata({
  title: "Krittie",
  description: "lorem ipsum dolor sit amet consectetur adipiscing elit",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning className={`${katibeh.variable} ${poppins.variable}`}>
      <body className={cn("max-w-[393px] mx-auto font-sans relative overflow-x-hidden", katibeh.className)}>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
