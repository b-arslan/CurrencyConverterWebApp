
# Currency and Crypto Converter

This project is a web application that allows users to convert between traditional currencies and cryptocurrencies. The application uses Ant Design components for the user interface and fetches exchange rates from FreeCurrencyAPI for traditional currencies and Binance API for cryptocurrencies.

## Features
- Convert between traditional currencies (e.g., USD, EUR, TRY)
- Convert between cryptocurrencies (e.g., BTC, ETH, USDT)
- Switch between currency and crypto conversion modes
- Automatically fetches the latest exchange rates
- User-friendly interface with Ant Design components

## Installation

1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:
    ```bash
    cd <project_directory>
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add your FreeCurrencyAPI and Binance API keys to the `.env` file:
        ```plaintext
        FREECURRENCYAPI_KEY=your_freecurrencyapi_key
        BINANCE_API_KEY=your_binance_api_key
        ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

- Open your browser and navigate to `http://localhost:3000`.
- Select the conversion mode (Currency or Crypto) using the radio buttons.
- Enter the amount to be converted in the input field.
- Select the source and target currencies/cryptocurrencies from the dropdown menus.
- The converted amount will be displayed automatically.

## Project Structure

- `pages/api/getCurrencies.ts`: Fetches exchange rates for traditional currencies from FreeCurrencyAPI.
- `pages/api/getCrypto.ts`: Fetches exchange rates for cryptocurrencies from Binance API.
- `pages/index.tsx`: Main component of the application, handles user inputs and conversion logic.
- `styles/page.module.scss`: Styles for the application using SCSS.

## Dependencies

- `react`: JavaScript library for building user interfaces.
- `next`: React framework for server-side rendering and static site generation.
- `antd`: Ant Design components for UI.
- `axios`: Promise-based HTTP client for making API requests.
- `dotenv`: Module to load environment variables from a `.env` file.