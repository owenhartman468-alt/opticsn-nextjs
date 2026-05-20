import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./globals.css";

export const metadata = {
  title: "Optics-N | Home Eye Care",
  description: "Professional eye checkups and home visit eye care for your whole family. Because your parents deserve comfort and your child deserves patience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
