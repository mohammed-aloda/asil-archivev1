import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'CAD' | 'USD';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (amountInCAD: number) => string;
    convertPrice: (amountInCAD: number) => number;
    exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Fixed exchange rate for MVP: 1 USD = 1.40 CAD
const EXCHANGE_RATE_CAD = 1.40;

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Default to CAD as requested
    const [currency, setCurrency] = useState<Currency>('CAD');

    // Prices are stored in CAD. Convert to USD if needed.
    const convertPrice = (amountInCAD: number): number => {
        if (currency === 'USD') {
            return amountInCAD / EXCHANGE_RATE_CAD;
        }
        return amountInCAD; // Already CAD, no conversion needed
    };

    const formatPrice = (amountInCAD: number): string => {
        const convertedAmount = convertPrice(amountInCAD);
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(convertedAmount);
    };

    return (
        <CurrencyContext.Provider value={{
            currency,
            setCurrency,
            formatPrice,
            convertPrice,
            exchangeRate: currency === 'CAD' ? EXCHANGE_RATE_CAD : 1
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
