'use client'
import { useState, useEffect } from 'react';
import styles from './styles/page.module.scss';
import { Layout, Row, Col, Select, Input, Radio } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { fetchCurrencies } from './api/getCurrencies';
import { fetchCrypto, CryptoRate } from './api/getCrypto';

const { Header, Content, Footer } = Layout;

interface CurrencyRate {
    value: string;
    label: string;
    rate: number;
}

export default function App() {
    const [currencyType, setCurrencyType] = useState('currency');
    const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);
    const [cryptoRates, setCryptoRates] = useState<CryptoRate[]>([]);
    const [amount, setAmount] = useState<number | string>(0);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('TRY');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [currencyRates, setCurrencyRates] = useState<{ [key: string]: number }>({});

    const handleCurrencyTypeChange = (e: any) => {
        const newCurrencyType = e.target.value;
        setCurrencyType(newCurrencyType);
        setAmount(0);
        setConvertedAmount(0);
        if (newCurrencyType === 'currency') {
            setFromCurrency('USD');
            setToCurrency('TRY');
        } else {
            setFromCurrency('BTCUSDT')
            setToCurrency('ETHUSDT');
        }
    };

    useEffect(() => {
        if (currencyType === 'currency') {
            fetchCurrencies().then(data => {
                setCurrencies(data);
                const rates = data.reduce((acc, cur) => {
                    acc[cur.value] = cur.rate;
                    return acc;
                }, {} as { [key: string]: number });
                setCurrencyRates(rates);
            });
        } else if (currencyType === 'crypto') {
            fetchCrypto().then(data => {
                setCryptoRates(data);
                const rates = data.reduce((acc, cur) => {
                    acc[cur.value] = cur.rate;
                    return acc;
                }, {} as { [key: string]: number });
                setCurrencyRates(rates);
            });
        }
    }, [currencyType]);

    const handleAmountChange = (e: any) => {
        const value = e.target.value;
        if (value === '' || isNaN(value)) {
            setAmount('');
            setConvertedAmount(0);
        } else {
            setAmount(parseFloat(value));
        }
    };

    const handleFromCurrencyChange = (value: string) => {
        setFromCurrency(value);
    };

    const handleToCurrencyChange = (value: string) => {
        setToCurrency(value);
    };
    
    const convertCurrency = (amount: number, fromRate: number, toRate: number): number => {
        return (amount / fromRate) * toRate;
    };
    
    const convertCrypto = (amount: number, fromRate: number, toRate: number): number => {
        return (amount * fromRate) / toRate;
    };
    

    useEffect(() => {
        if (fromCurrency && toCurrency && amount && currencyRates[fromCurrency] && currencyRates[toCurrency]) {
            if (currencyType === 'currency') {
                const converted = convertCurrency(parseFloat(amount as string), currencyRates[fromCurrency], currencyRates[toCurrency]);
                setConvertedAmount(converted);
            } else if (currencyType === 'crypto') {
                const converted = convertCrypto(parseFloat(amount as string), currencyRates[fromCurrency], currencyRates[toCurrency]);
                setConvertedAmount(converted);
            }
        }
    }, [amount, fromCurrency, toCurrency, currencyRates, currencyType]);

    return (
        <Layout style={{height: '100vh'}}>
            <Header style={{background: '#fff', height: '10vh', textAlign: 'center', padding: '0px'}}>
                <h1>Currency Converter</h1>
            </Header>

            <Content style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                padding: '24px'                
            }}>

                <Row style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#fff'
                }}>
                    <Col>
                        <Radio.Group onChange={handleCurrencyTypeChange} value={currencyType}>
                            <Radio style={{ borderRadius: '0px' }} value="currency">Currency</Radio>
                            <Radio style={{ borderRadius: '0px' }} value="crypto">Crypto</Radio>
                        </Radio.Group>
                    </Col>
                </Row>

                <Row style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#fff',
                    gap: '1rem'
                }}>

                    <Col>
                        <Input.Group compact>
                            <Input 
                                style={{ width: 'calc(100% - 100px)' }} 
                                value={amount} 
                                onChange={handleAmountChange} 
                            />
                            <Select 
                                value={fromCurrency} 
                                style={{ width: 100 }} 
                                onChange={handleFromCurrencyChange}
                            >
                                {currencyType === 'currency' && currencies.map(currency => (
                                    <Select.Option key={currency.value} value={currency.value}>
                                        {currency.label}
                                    </Select.Option>
                                ))}
                                {currencyType === 'crypto' && cryptoRates.map(crypto => (
                                    <Select.Option key={crypto.value} value={crypto.value}>
                                        {crypto.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Input.Group>
                    </Col>

                    <Col>
                        <SwapOutlined style={{ fontSize: '18px', color: '#000' }} />
                    </Col>

                    <Col>
                        <Input.Group compact>
                            <Input 
                                style={{ width: 'calc(100% - 100px)' }} 
                                value={convertedAmount.toFixed(6)} 
                                disabled 
                            />
                            <Select 
                                value={toCurrency} 
                                style={{ width: 100 }} 
                                onChange={handleToCurrencyChange}
                            >
                                {currencyType === 'currency' && currencies.map(currency => (
                                    <Select.Option key={currency.value} value={currency.value}>
                                        {currency.label}
                                    </Select.Option>
                                ))}
                                {currencyType === 'crypto' && cryptoRates.map(crypto => (
                                    <Select.Option key={crypto.value} value={crypto.value}>
                                        {crypto.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Input.Group>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}