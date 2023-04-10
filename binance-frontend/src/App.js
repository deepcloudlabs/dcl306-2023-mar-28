import Container from "./component/common/Container";
import {useEffect, useState} from "react";
import FormGroup from "./component/common/FormGroup";
import io from "socket.io-client";
import Table from "./component/common/table/Table";
import TableHeader from "./component/common/table/TableHeader";
import TableBody from "./component/common/table/TableBody";
import {Line} from "react-chartjs-2";
import {CategoryScale, Tooltip, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title} from "chart.js";

const socket = io("ws://localhost:5555");
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function App() {
    const options = {
        responsive: true,
        animation: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'BINANCE Market Data',
            }
        }
    }
    const [market, setMarket] = useState({
        "symbol": "BTCUSDT",
        "symbols": [
            "BTCUSDT", "LTCBTC", "NEOBTC", "ETHBTC"
        ],
        windowSize: 25,
        monitoring: false,
        largeVolumeTrades: []
    });
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'BTC-USDT Price',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderDashOffset: 0.0,
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }]
    })
    function startMonitoring() {
        const newMarket = {...market};
        newMarket.monitoring = true;
        setMarket(newMarket);
    }

    function handleSymbolChange(event) {
        const newMarket = {...market};
        newMarket.symbol = event.target.value;
        setMarket(newMarket);
    }

    function handleWindowSizeChange(event) {
        const newMarket = {...market};
        newMarket.windowSize = Number(event.target.value);
        setMarket(newMarket);
    }

    function stopMonitoring() {
        const newMarket = {...market};
        newMarket.monitoring = false;
        setMarket(newMarket);
    }
    function fixedMapper(trade){
        if (trade.volume.toFixed)
            trade.volume = trade.volume.toFixed(0);
        return trade;
    }
    useEffect(() => {
        socket.on("ticker", (frame) => {
            if (!market.monitoring) return;
            let trade = frame;
            if (trade.volume > 10_000) {
                const newMarket = {...market};
                newMarket.largeVolumeTrades = [...market.largeVolumeTrades, trade];
                newMarket.largeVolumeTrades = newMarket.largeVolumeTrades.map(fixedMapper);
                newMarket.largeVolumeTrades.sort((t1,t2) => t2.volume-t1.volume);
                setMarket(newMarket)
            }
            const newChartData = {...chartData};
            newChartData.datasets = [...chartData.datasets];
            newChartData.datasets[0].data = [...chartData.datasets[0].data, Number(trade.price)]
            if (newChartData.datasets[0].data.length > market.windowSize){
                newChartData.datasets[0].data.splice(0,newChartData.datasets[0].data.length - market.windowSize);
            }
            newChartData.labels = [...chartData.labels, trade.timestamp];
            if (newChartData.labels.length > market.windowSize){
                newChartData.labels.splice(0,newChartData.labels.length - market.windowSize);
            }
            setChartData(newChartData);
        });
        return () => {
            socket.off("ticker");
        }
    });
    let monitoringButton = <button onClick={startMonitoring}
                                   className="btn btn-success">Start</button>;
    if (market.monitoring) {
        monitoringButton = <button onClick={stopMonitoring}
                                   className="btn btn-danger">Stop</button>;
    }
    return (
        <>
            <Container title="Market Data">
                <FormGroup label="Symbol">
                    <select value={market.symbol}
                            id="symbol"
                            name="symbol"
                            onChange={handleSymbolChange}
                            className="form-select">
                        {
                            market.symbols.map(s =>
                                <option label={s} value={s}>{s}</option>
                            )
                        }
                    </select>
                    {monitoringButton}
                </FormGroup>
                <FormGroup label="Window Size">
                    <select value={market.windowSize}
                            id="windowSize"
                            name="windowSize"
                            onChange={handleWindowSizeChange}
                            className="form-select">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                </FormGroup>
            </Container>
            <Container title="Volume Chart">
                <Line data={chartData}
                      width={640}
                      height={480}
                      options={options}
                ></Line>
            </Container>
            <Container title="Signals">
                <Table id="largeVolumes">
                    <TableHeader columns="Symbol,Price,Quantity,Volume"/>
                    <TableBody>
                        {
                            market.largeVolumeTrades.map((trade,index) =>
                                <tr key={index}>
                                   <td>{trade.symbol}</td>
                                   <td>{trade.price}</td>
                                   <td>{trade.quantity}</td>
                                   <td>{trade.volume}</td>
                                </tr>
                            )
                        }
                    </TableBody>
                </Table>
            </Container>
        </>
    );
}

export default App;
