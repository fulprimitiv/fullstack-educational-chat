'use client';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import React from 'react';

export function ThemeProvider({ children, ...props }) {
	return (
		<NextThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem={true}
			themes={['light', 'dark']}
			storageKey="app-theme"
			disableTransitionOnChange={false}
			{...props}
		>
			{children}
		</NextThemeProvider>
	);
}