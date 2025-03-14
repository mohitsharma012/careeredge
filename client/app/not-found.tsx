// pages/404.js
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Custom404 = () => {
  return (
    <div >
      this is a custom 404 page
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
};

export default Custom404;
