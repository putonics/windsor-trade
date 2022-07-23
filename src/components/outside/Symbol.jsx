import React from 'react'

/**
 * @param {{symbol: string, name: string, logoURL: string}} props 
 * @returns 
 */
const Symbol = props => {

    const [state, setState] = React.useState({ openPrice: 0.0, lastPrice: 0.0, percent: 0.0 })
    const [problem, setProblem] = React.useState(false)

    React.useEffect(() => {
        setInterval(() => {
            fetch("https://www.binance.com/api/v3/ticker/24hr?symbol=" + props.symbol + "BUSD")
                .then(response => response.json())
                .catch(er => setProblem(true))
                .then(json => {
                    setState({ openPrice: parseFloat(json.openPrice), lastPrice: parseFloat(json.lastPrice), percent: 100 * (parseFloat(json.lastPrice) - parseFloat(json.openPrice)) / parseFloat(json.lastPrice) })
                    setProblem(false)
                })
                .catch(er => setProblem(true))
        }, 10000)
    }, [])

    /* <span style={{ color: '#ffffff', padding: 4, border: '1px solid #00000000', borderRadius: 20, backgroundColor: state.lastPrice < state.openPrice ? '#dd0000' : '#00dd66', fontWeight: 700, marginRight: 4 }}>{typeof (state.percent) === 'number' ? state.percent.toFixed(2) : state.percent}%</span> */
    return (
        <div className="flex gap-2 m-4 px-2 py-1 items-center text-slate bg-white/70 rounded-full">
            <img src={'https://windsorcryptocoin.com/' + props.logoURL} alt="" />
            {props.symbol}
            {/* <div className='p-2 col-span-4'>{props.name}</div> */}
            <div className='p-2 col-span-2'>
                <div className={state.percent < 0 ? "text-red-600" : "text-green-700"}>
                    <p>
                        {problem && <span style={{ color: '#ff8800', fontWeight: 700 }}>!</span>}
                        ${typeof (state.lastPrice) === 'number' ? state.lastPrice.toFixed(2) : state.lastPrice}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Symbol