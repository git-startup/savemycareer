'use client';

// This file is needed to solve the "use client" directive conflict with generateMetadata
// It's just a simple re-export of your original Header component

import Header from './Header';

// No need to add any RTL/LTR handling here as it's handled in the Header component
export default function ClientHeader() {
  return <Header />;
}