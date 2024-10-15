import React, { useEffect } from 'react';
import Menu from '../../components/Menu';
import { STOCKS_SELECTION, STOCK_INFO, EXCHANGE_SELECTION, INIT_ACTIVITY_STATE } from './constants';
import './style.css';

// use Menu layout to create Exchange selection menu
const StockExchangeMenu = ({ stockExchanges = [], onStockSelect = () => { } }) => {
    const containerJsx = <>
        <h1>Please select a Stock Exchange.</h1>
        <ul>
            {stockExchanges.map((exchange) => (
                <li
                    key={exchange.code}
                    onClick={() => onStockSelect(exchange)}
                >
                    {exchange.stockExchange}
                </li>
            ))}
        </ul></>

    return <Menu menuHeader={containerJsx} />;
}

// use Menu layout to create Stock selection menu
const StockMenu = ({ stocks = [], onStockSelect = () => { }, onResetMenu }) => {
    const containerJsx = stocks.length > 0 ? (<>
        <h1>Please select a Stock.</h1>
        <ul>
            {stocks.map((stock) => (
                <li
                    key={stock.code}
                    onClick={() => onStockSelect(stock)}
                >
                    {stock.stockName} ({stock.code})
                </li>
            ))}
        </ul></>) : <h1>No stocks found, Please select another exchange.</h1>;

    const handleResetMenu = () => {
        if (onResetMenu) {
            onResetMenu();
        }
    }

    return <Menu menuHeader={containerJsx} handleResetMenu={handleResetMenu} />;
}

// use Menu layout to show Stock information
const StockInfo = ({ stock, onResetMenu, onGoBack }) => {
    const containerJsx = (
        <h1>
            Stock Price of {stock.stockName} (
            {stock.code}) is ${stock.price}.
            Please select an option.
        </h1>
    );

    const handleGoBack = () => {
        if (onGoBack) {
            onGoBack();
        }
    }

    const handleResetMenu = () => {
        if (onResetMenu) {
            onResetMenu();
        }
    }

    return <Menu menuHeader={containerJsx} handleGoBack={handleGoBack} handleResetMenu={handleResetMenu} />;
}


// Wrapper to use the menus based on state of the chat
const Chat = ({ stocksData = [] }) => {
    // append new activity to the list
    const [activities, setActivities] = React.useState(INIT_ACTIVITY_STATE);


    // on state update of activity, update the scroll position
    useEffect(() => {
        const scrollToBottom = () => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
        scrollToBottom();
    }, [activities]);


    // append "go back state" to activities
    const handleGoBack = () => {
        if (activities.length < 2) {
            return;
        }
        const lastItem = activities[activities.length - 2];

        // boundary case, if last item is exchange selection, then no need to update state
        if (lastItem.type === EXCHANGE_SELECTION) {
            return;
        }
        lastItem.reply = "Go back";
        setActivities([...activities, lastItem]);
    }

    const handleResetMenu = () => {
        const lastItem = INIT_ACTIVITY_STATE[0];
        lastItem.reply = "Main Menu";
        setActivities([...activities, lastItem]);
    }

    if (stocksData.length === 0)
        return <Menu menuHeader="No exchanges found :{" />;

    return activities.map((activity) => {
        let chatJsx = null
        switch (activity.type) {
            case EXCHANGE_SELECTION:
                chatJsx = <StockExchangeMenu
                    key={activity.type}
                    stockExchanges={stocksData}
                    onStockSelect={(exchange) => {
                        setActivities([...activities, { type: STOCKS_SELECTION, exchange, reply: `You have selected "${exchange.stockExchange}"` }]);
                    }}
                />;
                break;
            case STOCKS_SELECTION:
                chatJsx = <StockMenu
                    key={activity.type}
                    stocks={activity.exchange.topStocks}
                    onStockSelect={(stock) => {
                        setActivities([...activities, { type: STOCK_INFO, stock, reply: `You have selected "${stock.stockName} (${stock.code})"` }]);
                    }}
                    onResetMenu={handleResetMenu}
                />;
                break;
            case STOCK_INFO:
                chatJsx = <StockInfo
                    key={activity.type}
                    stock={activity.stock}
                    onResetMenu={handleResetMenu}
                    onGoBack={handleGoBack}
                />;
                break;
            default:
                chatJsx = null;
                break;
        }

        let replyJsx = null;
        if (activity.reply)
            replyJsx = (
                <div className='selectedExchange'>
                    {activity.reply}
                </div>);

        return (
            <>
                {replyJsx}
                {chatJsx}
            </>);
    })
}

export default Chat;
